<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DetailController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CheckOutController;
use App\Http\Controllers\PhonePageController;
use App\Http\Controllers\WatchPageController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrderRequestController;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/products', [ProductController::class, 'index'])->name('product.list');
    Route::post('/admin/products', [ProductController::class, 'store'])->name('store.product');
    Route::post('/admin/products/{id}/update', [ProductController::class, 'update'])->name('update.product');
    Route::post('/admin/products/{id}/delete', [ProductController::class, 'delete'])->name('delete.product');
    Route::post('/admin/categories', [CategoryController::class, 'store'])->name('store.category');
    Route::get('/admin/users', [UserController::class, 'index'])->name('user.list');
    Route::post('/admin/users/{id}/update', [UserController::class, 'update'])->name('update.user');
    Route::post('/admin/users/{id}/delete', [UserController::class, 'delete'])->name('delete.user');
    Route::get('/admin/orders', [OrderRequestController::class, 'index'])->name('order.list');
    Route::get('/admin/orders/{order}/detail', [OrderRequestController::class, 'show'])->name('order.detail');
    Route::post('/admin/orders/{order}/update', [OrderRequestController::class, 'update'])->name('order.status');
});

Route::get('/', [HomeController::class, 'index']);
Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/phones', [PhonePageController::class, 'index'])->name('phone');
Route::get('/watches', [WatchPageController::class, 'index'])->name('watch');
Route::get('/detail/{id}', [DetailController::class, 'index'])->name('product.detail');
Route::get('/cart', [CartController::class, 'index'])->name('cart');
Route::post('/cart/add-to-cart/', [CartController::class, 'addToCart'])->name('addToCart');
Route::post('/cart/buy-now', [CartController::class, 'buyNow'])->name('buynow');
Route::post('/cart/{id}/remove', [CartController::class, 'removeCartItem'])->name('remove.cartItem');
Route::post('/cart/update', [CartController::class, 'updateCartItem'])->name('update.cartItem');
Route::get('/checkout', [CheckOutController::class, 'index'])->name('checkout');
Route::post('/checkout', [CheckOutController::class, 'checkout'])->name('request.order');
Route::get('/order-confirmation', [OrderController::class, 'showOrderConfirmation'])->name('order.confirmation');
Route::post('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('read.notification');
Route::get('/search', [SearchController::class, 'search'])->name('search');

require __DIR__.'/auth.php';
