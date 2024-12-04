<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'flash' => function () {
                return session('alert');
            },

            'cart' => function () {
                return session('cart', []); // Return cart data from session
            },

            'notifications' => function () {
                return auth()->check() ? auth()->user()->unreadNotifications : [];
            }
        ]);
    }
}
