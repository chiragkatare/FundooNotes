<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Bridge\User;

class Notes extends Model
{
    protected $fillable = [
        'title','body', 'reminder', 'color','useremail',
    ];

}
