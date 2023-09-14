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

        $board = $this->fillBoard($rows, $columns, $mines);

        $newGame->fill([
            'rows' => $rows,
            'columns' => $columns,
            'mines' => $mines,
            'status' => GameStatus::PLAYING->value,
            'user_id' => $userId,
            'board' => json_encode($board),
        ]);

        $newGame->save();

        return $newGame->refresh();
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


    private function fillBoard(int $rows, int $columns, int $numberOdMines): array
    {
        $board = [
            'cells' => [],
            'mines' => [],
            'numberOfFlags' => 0,
            'numberOfMines' => $numberOdMines,
            'numberOfRevealedCells' => 0,
            'numberOfCells' => $rows * $columns,
        ];

        for ($r = 0; $r < $rows; $r++) {
            for ($c = 0; $c < $columns; $c++) {
                $board['cells'][$r][$c] = [
                    'hasMine' => false,
                    'isFlagged' => false,
                    'isRevealed' => false,
                    'row' => $r,
                    'column' => $c,
                    'minesAround' => 0
                ];
            }
        }

        return $board;
    }

    function fillMines(Game $game, int $rowSelected, int $columnSelected): Game
    {
        $rows = $game->rows;
        $columns = $game->columns;
        $numberOdMines = $game->mines;
        $board = json_decode($game->board, true);

        $cellWithMines = count($board['mines']);

        do {
            $mine = [
                'row' => rand(0, $rows - 1),
                'column' => rand(0, $columns - 1),
                'isFlagged' => false,
                'isRevealed' => false,
            ];

            if ($mine['row'] !== $rowSelected && $mine['column'] !== $columnSelected) {
                $board['cells'][$mine['row']][$mine['column']]['hasMine'] = true;
                $board['mines'][] = $mine;
                $cellWithMines++;
            }
        } while ($cellWithMines < $numberOdMines);

        for ($r = 0; $r < $rows; $r++) {
            for ($c = 0; $c < $columns; $c++) {
                $board['cells'][$r][$c]['minesAround'] = $this->getNumberOfMinesAround($board, $r, $c);
            }
        }

        $game->board = json_encode($board);
        $game->save();

        return $game->refresh();
    }

    function addFlagToCell($gameId, $row, $column): Game
    {
        $game = Game::find($gameId);

        if ($game->status !== GameStatus::PLAYING->value) {
            return $game;
        }

        $board = json_decode($game->board, true);

        if (count($board['mines']) === 0) {
            return $game;
        }

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
        $numberOfRevealedCells = $board['numberOfRevealedCells'];

        if (count($board['mines']) === 0) {
            $game = $this->fillMines($game, $row, $column);
            $board = json_decode($game->board, true);
        }

        $revealedCell = $board['cells'][$row][$column];

        if ($revealedCell['isRevealed'] || $revealedCell['isFlagged']) {
            return $game;
        }

        if ($revealedCell['hasMine']) {
            $board['cells'][$row][$column]['isRevealed'] = true;
            $game->board = json_encode($board);
            $game->status = GameStatus::LOST->value;
            $game->save();

            return $game->refresh();
        }

        $board['cells'][$row][$column]['isRevealed'] = true;
        $board['numberOfRevealedCells'] = ++$numberOfRevealedCells;

        $game->board = json_encode($board);
        $game->save();

        return $game->refresh();
    }

    private function getNumberOfMinesAround(array $board, int $row, int $column): int
    {
        $minesAround = 0;

        $rows = count($board['cells']);
        $columns = count($board['cells'][0]);

        for ($r = $row - 1; $r <= $row + 1; $r++) {
            for ($c = $column - 1; $c <= $column + 1; $c++) {
                if ($r >= 0 && $r < $rows && $c >= 0 && $c < $columns) {
                    if ($board['cells'][$r][$c]['hasMine']) {
                        $minesAround++;
                    }
                }
            }
        }

        return $minesAround;
    }
}
