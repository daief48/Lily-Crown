<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function () {
    // Role & Permission management (requires admin role)
    Route::group(['middleware' => ['role:admin']], function () {
        Route::resource('roles', App\Http\Controllers\Admin\RoleController::class);
        Route::resource('permissions', App\Http\Controllers\Admin\PermissionController::class);
    });
    Route::resource('categories', App\Http\Controllers\Admin\CategoryController::class);
    Route::resource('products', App\Http\Controllers\Admin\ProductController::class);
    Route::resource('blogs', App\Http\Controllers\Admin\BlogController::class);
    Route::resource('orders', App\Http\Controllers\Admin\OrderController::class);
    Route::resource('subscribers', App\Http\Controllers\Admin\SubscriberController::class);
    Route::resource('settings', App\Http\Controllers\Admin\SiteSettingController::class);
    Route::resource('hero-slides', App\Http\Controllers\Admin\HeroSlideController::class);
    Route::resource('lookbook', App\Http\Controllers\Admin\LookbookController::class);
    Route::resource('testimonials', App\Http\Controllers\Admin\TestimonialController::class);
    Route::resource('features', App\Http\Controllers\Admin\FeatureController::class);
    Route::resource('instagram-posts', App\Http\Controllers\Admin\InstagramPostController::class);
    Route::resource('users', App\Http\Controllers\Admin\UserController::class);
    Route::resource('contact-inquiries', App\Http\Controllers\Admin\ContactInquiryController::class);
});
