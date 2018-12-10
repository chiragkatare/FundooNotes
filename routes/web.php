<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth::routes(['verify' => true]);


Route::get('/', function () {
    return view('welcome');
});

Route::get('/register', function () {
    return view('welcome');
});
Route::get('/details', function () {
    return view('welcome');
});
Route::get('/forgetpassword', function () {
    return view('welcome');
});
Route::get('/verifyemail/{token}', function () {
    return view('welcome');
});
Route::get('/passwordreset/{token}', function () {
    return view('welcome');
});
Route::get('/dashboard', function () {
    return view('welcome');
});
