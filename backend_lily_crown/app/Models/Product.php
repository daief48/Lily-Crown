<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use CrudTrait;

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
    ];

    protected $casts = [
        'gallery' => 'array',
        'details' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
