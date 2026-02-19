<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = \App\Models\Category::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $categories = $query->paginate(10)->appends($request->all());
        return view('admin.categories.index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.categories.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle image upload with Storage
        if ($request->hasFile('icon')) {
            $path = $request->file('icon')->store('categories', 'public');
            $data['image'] = 'storage/' . $path;
            unset($data['icon']);
        }

        \App\Models\Category::create($data);

        return redirect()->route('categories.index')->with('success', 'Category created successfully');
    }

    public function show($id)
    {
        return redirect()->route('categories.edit', $id);
    }

    public function edit($id)
    {
        $category = \App\Models\Category::findOrFail($id);
        return view('admin.categories.edit', compact('category'));
    }

    public function update(Request $request, $id)
    {
        $category = \App\Models\Category::findOrFail($id);
        
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug,'.$id,
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle image upload with Storage
        if ($request->hasFile('icon')) {
            // Delete old image if exists and is local
            $oldImage = $category->image || $category->icon;
            if ($oldImage && !Str::startsWith($oldImage, 'http')) {
                $oldPath = str_replace('storage/', '', $oldImage);
                if (Str::contains($oldImage, 'images/categories')) {
                     @unlink(public_path($oldImage));
                } else {
                    \Storage::disk('public')->delete($oldPath);
                }
            }
            
            $path = $request->file('icon')->store('categories', 'public');
            $data['image'] = 'storage/' . $path;
            $data['icon'] = null; // Clear icon to avoid confusion
        }

        $category->update($data);

        return redirect()->route('categories.index')->with('success', 'Category updated successfully');
    }

    public function destroy($id)
    {
        $category = \App\Models\Category::findOrFail($id);
        
        // Delete image if it exists
        if ($category->icon && !Str::startsWith($category->icon, 'http')) {
            $oldPath = str_replace('storage/', '', $category->icon);
            if (Str::contains($category->icon, 'images/categories')) {
                 @unlink(public_path($category->icon));
            } else {
                \Storage::disk('public')->delete($oldPath);
            }
        }

        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully');
    }
}
