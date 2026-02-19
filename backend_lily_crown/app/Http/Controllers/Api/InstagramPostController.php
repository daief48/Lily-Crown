<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InstagramPostController extends Controller
{
    public function index()
    {
        $posts = \App\Models\InstagramPost::latest()->take(12)->get();

        $posts = $posts->map(function ($post) {
            $post->image = Str::startsWith($post->image, 'http') ? $post->image : asset($post->image);
            return $post;
        });

        return response()->json(['data' => $posts]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
