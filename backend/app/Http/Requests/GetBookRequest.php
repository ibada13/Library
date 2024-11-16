<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;

class GetBookRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "id"=>"required|integer",
            "page"=>"nullable|integer|min:1",   
        ];
    }
    public function messages():array
    {
        return[
            "id.integer"=>"The Id must be an valide integer",
            "id.required"=>"The Id is required",
            "page.integer"=>"The Id must be an valide integer",
            "page.min"=>"The page parameter must be at least 1"
            
        ];
    }
}
