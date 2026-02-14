<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'customer_name',
        'customer_email',
        'phone',
        'address',
        'city',
        'total',
        'status',
        'items',
        'payment_method',
        'payment_status',
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
