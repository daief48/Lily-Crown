<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroSlideController extends Controller
{
    public function index(Request $request)
    {
        $query = HeroSlide::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('subtitle', 'like', "%{$search}%")
                  ->orWhere('button_text', 'like', "%{$search}%");
            });
        }

        $slides = $query->orderBy('order')->paginate(10)->appends($request->all());
        return view('admin.hero-slides.index', compact('slides'));
    }

    public function create()
    {
        $products = \App\Models\Product::orderBy('name')->get();
        $blogs = \App\Models\Blog::orderBy('title')->get();
        return view('admin.hero-slides.create', compact('products', 'blogs'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'title' => 'nullable|string',
            'highlight' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'button_text' => 'nullable|string',
            'button_link' => 'nullable|string',
            'secondary_button_text' => 'nullable|string',
            'secondary_button_link' => 'nullable|string',
            'product_id' => 'nullable|exists:products,id',
            'blog_id' => 'nullable|exists:blogs,id',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('uploads/hero-slides', 'public');
            $data['image'] = 'storage/' . $imagePath;
        }

        HeroSlide::create($data);

        return redirect()->route('hero-slides.index')->with('success', 'Slide created successfully');
    }

    public function edit(HeroSlide $heroSlide)
    {
        $products = \App\Models\Product::orderBy('name')->get();
        $blogs = \App\Models\Blog::orderBy('title')->get();
        return view('admin.hero-slides.edit', compact('heroSlide', 'products', 'blogs'));
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        $data = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'title' => 'nullable|string',
            'highlight' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'button_text' => 'nullable|string',
            'button_link' => 'nullable|string',
            'secondary_button_text' => 'nullable|string',
            'secondary_button_link' => 'nullable|string',
            'product_id' => 'nullable|exists:products,id',
            'blog_id' => 'nullable|exists:blogs,id',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($heroSlide->image && !str_starts_with($heroSlide->image, 'http')) {
                $oldPath = str_replace('storage/', '', $heroSlide->image);
                Storage::disk('public')->delete($oldPath);
            }

            $imagePath = $request->file('image')->store('uploads/hero-slides', 'public');
            $data['image'] = 'storage/' . $imagePath;
        } else {
            // Keep existing image if no new one uploaded
            $data['image'] = $heroSlide->image;
        }

        $heroSlide->update($data);

        return redirect()->route('hero-slides.index')->with('success', 'Slide updated successfully');
    }

    public function destroy(HeroSlide $heroSlide)
    {
        $heroSlide->delete();
        return redirect()->route('hero-slides.index')->with('success', 'Slide deleted successfully');
    }
}
