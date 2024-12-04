<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    public function index() {
        $categories = Category::all();
        $products = Product::latest()->get();

        return Inertia::render('Admin/ProductList', [
            'categories' => $categories,
            'products' => $products,
        ]);
    }

    public function store(StoreProductRequest $request) {
        $validated = $request->validated();

        $product = new Product();

        $product->name = $validated['name'];
        $product->description = $validated['description'];
        $product->category_id = $validated['category'];
        $product->stock = $validated['stock'];
        $product->price = $validated['price'];
        $product->status = $validated['status'];
        $product->photo = $validated['photo']->storeAs('images', date('YmdHis').'.'.$validated['photo']->getClientOriginalExtension());
        $product->save();

        session()->flash('alert', [
            'type' => 'success', // Type of alert (e.g., success, error, warning, info)
            'message' => 'New Product created successfully!',
        ]);

        return to_route('product.list');
    }

    public function update(UpdateProductRequest $request, String $id) {
        $validated = $request->validated();

        $product = Product::findOrFail($id);
        $product->name = $validated['name'];
        $product->description = $validated['description'];
        $product->category_id = $validated['category'];
        $product->stock = $validated['stock'];
        $product->status = $validated['status'];
        $product->price = $validated['price'];

        if($request->hasFile('photo')) {
            $validator = validator($request->all(), [
                'photo' => 'file|mimes:jpg,jpeg,png,pdf|max:2048'
            ]);
            if($validator->fails()) {
                return back()->withErrors($validator);
            }
            Storage::delete($product->photo);
            $product->photo = $request->file('photo')->storeAs('images', date('YmdHis').'.'.$request->file('photo')->getClientOriginalExtension());
        }

        $product->save();

        session()->flash('alert', [
            'type' => 'success', // Type of alert (e.g., success, error, warning, info)
            'message' => 'Product updated successfully!',
        ]);

        return to_route('product.list');
    }

    public function delete(Product $id) {
        Storage::delete($id->photo);
        $id->delete();

        session()->flash('alert', [
            'type' => 'success', // Type of alert (e.g., success, error, warning, info)
            'message' => 'Product deleted successfully!',
        ]);

        return to_route('product.list');
    }
}
