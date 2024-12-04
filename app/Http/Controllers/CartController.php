<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function index() {
        $cart = session()->get('cart', []);
        $products = Product::all();
        return Inertia::render('Cart',[
            'products' => $products,
        ]);
    }

    public function buyNow(Request $request)
{
    $request->validate([
        'id' => 'required|exists:products,id',
        'name' => 'required|string',
        'price' => 'required|numeric',
        'quantity' => 'required|integer|min:1',
        'photo' => 'required|string',
    ]);

    $cart = session()->get('cart', []);

    $newItem = [
        'id' => $request->input('id'),
        'name' => $request->input('name'),
        'price' => $request->input('price'),
        'quantity' => $request->input('quantity'),
        'photo' => $request->input('photo'),
        'total' => $request->input('price') * $request->input('quantity'),
    ];

    $cart[] = $newItem;
    session()->put('cart', $cart);

    return redirect(route('checkout'));
}

    public function addToCart(Request $request) {
        // Get current cart from session
        $cart = session()->get('cart', []);

        // Create a new cart item
        $newItem = [
            'id' => $request->input('id'),
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'quantity' => $request->input('quantity'),
            'photo' => $request->input('photo'),
            'total' => $request->input('price') * $request->input('quantity'),
        ];

        // Check if the item already exists in the cart and update quantity
        foreach ($cart as &$item) {
            if ($item['id'] === $newItem['id']) {
                $item['quantity'] += $newItem['quantity'];
                $item['total'] = $item['price'] * $item['quantity'];
                session()->put('cart', $cart);
                return back();
            }
        }

        // Add new item if not found
        $cart[] = $newItem;
        session()->put('cart', $cart);

        return back();
    }

    public function removeCartItem(String $id)
    {
        $cart = session()->get('cart', []);

        // Remove the item from the cart
        foreach ($cart as $key => $cartItem) {
            if ($cartItem['id'] == $id) {
                unset($cart[$key]);
                break;
            }
        }

        // Reindex the array
        $cart = array_values($cart);

        // Update the session with the modified cart
        session()->put('cart', $cart);
        return back();
    }

    public function updateCartItem(Request $request) {
        $cart = session()->get('cart', []);

        foreach ($cart as $key => $cartItem) {
            if($cartItem['id'] == $request[$key]['id']) {
                $cart[$key]['quantity'] = $request[$key]['quantity'];
                $cart[$key]['total'] = $request[$key]['total'];
            }
        }

        session()->put('cart', $cart);

        session()->flash('alert', [
            'type' => 'success',
            'message' => 'Updated Cart',
        ]);

        return back();
    }
}
