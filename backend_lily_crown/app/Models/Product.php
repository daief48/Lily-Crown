<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'admin_product_key',
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

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function sizes(): BelongsToMany
    {
        return $this->belongsToMany(Size::class, 'product_sizes');
    }

    public function colors(): BelongsToMany
    {
        return $this->belongsToMany(Color::class, 'product_colors')->withPivot('product_key');
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }
}
