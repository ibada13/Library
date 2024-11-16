<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CommentController;
use App\Models\Book;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/hello', function () {
    return response()->json([
        "data"=>"hello",
    ]);
});
Route::get('books', [BookController::class, 'getbooks']);
Route::get('book', [BookController::class, 'getbook']);
Route::delete('book' , [BookController::class,'deletebook']);
Route::post('book',[BookController::class  ,'postbook']);


Route::delete('comment' , [CommentController::class , 'deletecomment']);

Route::post('comment' , [CommentController::class , 'postcomment']);
