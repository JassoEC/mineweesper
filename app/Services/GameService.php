<?php

namespace App\Services;

use App\Enums\GameStatus;
use App\Models\Game;
use Illuminate\Database\Eloquent\Collection;

class GameService
{
    function getAllGames(): Collection
    {
        return Game::where('user_id', auth()->id())->get();
    }

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
            'board' => json_encode([
                'mines' => $this->fillMines($rows, $columns, $mines),
                'revealed' => [],
                'flagged' => []
            ]),
        ]);

        return $newGame;
    }

    function getStatistics(): mixed
    {
        return [
            'won' => 1,
            'lost' => 3,
            'played' => 2,
        ];
    }


    private function fillMines(int $rows, int $columns, int $mines)
    {
        $mines = [
            ['row' => 0, 'column' => 0],
            ['row' => 5, 'column' => 5],
            ['row' => 5, 'column' => 4],
        ];
        // $mines = [];
        // for ($i = 0; $i < $mines; $i++) {
        //     $mine = [
        //         'row' => rand(0, $rows - 1),
        //         'column' => rand(0, $columns - 1)
        //     ];

        //     if (!in_array($mine, $mines)) {
        //         $mines[] = $mine;
        //     } else {
        //         $i--;
        //     }
        // }

        return $mines;
    }
}
