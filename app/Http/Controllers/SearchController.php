<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request) {

        $search = $request->input('search');

        $product = Product::where('status', 1)
                ->where('name', 'like', "%$search%")
                ->paginate(12);

        return Inertia::render('Search', [
            'products' => $product,
        ]);
    }
}
