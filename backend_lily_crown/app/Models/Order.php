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
}
