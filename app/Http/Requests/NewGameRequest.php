<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewGameRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'rows' => 'required|integer|between:1,100',
            'columns' => 'required|integer|between:1,100',
            'mines' => 'required|integer|between:1,100',
        ];
    }
}
