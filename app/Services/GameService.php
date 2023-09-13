<?php

namespace App\Services;

use App\Enums\GameStatus;
use App\Models\Game;

class GameService
{
    function getLatestGame(int $userId): ?Game
    {
        return Game::where('status', GameStatus::PLAYING->value)
            ->where('user_id', $userId)
            ->latest()
            ->first();
    }

    function createGame(int $rows, int $columns, int $mines, int $userId)
    {
        $newGame = Game::create([
            'rows' => $rows,
            'columns' => $columns,
            'mines' => $mines,
            'status' => GameStatus::PLAYING->value,
            'user_id' => $userId,
            'board' => [
                'mines' => $this->fillMines($rows, $columns, $mines),
                'revealed' => [],
                'flagged' => []
            ],
        ]);

        return $newGame;
    }


    private function fillMines(int $rows, int $columns, int $mines)
    {
        $mines = [];
        for ($i = 0; $i < $mines; $i++) {
            $mine = [
                'row' => rand(0, $rows - 1),
                'column' => rand(0, $columns - 1)
            ];

            // if (!in_array($mine, $mines)) {
            //     $mines[] = $mine;
            // } else {
            //     $i--;
            // }
        }

        return $mines;
    }
}
