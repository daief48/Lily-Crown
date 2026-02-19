<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Route as RouteFacade;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::latest()->paginate(15);
        return view('admin.permissions.index', compact('permissions'));
    }

    public function create()
    {
        $adminRoutes = $this->getAdminRoutes();
        $users = User::all();
        return view('admin.permissions.create', compact('adminRoutes', 'users'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:permissions,name',
            'routes' => 'nullable|array',
            'routes.*' => 'string',
            'users' => 'nullable|array',
            'users.*' => 'integer|exists:users,id',
        ]);

        $permission = Permission::create([
            'name' => $data['name'],
            'guard_name' => 'web',
            'routes' => isset($data['routes']) ? json_encode(array_values($data['routes'])) : null,
        ]);

        if (!empty($data['users'])) {
            foreach ($data['users'] as $userId) {
                $user = User::find($userId);
                if ($user) {
                    $user->givePermissionTo($permission);
                }
            }
        }

        return redirect()->route('permissions.index')->with('success', 'Permission created');
    }

    public function edit(Permission $permission)
    {
        $adminRoutes = $this->getAdminRoutes();
        $users = User::all();
        return view('admin.permissions.edit', compact('permission', 'adminRoutes', 'users'));
    }

    protected function getAdminRoutes()
    {
        $routes = [];
        foreach (RouteFacade::getRoutes() as $r) {
            $action = $r->getActionName();
            if (is_string($action) && str_contains($action, 'App\\Http\\Controllers\\Admin')) {
                $name = $r->getName() ?: $r->uri();
                $methods = implode(',', $r->methods());
                $routes[$name] = strtoupper($methods) . ' ' . $r->uri() . ($r->getName() ? " ({$r->getName()})" : '');
            }
        }
        return $routes;
    }

    public function update(Request $request, Permission $permission)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:permissions,name,' . $permission->id,
            'routes' => 'nullable|array',
            'routes.*' => 'string',
            'users' => 'nullable|array',
            'users.*' => 'integer|exists:users,id',
        ]);

        $permission->name = $data['name'];
        $permission->routes = isset($data['routes']) ? json_encode(array_values($data['routes'])) : null;
        $permission->save();

        // Sync users: remove permission from users not in the list, add to selected users
        $selected = collect($data['users'] ?? [])->map(fn($id) => (int) $id)->all();

        // Revoke from users who currently have it but are not selected
        foreach ($permission->users as $u) {
            if (!in_array($u->id, $selected)) {
                $u->revokePermissionTo($permission);
            }
        }

        // Give permission to selected users
        if (!empty($selected)) {
            foreach ($selected as $userId) {
                $user = User::find($userId);
                if ($user) {
                    $user->givePermissionTo($permission);
                }
            }
        }

        return redirect()->route('permissions.index')->with('success', 'Permission updated');
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();
        return redirect()->route('permissions.index')->with('success', 'Permission deleted');
    }
}
