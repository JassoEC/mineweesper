<?php

namespace App\Models;

use App\Traits\OrderedRows;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory,
        OrderedRows;

    protected $fillable = [
        'rows',
        'columns',
        'mines',
        'status',
        'user_id',
        'board'
    ];


    function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::create($value)->format('D/M/Y')
        );
    }
}
