<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tortoise extends Model
{
    protected $fillable = ['length', 'weight', 'result', 'min', 'avg', 'max'];
}
