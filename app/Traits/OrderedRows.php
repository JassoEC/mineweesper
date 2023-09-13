<?php

namespace App\Traits;

trait OrderedRows
{
    function scopeLatest($query, $column = 'created_at', $direction = 'desc')
    {
        return $query->orderBy($column, $direction);
    }
}
