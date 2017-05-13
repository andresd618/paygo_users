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

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:api');

    Route::get('users/index/{num}/{typeord}/{col}/{page}','UsersController@index')
                ->where([
                    'typeord' => '[A-Za-z]+',
                    'num' => '[0-9]+',
                    'col' => '[A-Za-z_]+',
                    'page' => '[0-9]+'
                ]);

    Route::get('users/{id}','UsersController@show');
    
    Route::delete('users','UsersController@destroy');
       
    Route::delete('users/truncate','UsersController@truncate');
        
    Route::put('users/{id}','UsersController@update');
        
    Route::post('users','UsersController@store');

