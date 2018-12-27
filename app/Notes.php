<?php

namespace App;

use Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Bridge\User;

class Notes extends Model
{
    protected $fillable = [
        'title', 'body', 'reminder', 'color', 'userid','pinned','archived','deleted',
    ];

    public function createNewNote($data)
    {
        Cache::forget('notes' . Auth::user()->id);
        // $noteee = Cache::get('notes'.Auth::user()->id);
        // $ss = $noteee->where('id',24);
        $note = Notes::create($data);
        Cache::remember('notes', (15), function () {
            $nn = Notes::where('userid', Auth::user()->id)->get();
            return $nn;
        });
        return $note;
    }

    public function getUserNotes()
    {
        Cache::forget('notes' . Auth::user()->id);
        $notes = Cache::remember('notes' . Auth::user()->id, (30), function () {
            $nn = Notes::where('userid', Auth::user()->id)->get();
            return $nn;
        });
        return $notes;
        // $notes =  Notes::where('userid',Auth::user()->id)->get();
        //  Redis::set(Auth::user()->id.'notes',$notes);
    }

}
