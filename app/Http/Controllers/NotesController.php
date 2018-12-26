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
        return response()->json(['message' => 'Note Created', 'id' => $note->id], 201);
    }

    /**
     * Function to getb all the notes of the user
     * 
     * @return response
     */
    public function getNotes()
    {
        $notes = Notes::getUserNotes();
        // $noteee = Cache::get('notes'.Auth::user()->id);
        // $ss = $noteee->where('id',24);
        return response()->json(['message' => $notes], 200);
    }

    /**
     * Function to edit notes
     */
    public function editNotes(Request $req)
    {
        $data = $req->all();
        $notes = Cache::get('notes' . Auth::user()->id);
        $note = Notes::where('id', $req->get('id'));
        $note->update(
            [
                'id' => $req->get('id'),
                'title' => $req->get('title'),
                'body' => $req->get('body'),
                'reminder' => $req->get('reminder'),
                'color' => $req->get('color'),
                'userid' => $req->get('userid'),
                'pinned' => $req->get('pinned'),
                
            ]
        );

        // $note->id = $req->get('id');
        // $note->title = $req->get('title');
        // $note->body = $req->get('body');
        // $note->reminder = $req->get('reminder');
        // $note->color = $req->get('color');
        // $note->userid = $req->get('userid');
        // $note->pinned = $req->get('pinned');
        // $note->save();
        return response()->json(['message' => $note], 201);

    }
}