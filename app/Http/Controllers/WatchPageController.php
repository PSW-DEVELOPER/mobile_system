<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class WatchPageController extends Controller
{
    public function index() {
        $watches = Product::where('category_id', 2)
                         ->where('status', 1)
                         ->latest()
                         ->paginate(12);

        return Inertia::render('Watch', [
            'watches' => $watches,
        ]);
    }
}
