<?php

namespace App\Enums;

enum GameStatus: string
{
    case WON = 'won';
    case PLAYING = 'playing';
    case LOST = 'lost';
}
