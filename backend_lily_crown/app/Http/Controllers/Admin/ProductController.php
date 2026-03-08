<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category; // Added
use App\Models\Product; // Added
use App\Models\Size;
use App\Models\Color; // Added
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category'); // Changed to use imported Product model

        // Search Filter
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Product Key Filter
        if ($request->filled('admin_product_key')) {
            $query->where('admin_product_key', 'like', '%' . $request->admin_product_key . '%');
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
        $categories = Category::all(); // Changed to use imported Category model

        return view('admin.products.index', compact('products', 'categories'));
    }

    public function create()
    {
        $categories = Category::all();
        $sizes = Size::orderBy('id')->get();
        $colors = Color::orderBy('name')->get(); // Added

        return view('admin.products.create', compact('categories', 'sizes', 'colors')); // Updated compact
    }

    public function store(Request $request)
    {
        \Log::info('Product store initiated', $request->all());

        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'required|string|unique:products,slug',
                'admin_product_key' => 'nullable|string|max:255',
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
            $product = Product::create($data); // Changed to use imported Product model

            // Sync sizes and colors
            $product->sizes()->sync($request->input('sizes', []));
            $product->colors()->sync($request->input('colors', [])); // Added
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
        $product = Product::with(['sizes', 'colors'])->findOrFail($id); // Changed to use imported Product model and eager load colors
        $categories = Category::all(); // Changed to use imported Category model
        $sizes = Size::orderBy('id')->get();
        $colors = Color::orderBy('name')->get(); // Added
        $selectedSizes = $product->sizes->pluck('id')->toArray();
        $selectedColors = $product->colors->pluck('id')->toArray(); // Added

        return view('admin.products.edit', compact('product', 'categories', 'sizes', 'colors', 'selectedSizes', 'selectedColors')); // Updated compact
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id); // Changed to use imported Product model
        
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:products,slug,'.$id,
            'admin_product_key' => 'nullable|string|max:255',
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

        // Sync sizes and colors
        $product->sizes()->sync($request->input('sizes', []));
        $product->colors()->sync($request->input('colors', [])); // Added

        return redirect()->route('products.index')->with('success', 'Product updated successfully');
    }

    public function destroy($id)
    {
        $product = \App\Models\Product::findOrFail($id);
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully');
    }
}
