<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;
use Facades\App\Notes;


class NotesController extends Controller
{

    public function __construct()
    {

    }

    /**
     * Function to create new note
     * 
     * @return response
     */
    public function create(Request $req)
    {
        $data = $req->all();
        $data['userid'] = Auth::user()->id;
        $note = Notes::createNewNote($data);
        return response()->json(['message' => 'Note Created','id'=>$note->id], 201);
    }

    /**
     * Function to getb all the notes of the user
     * 
     * @return response
     */
    public function getNotes()
    {
        
        $notes = Notes::getUserNotes();
        return response()->json(['message'=>$notes],200);
    }

    public function editNotes(Request $req){
        $data = $req->all();
        
    }
}
