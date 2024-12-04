<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Notification;
use App\Notifications\OrderRequestNotification;

class OrderRequestController extends Controller
{
    public function index() {
        $orders = Order::latest()
                        ->with('user')
                        ->get();

        return Inertia::render('Admin/OrderMail', [
            'orders' => $orders
        ]);
    }

    public function show(Order $order) {
        $order->load(['user', 'orderItems.product']);
        return Inertia::render('Admin/OrderRequestDetail', [
            'order' => $order,
            'orderDetails' => $order->orderItems,
        ]);
    }

    public function update(Order $order, Request $request) {
        $user = User::findOrFail($order->user_id);
        
        if($request->status == 1) {
            Notification::send($user, new OrderRequestNotification("Your orderID #$order->id have been canceled By PSW MOBILE TEAM."));
        }
        
        if($request->status == 2) {
            Notification::send($user, new OrderRequestNotification("Your orderID #$order->id is confirm. We are delivering your products safely."));
        }
        
        $order->status = $request->status;
        $order->save();

        return back();
    }
}
