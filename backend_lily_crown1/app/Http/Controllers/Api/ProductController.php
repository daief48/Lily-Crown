<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();
        
        $products->transform(function ($product) {
            $product->gallery = is_string($product->gallery) ? json_decode($product->gallery, true) : $product->gallery;
            $product->details = is_string($product->details) ? json_decode($product->details, true) : $product->details;
            return $product;
        });

        return response()->json([
            'data' => $products
        ]);
    }

    public function show($id)
    {
        $product = Product::with('category')->find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->gallery = is_string($product->gallery) ? json_decode($product->gallery, true) : $product->gallery;
        $product->details = is_string($product->details) ? json_decode($product->details, true) : $product->details;

        return response()->json(['data' => $product]);
    }
}
