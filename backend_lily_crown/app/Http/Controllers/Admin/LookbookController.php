<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lookbook;
use Illuminate\Http\Request;

class LookbookController extends Controller
{
    public function index(Request $request)
    {
        $query = Lookbook::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('category_name', 'like', "%{$search}%");
            });
        }

        $lookbooks = $query->orderBy('order')->paginate(10)->appends($request->all());
        return view('admin.lookbook.index', compact('lookbooks'));
    }

    public function create()
    {
        $products = \App\Models\Product::orderBy('name')->get();
        return view('admin.lookbook.create', compact('products'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'title' => 'nullable|string',
            'category_name' => 'nullable|string',
            'order' => 'integer',
            'product_id' => 'nullable|exists:products,id',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = 'storage/' . $request->file('image')->store('lookbook', 'public');
        }

        Lookbook::create($data);

        return redirect()->route('lookbook.index')->with('success', 'Lookbook item created successfully');
    }

    public function edit(Lookbook $lookbook)
    {
        $products = \App\Models\Product::orderBy('name')->get();
        return view('admin.lookbook.edit', compact('lookbook', 'products'));
    }

    public function update(Request $request, Lookbook $lookbook)
    {
        $data = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'title' => 'nullable|string',
            'category_name' => 'nullable|string',
            'order' => 'integer',
            'product_id' => 'nullable|exists:products,id',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists and is a local file
            if ($lookbook->image && !str_starts_with($lookbook->image, 'http')) {
                $oldPath = str_replace('storage/', '', $lookbook->image);
                \Storage::disk('public')->delete($oldPath);
            }
            $data['image'] = 'storage/' . $request->file('image')->store('lookbook', 'public');
        }

        $lookbook->update($data);

        return redirect()->route('lookbook.index')->with('success', 'Lookbook item updated successfully');
    }

    public function destroy(Lookbook $lookbook)
    {
        $lookbook->delete();
        return redirect()->route('lookbook.index')->with('success', 'Lookbook item deleted successfully');
    }
}
