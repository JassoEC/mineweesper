<?php

namespace App\Http\Resources\Games;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'rows' => $this->rows,
            'columns' => $this->columns,
            'mines' => $this->mines,
            'status' => $this->status,
            'board' => json_decode($this->board),
        ];
    }
}
