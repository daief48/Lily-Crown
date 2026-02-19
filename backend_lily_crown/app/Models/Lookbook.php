<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lookbook extends Model
{
    protected $fillable = ['image', 'title', 'category_name', 'order', 'product_id', 'type'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
