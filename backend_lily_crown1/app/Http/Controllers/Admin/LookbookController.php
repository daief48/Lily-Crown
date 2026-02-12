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
        return view('admin.lookbook.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'image' => 'required|string',
            'title' => 'nullable|string',
            'category_name' => 'nullable|string',
            'order' => 'integer',
        ]);

        Lookbook::create($data);

        return redirect()->route('lookbook.index')->with('success', 'Lookbook item created successfully');
    }

    public function edit(Lookbook $lookbook)
    {
        return view('admin.lookbook.edit', compact('lookbook'));
    }

    public function update(Request $request, Lookbook $lookbook)
    {
        $data = $request->validate([
            'image' => 'required|string',
            'title' => 'nullable|string',
            'category_name' => 'nullable|string',
            'order' => 'integer',
        ]);

        $lookbook->update($data);

        return redirect()->route('lookbook.index')->with('success', 'Lookbook item updated successfully');
    }

    public function destroy(Lookbook $lookbook)
    {
        $lookbook->delete();
        return redirect()->route('lookbook.index')->with('success', 'Lookbook item deleted successfully');
    }
}
