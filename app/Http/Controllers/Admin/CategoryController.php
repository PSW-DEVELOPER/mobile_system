<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function store(Request $request) {

        $validated = validator($request->all(), [
            'category' => 'required',
        ]);

        if($validated->fails()) {
            return redirect()->back()->withErrors($validated);
        }

        $category = new Category();

        $category->name = $request->category;
        $category->save();

        session()->flash('alert', [
            'type' => 'success', // Type of alert (e.g., success, error, warning, info)
            'message' => 'New Category created successfully!',
        ]);

        return to_route('product.list');
    }
}
