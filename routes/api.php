<?php

use App\Http\Controllers\AttributionController;
use App\Http\Controllers\ComputerController;
use App\Http\Controllers\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/computers', [ComputerController::class, 'findAll']);
Route::post('/computer/create', [ComputerController::class, 'add']);
Route::post('/attribution/create', [AttributionController::class, 'create']);
Route::post('/attribution/remove/{id}', [AttributionController::class, 'deleteAttribution']);
Route::get('/customer/search', [CustomerController::class, 'search']);
Route::post('/customer/create', [CustomerController::class, 'create']);
