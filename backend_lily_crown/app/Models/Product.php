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

    public function getGalleryAttribute($value)
    {
        if (is_array($value)) return json_encode($value, JSON_PRETTY_PRINT);
        $decoded = json_decode($value, true);
        return is_array($decoded) ? json_encode($decoded, JSON_PRETTY_PRINT) : $value;
    }

    public function setGalleryAttribute($value)
    {
        $this->attributes['gallery'] = is_string($value) ? json_decode($value, true) : $value;
    }

    public function getDetailsAttribute($value)
    {
        if (is_array($value)) return json_encode($value, JSON_PRETTY_PRINT);
        $decoded = json_decode($value, true);
        return is_array($decoded) ? json_encode($decoded, JSON_PRETTY_PRINT) : $value;
    }

    public function setDetailsAttribute($value)
    {
        $this->attributes['details'] = is_string($value) ? json_decode($value, true) : $value;
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
