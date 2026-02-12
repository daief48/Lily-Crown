<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string',
            'customer_email' => 'required|email',
            'total' => 'required|numeric',
            'items' => 'required|array'
        ]);

        $order = Order::create([
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'total' => $request->total,
            'items' => $request->items,
            'status' => 'pending'
        ]);

        return response()->json(['message' => 'Order placed successfully', 'order_id' => $order->id]);
    }
}
