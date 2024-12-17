<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::get('/', function () {
    return view('welcome');
}); 
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});




Route::group([
    'middleware' => 'api',
    'prefix' => 'auth',
], function () {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login_tienda', [AuthController::class, 'login_tienda'])->name('login_tienda');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('/me', [AuthController::class, 'me'])->name('me');
});

Route::group([
    'middleware' => 'api',
], function () {
    Route::resource('/users', UserController::class);
    Route::post('/users/{id}', [UserController::class, "update"]);
});
