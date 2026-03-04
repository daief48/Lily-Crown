<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'image', 'title', 'highlight', 'subtitle', 'button_text', 'button_link', 
        'secondary_button_text', 'secondary_button_link',
        'order', 'is_active', 'product_id', 'blog_id'
    ];
    
    protected $appends = ['link', 'secondary_link'];
    
    public function product()
    {
        return $this->belongsTo(\App\Models\Product::class);
    }

    public function blog()
    {
        return $this->belongsTo(\App\Models\Blog::class);
    }
    
    public function getLinkAttribute()
    {
        if ($this->product_id && $this->product) {
            return '/products/' . ($this->product->slug ?: $this->product->id);
        }
        return $this->button_link;
    }

    public function getSecondaryLinkAttribute()
    {
        if ($this->blog_id && $this->blog) {
            return '/blog/' . ($this->blog->slug ?: $this->blog->id);
        }
        return $this->secondary_button_link;
    }
}
