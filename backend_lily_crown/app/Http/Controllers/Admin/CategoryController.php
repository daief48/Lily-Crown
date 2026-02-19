

1/1

Next.js 16.1.6
Turbopack
Runtime TypeError



Cannot read properties of null (reading 'length')
src\app\product\[id]\page.jsx (21:13) @ ProductPage


  19 |         <main className="min-h-screen">
  20 |             <Navbar />
> 21 |             <ProductDetail product={product} />
     |             ^
  22 |             <RelatedProducts currentProductId={product.id} category={product.category} />
  23 |             <Footer />
  24 |
Call Stack
13

ProductDetail
file:///D:/Lily%20Crown/frontend_lily_crown/.next/dev/static/chunks/src_c239c67c._.js (8438:34)
Object.react_stack_bottom_frame
file:///D:/Lily%20Crown/frontend_lily_crown/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (14826:24)
renderWithHooks
file:///D:/Lily%20Crown/frontend_lily_crown/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (4651:24)
updateFunctionComponent
file:///D:/Lily%20Crown/frontend_lily_crown/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (6112:21)
beginWork
file:///D:/Lily%20Crown/frontend_lily_crown/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (6687:639)
runWithFiberInDEV
file:///D:/Lily%20Crown/frontend_lily_crown/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (965:74)
performUnitOfWork
file:///D:/Lily%20Crown/frontend_lily_crown/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9562:97)
workLoopSync
file:///D:/Lily%20Crown/frontend_lily_crown/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9456:40)
renderRootSync
file:///D:/Lily%20Crown/frontend_lily_crown/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9440:13)
performWorkOnRoot
file:///D:/Lily%20Crown/frontend_lily_crown/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9105:47)
performWorkOnRootViaSchedulerTask
file:///D:/Lily%20Crown/frontend_lily_crown/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (10230:9)
MessagePort.performWorkUntilDeadline
file:///D:/Lily%20Crown/frontend_lily_crown/.next/dev/static/chunks/node_modules_next_dist_compiled_a0e4c7b4._.js (2647:64)
ProductPage
src\app\product\[id]\page.jsx (21:13)
1
2
Application error: a client-side exception has occurred while loading localhost (see the browser console for more information).<?php

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
