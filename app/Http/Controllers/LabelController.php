<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Labels;
use Illuminate\Support\Facades\Auth;
use App\LabelsNotes;

class LabelController extends Controller
{
    //

    public function makeLabel(Request $req){

        $label['label'] = $req->get('label');
        $label['userid']= Auth::user()->id;
        $ll = Labels::create($label);
        return response()->json(['message'=>'created'],200);
    }

    public function addNoteLabel(Request $req){
        $label['labelid'] = $req->get('labelid');
        $label['noteid'] = $req->get('noteid');
        $label['userid']= Auth::user()->id;
        LabelsNotes::create($label);
        return response()->json('added',200);
    }

}
