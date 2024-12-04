<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index() {
        $phones = Product::where('category_id', '1')->get();
        $watches = Product::where('category_id', '3')->get();
        $orders = Order::where('status', 0)->get();
        $users = User::where('role', 0)->get();
        $income = Order::where('status', 2)->get();
        return Inertia::render('Admin/Dashboard', [
            'phone' => $phones,
            'watch' => $watches,
            'order' => $orders,
            'user' => $users,
            'income' => $income,
        ]);
    }
}
