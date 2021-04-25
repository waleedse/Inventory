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
Route::post('/admin_login','Admin\AdminController@admin_login');
Route::post('/admin_check_auth','Admin\AdminController@admin_check_auth');

Route::post('/update_user','Admin\AdminController@update_user');
Route::post('/getuserbyid','Admin\AdminController@getuserbyid');
Route::post('/add_user','Admin\AdminController@add_user');
Route::post('/get_users','Admin\AdminController@get_users');

Route::post('/upload_business_logo','Admin\AdminController@upload_business_logo');

// Front Auth Controller
Route::post('/user_login','Front\AuthController@user_login');
Route::post('/user_check_auth','Front\AuthController@user_check_auth');

Route::post('/addcategory', 'Front\PosController@addcategory');
Route::post('/update_category', 'Front\PosController@update_category');
Route::post('/get_allcategories', 'Front\PosController@get_allcategories');
Route::post('/delete_category', 'Front\PosController@delete_category');

Route::post('add_product','Front\PosController@add_product');
Route::post('get_all_products','Front\PosController@get_all_products');
Route::post('get_product_by_id','Front\PosController@get_product_by_id');
Route::post('update_product','Front\PosController@update_product');
Route::post('get_user_product','Front\PosController@get_user_product');

Route::post('generate_invoice','Front\PosController@generate_invoice');
Route::post('save_invoice','Front\PosController@save_invoice');
Route::post('search_sales','Front\PosController@search_sales');
Route::post('print_sales_report','Front\PosController@print_sales_report');
Route::post('get_invoice_by_id','Front\PosController@get_invoice_by_id');
Route::post('get_admin_dash_data','Front\PosController@get_admin_dash_data');
