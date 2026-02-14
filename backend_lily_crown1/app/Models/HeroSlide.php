<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = ['image', 'title', 'subtitle', 'button_text', 'button_link', 'order', 'is_active', 'product_id'];
    
    protected $appends = ['link'];
    
    public function product()
    {
        return $this->belongsTo(\App\Models\Product::class);
    }
    
    public function getLinkAttribute()
    {
        if ($this->product_id && $this->product) {
            return '/products/' . $this->product->slug;
        }
        return $this->button_link;
    }
}
