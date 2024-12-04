<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class PhonePageController extends Controller
{
    public function index() {
        
        $phones = Product::where('category_id', 1)
                         ->where('status', 1)
                         ->latest()
                         ->paginate(12);

        return Inertia::render('Phone', [
            'phones' => $phones,
        ]);
    }
}
