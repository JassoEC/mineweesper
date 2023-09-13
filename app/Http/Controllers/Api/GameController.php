<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewGameRequest;
use App\Services\GameService;
use Illuminate\Http\Request;
use App\Http\Resources\Games\GameResource;
use App\Traits\ApiResponser;

class GameController extends Controller
{
    use ApiResponser;

    public function __construct(private GameService $games)
    {
    }

    function getLatestGame()
    {
        return new GameResource(
            $this->games->getLatestGame(auth()->id())
        );
    }

    function createGame(NewGameRequest $request)
    {
        return new GameResource(
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
        return GameResource::collection(
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
