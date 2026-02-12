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
    ];

    protected $casts = [
        'gallery' => 'array',
        'details' => 'array',
        'is_trending' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
