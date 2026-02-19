<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'badge',
        'image',
        'gallery',
        'details',
        'is_trending',
        'in_stock',
        'is_ready_to_ship',
    ];

    protected $casts = [
        'gallery' => 'array',
        'details' => 'array',
        'is_trending' => 'boolean',
        'in_stock' => 'boolean',
        'is_ready_to_ship' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
