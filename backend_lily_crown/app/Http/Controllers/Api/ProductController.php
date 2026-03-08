<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'sizes', 'colors']);

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

        $products = $query->get()->map(function ($product) {
            $data = $product->toArray();
            // Merge Sizes
            $sizesFromDirect = $product->sizes->pluck('name');
            $sizesFromVariants = $product->variants->pluck('size.name')->filter();
            $data['sizes'] = $sizesFromDirect->merge($sizesFromVariants)->unique()->values()->toArray();

            // Merge Colors
            $colorsFromDirect = $product->colors->map(function ($color) {
                return [
                    'name' => $color->name, 
                    'hex' => $color->hex_code,
                    'product_key' => $color->pivot->product_key ?? null
                ];
            });
            $colorsFromVariants = $product->variants->map(function ($variant) {
                if (!$variant->color) return null;
                return ['name' => $variant->color->name, 'hex' => $variant->color->hex_code];
            })->filter();
            $data['colors'] = $colorsFromDirect->merge($colorsFromVariants)->unique('name')->values()->toArray();
            
            return $data;
        });

        return response()->json(['data' => $products]);
    }

    public function show($id)
    {
        $product = Product::with(['category', 'sizes', 'colors', 'variants.size', 'variants.color'])
            ->where('id', $id)
            ->orWhere('slug', $id)
            ->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $data = $product->toArray();
        
        // Merge Sizes
        $sizesFromDirect = $product->sizes->pluck('name');
        $sizesFromVariants = $product->variants->pluck('size.name')->filter();
        $data['sizes'] = $sizesFromDirect->merge($sizesFromVariants)->unique()->values()->toArray();

        // Merge Colors
        $colorsFromDirect = $product->colors->map(function ($color) {
            return [
                'name' => $color->name, 
                'hex' => $color->hex_code,
                'product_key' => $color->pivot->product_key ?? null
            ];
        });
        $colorsFromVariants = $product->variants->map(function ($variant) {
            if (!$variant->color) return null;
            return ['name' => $variant->color->name, 'hex' => $variant->color->hex_code];
        })->filter();
        $data['colors'] = $colorsFromDirect->merge($colorsFromVariants)->unique('name')->values()->toArray();

        $data['variants'] = $product->variants->map(function ($variant) {
            return [
                'id' => $variant->id,
                'size_id' => $variant->size_id,
                'size_name' => $variant->size?->name,
                'color_id' => $variant->color_id,
                'color_name' => $variant->color?->name,
                'price' => $variant->price,
                'stock' => $variant->stock,
            ];
        })->values()->toArray();

        return response()->json(['data' => $data]);
    }
}
