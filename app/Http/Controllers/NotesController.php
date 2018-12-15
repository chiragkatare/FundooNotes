<?php

namespace App\Http\Controllers;

use App\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;


class NotesController extends Controller
{
    public $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function create(Request $req)
    {
        $data = $req->all();
        $data['useremail'] = Auth::user()->email;
        Notes::create($data);
        return response()->json(['message' => 'Note Created'], 201);
    }

    public function getNotes()
    {
        
        // $notes = Cache::remember('notes',(15),function(){
        //     $nn =  Notes::where('useremail',Auth::user()->email)->get();
            
        //     return $nn;
        // });
        $notes =  Notes::where('useremail',Auth::user()->email)->get();
         Redis::set('Note',$notes);
        return response()->json(['message'=>$notes],200);
    }
}
