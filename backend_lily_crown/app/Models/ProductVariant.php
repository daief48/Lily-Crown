<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id',
        'size_id',
        'color_id',
        'price',
        'stock',
    ];

    /**
     * Get the product that owns the variant.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the size association.
     */
    public function size(): BelongsTo
    {
        return $this->belongsTo(Size::class);
    }

    /**
     * Get the color association.
     */
    public function color(): BelongsTo
    {
        return $this->belongsTo(Color::class);
    }

    /**
     * Helper to get a human-readable selection string.
     */
    public function getSelectionLabelAttribute()
    {
        $label = "";
        if ($this->size) {
            $label .= "Size: " . $this->size->name;
        }
        if ($this->color) {
            $label .= ($label ? " | " : "") . "Color: " . $this->color->name;
        }
        return $label ?: "Default Variation";
    }
}
