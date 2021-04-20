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

Route::view('/adminpanel/add-user','welcome');
Route::view('/adminpanel/edit-user/{id}','welcome');
Route::view('/adminpanel/users-list','welcome');
Route::view('/adminpanel/upload-user-logo/{id}','welcome');


Route::view('/pos/manage-category','welcome');
Route::view('/pos/add-product','welcome');
Route::view('/pos/edit-product/{id}','welcome');
Route::view('/pos/products-list','welcome');
Route::view('/pos/sales-report','welcome');
Route::view('/pos/invoice-details/{id}','welcome');


Route::view('/{path?}', 'welcome');
Route::get('{reactRoutes}', function () {
    return view('welcome');
});



Route::get('/', function () {
    return view('welcome');
});
