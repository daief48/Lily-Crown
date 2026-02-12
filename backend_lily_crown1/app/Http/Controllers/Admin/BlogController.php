<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = \App\Models\Blog::all();
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
            'thumbnail' => 'nullable|string',
        ]);

        \App\Models\Blog::create($data);

        return redirect()->route('blogs.index')->with('success', 'Blog post created successfully');
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
            'thumbnail' => 'nullable|string',
        ]);

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
