<?php

namespace App\Http\Controllers;

use App\Services\GameService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function __construct(private GameService $games)
    {
    }

    function index()
    {
        return Inertia::render('Dashboard');
    }
}
