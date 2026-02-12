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
    ];

    protected $casts = [
        'gallery' => 'array',
        'details' => 'array',
    ];

    public function getGalleryAttribute($value)
    {
        $data = $this->castAttribute('gallery', $value);
        return json_encode($data, JSON_PRETTY_PRINT);
    }

    public function setGalleryAttribute($value)
    {
        $this->attributes['gallery'] = is_string($value) ? $value : json_encode($value);
    }

    public function getDetailsAttribute($value)
    {
        $data = $this->castAttribute('details', $value);
        if (is_array($data)) {
            // If it's the array of objects format, extract the 'info' values
            return implode("\n", array_map(function($item) {
                return is_array($item) ? ($item['info'] ?? '') : $item;
            }, $data));
        }
        return $data;
    }

    public function setDetailsAttribute($value)
    {
        if (is_string($value) && !empty($value)) {
            $lines = explode("\n", str_replace("\r", "", $value));
            $details = [];
            foreach ($lines as $line) {
                $trimmed = trim($line);
                if ($trimmed) {
                    $details[] = ['info' => $trimmed];
                }
            }
            $this->attributes['details'] = json_encode($details);
        } else {
            $this->attributes['details'] = is_string($value) ? $value : json_encode($value);
        }
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
