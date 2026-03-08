<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    public function index()
    {
        $sizes = Size::orderBy('id')->paginate(20);
        return view('admin.sizes.index', compact('sizes'));
    }

    public function create()
    {
        return view('admin.sizes.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50|unique:sizes,name',
        ]);

        Size::create(['name' => strtoupper(trim($request->name))]);

        return redirect()->route('sizes.index')->with('success', 'Size created successfully.');
    }

    public function edit($id)
    {
        $size = Size::findOrFail($id);
        return view('admin.sizes.edit', compact('size'));
    }

    public function update(Request $request, $id)
    {
        $size = Size::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:50|unique:sizes,name,' . $id,
        ]);

        $size->update(['name' => strtoupper(trim($request->name))]);

        return redirect()->route('sizes.index')->with('success', 'Size updated successfully.');
    }

    public function destroy($id)
    {
        $size = Size::findOrFail($id);
        $size->delete();

        return redirect()->route('sizes.index')->with('success', 'Size deleted successfully.');
    }
}
