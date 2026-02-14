<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string',
            'customer_email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'total' => 'required|numeric',
            'items' => 'required|array',
            'payment_method' => 'string|in:cod' // strict validation
        ]);

        $order = Order::create([
            'user_id' => $request->user('sanctum')?->id,
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'total' => $request->total,
            'items' => $request->items,
            'payment_method' => $request->payment_method ?? 'cod',
            'payment_status' => 'pending',
            'status' => 'pending'
        ]);

        return response()->json(['message' => 'Order placed successfully', 'order_id' => $order->id]);
    }
}
