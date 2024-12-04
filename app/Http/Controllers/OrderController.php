<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function showOrderConfirmation() {
        $order = Order::where('user_id', auth()->id())
            ->latest()
            ->with('orderItems.product')
            ->first();
    
        if (!$order) {
            abort(404, "Order not found");
        }
    
        return inertia('OrderConfirmation', ['order' => $order]);
    }
}
