<?php

namespace App\Services;

use App\Enums\GameStatus;
use App\Models\Game;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;

class GameService
{
    function getAllGames(): Collection
    {
        return Game::where('user_id', auth()->id())->get();
    }

    function getGameById(int $gameId): ?Game
    {
        return Game::find($gameId);
    }

    function createGame(int $rows, int $columns, int $mines, int $userId)
    {
        $newGame = new Game();

        $board = $this->fillCells($rows, $columns, $mines);

        $newGame->fill([
            'rows' => $rows,
            'columns' => $columns,
            'mines' => $mines,
            'status' => GameStatus::PLAYING->value,
            'user_id' => $userId,
            'board' => json_encode($board),
        ]);

        $newGame->save();

        return $newGame;
    }

    function getStatistics(): mixed
    {
        return [
            'won' => 1,
            'lost' => 2,
            'played' => 3,
            'playing' => 1,
        ];
    }


    private function fillCells(int $rows, int $columns, int $numberOdMines): array
    {
        $cellWithMines = [];

        for ($i = 0; $i < $numberOdMines; $i++) {
            $cellWithMines[] = [
                'row' => rand(0, $rows - 1),
                'column' => rand(0, $columns - 1),
            ];
        }

        $cells = [];
        $mines = [];

        for ($r = 0; $r < $rows; $r++) {
            for ($c = 0; $c < $columns; $c++) {
                if (Arr::first($cellWithMines, fn ($cell) => $cell['row'] === $r && $cell['column'] === $c)) {
                    $cells[$r][$c] = [
                        'hasMine' => true,
                        'isFlagged' => false,
                        'isRevealed' => false,
                        'row' => $r,
                        'column' => $c,
                    ];
                    $mines[] = [
                        'row' => $r,
                        'column' => $c,
                        'isFlagged' => false,
                        'isRevealed' => false,
                    ];

                    continue;
                }

                $cells[$r][$c] = [
                    'hasMine' => false,
                    'isFlagged' => false,
                    'isRevealed' => false,
                    'row' => $r,
                    'column' => $c,
                ];
            }
        }

        return ['cells' => $cells, 'mines' => $mines];
    }

    function addFlagToCell($gameId, $row, $column): Game
    {
        $game = Game::find($gameId);

        if ($game->status !== GameStatus::PLAYING->value) {
            return $game;
        }

        $board = json_decode($game->board, true);

        $flaggedCell = $board['cells'][$row][$column];

        if ($flaggedCell['isFlagged']) {
            $board['cells'][$row][$column]['isFlagged'] = false;
            $game->board = json_encode($board);
            $game->save();
            return $game->refresh();
        }

        $board['cells'][$row][$column]['isFlagged'] = true;

        $game->board = json_encode($board);
        $game->save();

        return $game->refresh();
    }

    function addRevealedCell($gameId, $row, $column): Game
    {
        $game = Game::find($gameId);

        if ($game->status !== GameStatus::PLAYING->value) {
            return $game;
        }

        $board = json_decode($game->board, true);

        $revealedCell = $board['cells'][$row][$column];

        if ($revealedCell['isRevealed'] || $revealedCell['isFlagged']) {
            return $game->refresh();
        }

        if ($revealedCell['hasMine']) {
            $board['cells'][$row][$column]['isRevealed'] = true;
            $game->board = json_encode($board);
            $game->status = GameStatus::LOST->value;
            $game->save();

            return $game->refresh();
        }

        $board['cells'][$row][$column]['isRevealed'] = true;

        $game->board = json_encode($board);
        $game->save();

        return $game->refresh();
    }
}
