<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewGameRequest;
use App\Services\GameService;
use Illuminate\Http\Request;
use App\Http\Resources\Games\GameListItemResource;
use App\Traits\ApiResponser;

class GameController extends Controller
{
    use ApiResponser;

    public function __construct(private GameService $games)
    {
    }

    function getLatestGame()
    {
        return new GameListItemResource(
            $this->games->getLatestGame(auth()->id())
        );
    }

    function createGame(NewGameRequest $request)
    {
        return new GameListItemResource(
            $this->games->createGame(
                $request->rows,
                $request->columns,
                $request->mines,
                auth()->id()
            )
        );
    }

    function getAllGames()
    {
        return GameListItemResource::collection(
            $this->games->getAllGames()
        );
    }

    function getUserStatistics()
    {
        return $this->successResponse(
            $this->games->getStatistics()
        );
    }
}
