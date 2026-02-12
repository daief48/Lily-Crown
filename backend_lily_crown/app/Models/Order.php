<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use CrudTrait;

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
        if (is_array($value)) return json_encode($value, JSON_PRETTY_PRINT);
        $decoded = json_decode($value, true);
        return is_array($decoded) ? json_encode($decoded, JSON_PRETTY_PRINT) : $value;
    }

    public function setItemsAttribute($value)
    {
        $this->attributes['items'] = is_string($value) ? json_decode($value, true) : $value;
    }
}
