<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_name',
        'customer_email',
        'total',
        'status',
        'items',
    ];

    protected $casts = [
        'items' => 'array',
    ];

    public function getItemsAttribute($value)
    {
        $data = $this->castAttribute('items', $value);
        return json_encode($data, JSON_PRETTY_PRINT);
    }

    public function setItemsAttribute($value)
    {
        $this->attributes['items'] = is_string($value) ? $value : json_encode($value);
    }
}
