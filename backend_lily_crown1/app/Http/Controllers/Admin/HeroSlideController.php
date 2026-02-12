<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;

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
        return view('admin.hero-slides.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'image' => 'required|string',
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'button_text' => 'nullable|string',
            'button_link' => 'nullable|string',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        HeroSlide::create($data);

        return redirect()->route('hero-slides.index')->with('success', 'Slide created successfully');
    }

    public function edit(HeroSlide $heroSlide)
    {
        return view('admin.hero-slides.edit', compact('heroSlide'));
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        $data = $request->validate([
            'image' => 'required|string',
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'button_text' => 'nullable|string',
            'button_link' => 'nullable|string',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $heroSlide->update($data);

        return redirect()->route('hero-slides.index')->with('success', 'Slide updated successfully');
    }

    public function destroy(HeroSlide $heroSlide)
    {
        $heroSlide->delete();
        return redirect()->route('hero-slides.index')->with('success', 'Slide deleted successfully');
    }
}
