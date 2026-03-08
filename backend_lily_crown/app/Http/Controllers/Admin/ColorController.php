<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function index()
    {
        $colors = Color::orderBy('name')->paginate(20);
        return view('admin.colors.index', compact('colors'));
    }

    public function create()
    {
        return view('admin.colors.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50|unique:colors,name',
            'hex_code' => 'required|string|size:7|regex:/^#([A-Fa-f0-9]{6})$/|unique:colors,hex_code',
        ]);

        Color::create($request->all());

        return redirect()->route('colors.index')->with('success', 'Color created successfully.');
    }

    public function edit($id)
    {
        $color = Color::findOrFail($id);
        return view('admin.colors.edit', compact('color'));
    }

    public function update(Request $request, $id)
    {
        $color = Color::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:50|unique:colors,name,' . $id,
            'hex_code' => 'required|string|size:7|regex:/^#([A-Fa-f0-9]{6})$/|unique:colors,hex_code,' . $id,
        ]);

        $color->update($request->all());

        return redirect()->route('colors.index')->with('success', 'Color updated successfully.');
    }

    public function destroy($id)
    {
        $color = Color::findOrFail($id);
        $color->delete();

        return redirect()->route('colors.index')->with('success', 'Color deleted successfully.');
    }
}
