<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class DetailController extends Controller
{
    public function index (String $id) {
        $product = Product::findOrFail($id);
        $relatedProduct = Product::where('category_id', $product->category_id)
                                 ->where('id', '!=', $product->id)
                                 ->get();
        return Inertia::render('Detail', [
            'product' => $product,
            'relatedProduct' => $relatedProduct,
        ]);
    }
}
