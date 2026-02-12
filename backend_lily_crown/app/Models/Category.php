<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use CrudTrait;

    protected $fillable = ['name', 'slug', 'icon'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
