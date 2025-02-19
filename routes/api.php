<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\ItemController as ControllersItemController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/items', [ControllersItemController::class, 'index']);
Route::post('/items', [ControllersItemController::class, 'store']);
