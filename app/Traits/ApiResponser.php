<?php

namespace App\Traits;

trait ApiResponser
{
    public function successResponse(mixed $data, ?string $message = '', int $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $code);
    }
}
