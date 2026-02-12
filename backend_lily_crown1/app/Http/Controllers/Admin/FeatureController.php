<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feature;
use Illuminate\Http\Request;

class FeatureController extends Controller
{
    public function index(Request $request)
    {
        $query = Feature::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $features = $query->paginate(10)->appends($request->all());
        return view('admin.features.index', compact('features'));
    }

    public function create()
    {
        return view('admin.features.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'icon' => 'nullable|string',
            'title' => 'required|string',
            'description' => 'nullable|string',
        ]);

        Feature::create($data);

        return redirect()->route('features.index')->with('success', 'Feature created successfully');
    }

    public function edit(Feature $feature)
    {
        return view('admin.features.edit', compact('feature'));
    }

    public function update(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'icon' => 'nullable|string',
            'title' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $feature->update($data);

        return redirect()->route('features.index')->with('success', 'Feature updated successfully');
    }

    public function destroy(Feature $feature)
    {
        $feature->delete();
        return redirect()->route('features.index')->with('success', 'Feature deleted successfully');
    }
}
