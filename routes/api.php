<?php

use App\Http\Controllers\Api\GameController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->prefix('user')->group(function () {
    Route::get('/statistics', [GameController::class, 'getUserStatistics'])->name('user.statistics');
    Route::get('/user', fn (Request $request) => $request->user());
});


Route::middleware(['auth:sanctum'])->prefix('games')->group(function () {
    Route::get('/', [GameController::class, 'getAllGames'])->name('games.all');
    Route::post('/', [GameController::class, 'createGame'])->name('games.create');
    Route::get('/current', [GameController::class, 'getLatestGame'])->name('games.current');
});
