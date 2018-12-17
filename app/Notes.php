<?php

namespace App;

use Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Bridge\User;

class Notes extends Model
{
    protected $fillable = [
        'title', 'body', 'reminder', 'color', 'userid',
    ];

    public function createNewNote($data)
    {
        Cache::flush();
        $note = Notes::create($data);
        Cache::remember('notes', (15), function () {
            $nn = Notes::where('userid', Auth::user()->id)->get();
            return $nn;
        });
        return $note;
    }

    public function getUserNotes()
    {
        $notes = Cache::remember('notes' . Auth::user()->id, (15), function () {
            $nn = Notes::where('userid', Auth::user()->id)->get();
            return $nn;
        });
        return $notes;
        // $notes =  Notes::where('userid',Auth::user()->id)->get();
        //  Redis::set(Auth::user()->id.'notes',$notes);
    }

}
