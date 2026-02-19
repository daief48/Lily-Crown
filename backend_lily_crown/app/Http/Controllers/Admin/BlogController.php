<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = \App\Models\Blog::query();

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $blogs = $query->latest()->paginate(10)->appends($request->all());
        return view('admin.blogs.index', compact('blogs'));
    }

    public function create()
    {
        return view('admin.blogs.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:blogs,slug',
            'content' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('blogs', 'public');
            $data['thumbnail'] = '/storage/' . $path;
        }

        \App\Models\Blog::create($data);

        return redirect()->route('blogs.index')->with('success', 'Blog post created successfully');
    }

    public function show($id)
    {
        return redirect()->route('blogs.edit', $id);
    }

    public function edit($id)
    {
        $blog = \App\Models\Blog::findOrFail($id);
        return view('admin.blogs.edit', compact('blog'));
    }

    public function update(Request $request, $id)
    {
        $blog = \App\Models\Blog::findOrFail($id);
        
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:blogs,slug,'.$id,
            'content' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            // Delete old image if it exists and is local
            if ($blog->thumbnail && strpos($blog->thumbnail, '/storage/') === 0) {
                $oldPath = str_replace('/storage/', '', $blog->thumbnail);
                \Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('thumbnail')->store('blogs', 'public');
            $data['thumbnail'] = '/storage/' . $path;
        } else {
            unset($data['thumbnail']);
        }

        $blog->update($data);

        return redirect()->route('blogs.index')->with('success', 'Blog post updated successfully');
    }

    public function destroy($id)
    {
        $blog = \App\Models\Blog::findOrFail($id);
        $blog->delete();

        return redirect()->route('blogs.index')->with('success', 'Blog post deleted successfully');
    }
}
