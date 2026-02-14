<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\SubscriberController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\HeroSlideController;
use App\Http\Controllers\Api\LookbookController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\FeatureController;
use App\Http\Controllers\Api\InstagramPostController;
use App\Http\Controllers\Api\ContactInquiryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{slug}', [BlogController::class, 'show']);
Route::get('/settings', [SettingController::class, 'index']);
Route::post('/subscribe', [SubscriberController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);
});
Route::post('/orders', [OrderController::class, 'store']);

Route::get('/hero-slides', [HeroSlideController::class, 'index']);
Route::get('/lookbook', [LookbookController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/features', [FeatureController::class, 'index']);
Route::get('/instagram-posts', [InstagramPostController::class, 'index']);
Route::post('/contact-inquiry', [ContactInquiryController::class, 'store']);
