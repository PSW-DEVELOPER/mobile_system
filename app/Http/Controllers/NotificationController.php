<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\Notification;

class NotificationController extends Controller
{
    public function markAsRead(String $id) {
        $user = Auth::user();

        if($user) {
            $notification = $user->unreadNotifications()->find($id);
            if($notification) {
                $notification->markAsRead();
                $notification->delete();
            }
        }

        return redirect()->back();
    }
}
