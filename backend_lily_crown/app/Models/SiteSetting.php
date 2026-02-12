<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use CrudTrait;

    protected $fillable = ['key', 'value', 'type'];
}
