<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SiteSettingController extends Controller
{
    public function index(Request $request)
    {
        $query = \App\Models\SiteSetting::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('key', 'like', "%{$search}%")
                  ->orWhere('value', 'like', "%{$search}%");
            });
        }

        $settings = $query->get();
        return view('admin.settings.index', compact('settings'));
    }

    public function edit($id)
    {
        $setting = \App\Models\SiteSetting::findOrFail($id);
        return view('admin.settings.edit', compact('setting'));
    }

    public function update(Request $request, $id)
    {
        $setting = \App\Models\SiteSetting::findOrFail($id);
        
        $data = $request->validate([
            'value' => 'required|string',
        ]);

        $setting->update($data);

        return redirect()->route('settings.index')->with('success', 'Setting updated successfully');
    }
}
