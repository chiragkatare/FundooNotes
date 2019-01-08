<?php

use Illuminate\Http\Request;

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



// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', 'UserController@login')->name('login');
Route::post('register','UserController@register');
Route::post('verifyemail','UserController@verifyEmail');
Route::post('forgotpassword','PasswordResetController@create');
Route::post('forgotpassword/find','PasswordResetController@find');
Route::post('forgotpassword/reset','PasswordResetController@reset');
Route::post('sociallogin','UserController@socialLogin');
// Route::get('/user', 'UserController@userDetails')->middleware('auth:api');

// Route::group(['middleware' => ['auth:api']], function()
// {
//     Route::get('/', function()
//     {
//         // Has Foo And Bar Middleware
//     });

//     Route::get('user/profile', function()
//     {
//         // Has Foo And Bar Middleware
//     });

// });



Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/userdetails', 'UserController@userDetails');
    Route::get('/logout', 'UserController@logout');
    Route::get('/getnotes', 'NotesController@getNotes');
    Route::post('/createnote', 'NotesController@create');
    Route::post('/editnote', 'NotesController@editNotes');
    Route::post('/deletenote', 'NotesController@deleteNote');
    Route::post('/makelabel', 'LabelController@makeLabel');
    Route::post('/addnotelabel', 'LabelController@addNoteLabel');
    Route::post('/deletenotelabel', 'LabelController@deleteNoteLabel');
    Route::post('/deletelabel', 'LabelController@deleteLabel');
    Route::post('/editlabel', 'LabelController@editLabel');
    Route::post('/addprofilepic', 'UserController@addProfilepic');
});
