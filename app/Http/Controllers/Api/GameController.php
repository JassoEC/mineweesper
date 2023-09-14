<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewGameRequest;
use App\Http\Requests\UpdateCellRequest;
use App\Services\GameService;
use Illuminate\Http\Request;
use App\Http\Resources\Games\GameListItemResource;
use App\Http\Resources\Games\GameResource;
use App\Traits\ApiResponser;

class GameController extends Controller
{
    use ApiResponser;

    public function __construct(private GameService $games)
    {
    }

    function getGameById(Request $request, $id)
    {
        return new GameResource(
            $this->games->getGameById($id)
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

    function setFlaggedCell(UpdateCellRequest $request)
    {
        return  new GameResource(
            $this->games->addFlagToCell(
                $request->gameId,
                $request->row,
                $request->column
            )
        );
    }

    function setRevealedCell(UpdateCellRequest $request)
    {
        return  new GameResource(
            $this->games->addRevealedCell(
                $request->gameId,
                $request->row,
                $request->column
            )
        );
    }
}
