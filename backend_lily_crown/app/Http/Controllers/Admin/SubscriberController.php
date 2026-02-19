<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function index(Request $request)
    {
        $query = \App\Models\Subscriber::query();

        if ($request->filled('search')) {
            $query->where('email', 'like', '%' . $request->search . '%');
        }

        $subscribers = $query->latest()->paginate(10)->appends($request->all());
        return view('admin.subscribers.index', compact('subscribers'));
    }

    public function destroy($id)
    {
        $subscriber = \App\Models\Subscriber::findOrFail($id);
        $subscriber->delete();

        return redirect()->route('subscribers.index')->with('success', 'Subscriber removed successfully');
    }
}
