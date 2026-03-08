<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = \App\Models\Order::query();

        // Search Filter (ID or Customer Name)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhere('customer_name', 'like', "%{$search}%");
            });
        }

        // Product Name Filter
        if ($request->filled('product_name')) {
            $pName = $request->product_name;
            $query->where('items', 'like', "%{$pName}%");
        }

        // Product Key Filter
        if ($request->filled('product_key')) {
            $key = $request->product_key;
            $query->where('items', 'like', "%{$key}%");
        }

        // Date Filter
        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }
        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        // Status Filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $orders = $query->latest()->paginate(10)->appends($request->all());
        return view('admin.orders.index', compact('orders'));
    }

    public function edit($id)
    {
        $order = \App\Models\Order::findOrFail($id);
        return view('admin.orders.edit', compact('order'));
    }

    public function update(Request $request, $id)
    {
        $order = \App\Models\Order::findOrFail($id);
        
        $request->validate([
            'status' => 'required|string',
        ]);

        // Normalize status: first letter uppercase, rest lowercase (e.g., "Pending")
        $status = ucfirst(strtolower($request->status));
        
        $validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        
        if (!in_array($status, $validStatuses)) {
            return back()->with('error', 'Invalid status selected');
        }

        $order->update(['status' => $status]);

        return redirect()->route('orders.index')->with('success', 'Order status updated successfully');
    }
}
