<?php

namespace App\Models;

use App\Traits\OrderedRows;
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
}
