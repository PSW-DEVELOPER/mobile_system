<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index() {
        $products = Product::all();
        $newProducts = Product::latest()->take(1)->get();

        return Inertia::render('Dashboard', [
            'products' => $products,
            'newProducts' => $newProducts,
        ]);
    }
}
