<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewGameRequest;
use App\Services\GameService;
use Illuminate\Http\Request;
use App\Http\Resources\Games\GameResource;

class GameController extends Controller
{
    public function __construct(private GameService $games)
    {
    }

    function getLatestGame()
    {
        return $this->games->getLatestGame(auth()->id());
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
}
