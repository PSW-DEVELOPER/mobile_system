<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class CheckOutController extends Controller
{
    public function index () {
        $cart = session()->get('cart', []);
        return Inertia::render('CheckOut', [
            'cart' => $cart,
        ]);
    }

    public function checkout(Request $request) {
        $validated = $request->validate([
            'data.id' => 'required|integer',
            'data.product_ids' => 'required|array',
            'data.product_ids.*' => 'integer|exists:products,id', // Validate each product ID
            'data.product_details' => 'required|array',
            'data.total' => 'required',
        ]);

        // Create the order
        $order = Order::create([
            'user_id' => $validated['data']['id'],
            'total' => $validated['data']['total'],
        ]);

        // Attach products to the order
        foreach ($validated['data']['product_details'] as $product) {
            $order->orderItems()->create([
                'product_id' => $product['id'],
                'quantity' => $product['quantity'],
                'price' => $product['price'],
            ]);

            $productModel = Product::findOrFail($product['id']);
            $productModel->decrement('stock', $product['quantity']);
        };

        session()->forget('cart');

        // Redirect to OrderConfirmation page with order details
        return inertia('OrderConfirmation', ['order' => $order->load('orderItems.product')]);
    }
}
