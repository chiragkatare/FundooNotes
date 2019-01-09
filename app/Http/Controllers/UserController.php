<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// /use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\User;
use App\Events\UserRegistered;
use Illuminate\Support\Facades\Redirect;

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
        $input = $request->all();
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|max:20',
            'lastname' => 'required|max:20',
            'email' => 'bail|required|email|unique:users',
            'password' => 'required|min:8|max:15',
            'rpassword' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 210);
        }
        $input["created_at"] = now();
        $input['password'] = bcrypt($input['password']);
        $input['verifytoken'] = str_random(60);
        $user = User::create($input);
        event(new UserRegistered($user, $input['verifytoken']));
        return response()->json(['message' => 'registration succesfull'], 201);
    }

    /**
     * function to login user 
     * 
     * @return response
     */
    public function login()
    {
        //getting user email
        $email = request('email');
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            if ($user->email_verified_at === null) {
                return response()->json(['message' => 'Email Not Verified'], 211);
            }
            $token = $user->createToken('fundoo')->accessToken;
            return response()->json(['token' => $token, 'userdetails' => Auth::user()], 200);
        } else {
            return response()->json(['error' => 'Unauthorised'], 204);
        }
    }

    /**
     * function to get details of the user 
     * 
     * @return response
     */
    public function userDetails()
    {
        $user = User::with('labels')->find(Auth::user()->id);
        return response()->json([$user], 200);
    }

    /**
     * function to logout user 
     * 
     * @return response
     */
    public function logout()
    {
        Auth::user()->token()->revoke();
        echo 'logout successfull';
        // return response()->json(['message'=>'Logout SuccesFull'],204);
    }

    /**
     * function to help forgot password of the user 
     * 
     * @return response
     */
    public function forgotPassword()
    {
        $validator = Validator::make($request->all(), [
            'email' => 'bail|required|email|unique:users',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
    }

    /**
     * function to verify email of the user and add the time stamp to user verified field in user table
     * 
     * @return response
     */
    public function verifyEmail()
    {
        $id = request('id');
        $token = request('token');
        $user = User::where("verifytoken", $token)->first();
    //    / $user = User::where("email", $email)->first();
        if (!$user) {
            return response()->json(['message' => "Not a Registered Email"], 200);
        } else if ($user->email_verified_at === null) {
            $user->email_verified_at = now();
            $user->save();
            return response()->json(['message' => "Email Successfully Verified"], 201);
        } else {
            return response()->json(['message' => "Email Already Verified"], 202);
        }
    }


    /**
     * function to login user via social service websites 
     * 
     * all things handled by front end
     * 
     * @var Request
     * @return Response
     */
    public function socialLogin(Request $request)
    {
        $input = $request->all();
        // $input["created_at"] = now();
        $input['password'] = bcrypt(str_random(8));
        $input['verifytoken'] = str_random(60);
        $user = User::where([
            ['email', $input['email']]
        ])->first();
        if (!$user) {
            $user = User::create($input);
            //verufy user email as it is by sociallogin
            $user->email_verified_at = now();
        // event(new UserRegistered($user, $input['verifytoken']));
        }
        $user->provider= $input['provider'];
        $user->providerprofile= $input['providerprofile'];
        $user->save();
        Auth::login($user, true);
        $token = Auth::user()->createToken('fundoo')->accessToken;
        return response()->json(['token' => $token, 'userdetails' => Auth::user()], 200);
    }

    /**
     * function to add the profile pic of the user
     * 
     * @var Request
     * @return Response
     */
    public function addProfilepic(Request $req){
        $reqss = $req->all();
        if($req->hasFile('profilepic')){
            //filename
            $origImage=$req->file('profilepic');
            $ext = $req->file('profilepic')->getClientOriginalExtension();
            //if image is svg
            if($ext==='svg'){
                $ext='svg+xml';
            }

            //getting the path of image in temp folder
            $path = $req->file('profilepic')->getRealPath();
            //converting to base64 to save it in database
            $base64 = 'data:image/' . $ext . ';base64,' . base64_encode(file_get_contents($path));
            //getting the authenticated user
            $user= Auth::user();
            //adding the profile pic to the user and saving it in the database
            $user->profilepic = $base64;
            $user->save();

            //returning the response to the user
            return response()->json(['message'=>'done','data'=> User::with('labels')->find($user->id)],200);
        }
     }

}
