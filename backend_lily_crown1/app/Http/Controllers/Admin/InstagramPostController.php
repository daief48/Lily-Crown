<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InstagramPost;
use Illuminate\Http\Request;

class InstagramPostController extends Controller
{
    public function index(Request $request)
    {
        $query = InstagramPost::query();

        if ($request->filled('search')) {
            $query->where('caption', 'like', '%' . $request->search . '%');
        }

        $posts = $query->latest()->paginate(10)->appends($request->all());
        return view('admin.instagram-posts.index', compact('posts'));
    }

    public function create()
    {
        return view('admin.instagram-posts.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'image' => 'required|string',
            'link' => 'nullable|string',
            'caption' => 'nullable|string',
        ]);

        InstagramPost::create($data);

        return redirect()->route('instagram-posts.index')->with('success', 'Instagram post added successfully');
    }

    public function edit(InstagramPost $instagramPost)
    {
        return view('admin.instagram-posts.edit', compact('instagramPost'));
    }

    public function update(Request $request, InstagramPost $instagramPost)
    {
        $data = $request->validate([
            'image' => 'required|string',
            'link' => 'nullable|string',
            'caption' => 'nullable|string',
        ]);

        $instagramPost->update($data);

        return redirect()->route('instagram-posts.index')->with('success', 'Instagram post updated successfully');
    }

    public function destroy(InstagramPost $instagramPost)
    {
        $instagramPost->delete();
        return redirect()->route('instagram-posts.index')->with('success', 'Instagram post deleted successfully');
    }
}
