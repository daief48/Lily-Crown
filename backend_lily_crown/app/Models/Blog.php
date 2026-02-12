<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use CrudTrait;

    protected $fillable = ['title', 'slug', 'content', 'thumbnail'];
}
