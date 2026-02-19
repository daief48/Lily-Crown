<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = \App\Models\Product::with('category');

        // Search Filter
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Category Filter
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Badge Filter
        if ($request->filled('badge')) {
            $query->where('badge', $request->badge);
        }

        $products = $query->paginate(10)->appends($request->all());
        $categories = \App\Models\Category::all();

        return view('admin.products.index', compact('products', 'categories'));
    }

    public function create()
    {
        $categories = \App\Models\Category::all();
        return view('admin.products.create', compact('categories'));
    }

    public function store(Request $request)
    {
        \Log::info('Product store initiated', $request->all());

        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'required|string|unique:products,slug',
                'category_id' => 'required|exists:categories,id',
                'description' => 'nullable|string',
                'price' => 'required|numeric',
                'badge' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'details' => 'nullable|string',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Product validation failed', $e->errors());
            throw $e;
        }

        $data = $request->except(['image', 'gallery']);

        // Set default for is_trending if not present
        if (!isset($data['is_trending'])) {
            $data['is_trending'] = 0;
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = 'storage/' . $path;
        }

        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('products/gallery', 'public');
                $galleryPaths[] = ['url' => 'storage/' . $path];
            }
            $data['gallery'] = $galleryPaths;
        }

        if ($request->filled('details')) {
            $data['details'] = array_filter(array_map('trim', explode("\n", $request->details)));
        } else {
             // Remove details from data if null/empty to avoid casting issues if any, or ensure it is null
             $data['details'] = null;
        }

        try {
            $product = \App\Models\Product::create($data);
            \Log::info('Product created successfully', ['id' => $product->id]);
        } catch (\Exception $e) {
            \Log::error('Product creation failed in DB', ['error' => $e->getMessage()]);
            return back()->withInput()->withErrors(['error' => 'Database error: ' . $e->getMessage()]);
        }

        return redirect()->route('products.index')->with('success', 'Product created successfully');
    }

    public function show($id)
    {
        return redirect()->route('products.edit', $id);
    }

    public function edit($id)
    {
        $product = \App\Models\Product::findOrFail($id);
        $categories = \App\Models\Category::all();
        return view('admin.products.edit', compact('product', 'categories'));
    }

    public function update(Request $request, $id)
    {
        $product = \App\Models\Product::findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:products,slug,'.$id,
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'badge' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'details' => 'nullable|string',
        ]);

        $data = $request->except(['image', 'gallery']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = 'storage/' . $path;
        }

        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('products/gallery', 'public');
                $galleryPaths[] = ['url' => 'storage/' . $path];
            }
            $data['gallery'] = $galleryPaths;
        }

        if ($request->filled('details')) {
            $data['details'] = array_filter(array_map('trim', explode("\n", $request->details)));
        }

        $product->update($data);

        return redirect()->route('products.index')->with('success', 'Product updated successfully');
    }

    public function destroy($id)
    {
        $product = \App\Models\Product::findOrFail($id);
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully');
    }
}
