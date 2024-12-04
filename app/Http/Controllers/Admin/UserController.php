<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    public function index() {
        $users = User::latest()->get();
        return Inertia::render('Admin/UserList', [
            'users' => $users,
        ]);
    }

    public function update(UpdateUserRequest $request, User $id) {
        $validated = $request->validated();

        $emailExist = User::where('email', $validated['email'])
                          ->where('id', '!=', $id->id)
                          ->exists();

        if($emailExist) {
            return redirect()->back()->withErrors(['email' => 'Email already in use'])->withInput();
        }

        $id->name = $validated['name'];
        $id->role = $validated['role'];

        if($id->email !== $validated['email']) {
            $id->email = $validated['email'];
        }

        $id->save();

        session()->flash('alert', [
            'type' => 'success', 
            'message' => 'User updated successfully!',
        ]);

        return to_route('user.list');
    }

    public function delete(User $id) {
        $id->delete();

        session()->flash('alert', [
            'type' => 'success',
            'message' => 'User deleted successfully!',
        ]);

        return to_route('user.list');
    }
}
