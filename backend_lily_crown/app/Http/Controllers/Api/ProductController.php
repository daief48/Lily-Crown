<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

        // Search filter
        if ($request->has('search')) {
            $search = $request->query('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Category filter (slug or id)
        if ($request->has('category')) {
            $category = $request->query('category');
            $query->whereHas('category', function($q) use ($category) {
                $q->where('slug', $category)->orWhere('id', $category);
            });
        }

        // Price range filter
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->query('min_price'));
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->query('max_price'));
        }

        // Availability filters
        if ($request->has('in_stock')) {
            $inStock = filter_var($request->query('in_stock'), FILTER_VALIDATE_BOOLEAN);
            if ($inStock) {
                $query->where('in_stock', true);
            }
        }
        if ($request->has('is_ready_to_ship')) {
            $readyToShip = filter_var($request->query('is_ready_to_ship'), FILTER_VALIDATE_BOOLEAN);
            if ($readyToShip) {
                $query->where('is_ready_to_ship', true);
            }
        }

        // Sort
        $sort = $request->query('sort', 'newest');
        switch ($sort) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'trending':
                $query->where('is_trending', true)->latest();
                break;
            case 'newest':
            default:
                $query->latest();
                break;
        }

        $products = $query->get();
        return response()->json(['data' => $products]);
    }

    public function show($id)
    {
        $product = Product::with('category')
            ->where('id', $id)
            ->orWhere('slug', $id)
            ->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json(['data' => $product]);
    }
}
