<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class LoginController extends Controller
{
    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login()
    {
        $pass = request('password');
   if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
       $user = Auth::user();
       print_r($user);
       $success['token'] =  $user->createToken('MyApp')->accessToken;
       return response()->json(['success' => $success], 200);
   }
   else{
       return response()->json(['error'=>'Unauthorised'], 401);
   }
     echo 'login';
    }

    function userDetails(){
        Auth::user();
    }
}


