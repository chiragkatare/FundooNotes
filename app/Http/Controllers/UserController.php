<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// /use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\User;
use App\Events\UserRegistered;

/**
 * controller for user api
 */
class UserController extends Controller
{


    /**
     * function to register user 
     * @var request the request which it gets from uri
     * @return response to send to the uri
     */
    public function register(Request $request)
    {
        $inp = $request->all();
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|max:10',
            'lastname' => 'required|max:10',
            'email' => 'bail|required|email|unique:users',
            'password' => 'required|min:8|max:15',
            'rpassword' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()],210);
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['firstname'] = $user->name;
        //calling the event user registered
        event(new UserRegistered($user));
        return response()->json(['message'=>'registration succesfull'], 201);
    }
    
    /**
     * function to login user 
     * 
     * @return response
     */
    public function login()
    {
        //getting user email
        $email=request('email');
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();

            $token =  $user->createToken('fundoo')->accessToken;
            return response()->json(['token' => $token], 200);
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 204);
        }
    }

    /**
     * function to get details of the user 
     * 
     * @return response
     */
    public function userDetails(){
        $user = Auth::user();
        return response()->json([$user],200);
    }
    
    /**
     * function to logout user 
     * 
     * @return response
     */
    public function logout(){
        Auth::user()->token()->revoke();
        echo 'logout successfull';
        // return response()->json(['message'=>'Logout SuccesFull'],204);
    }

    /**
     * function to help forgot password of the user 
     * 
     * @return response
     */
    public function forgotPassword(){
        $validator = Validator::make($request->all(), [
            'email' => 'bail|required|email|unique:users',
        ]);
        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()],200);
        }
    }

}
