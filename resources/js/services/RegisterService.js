//import React, { Component } from "react";
import axios from "axios";

export  default function registerReq(data){

    console.log("helo",data);
    // var headers={
    //     'Content-Type': 'application/json',
    // }
    axios.post('/api/register',data)
    .then((response)=>{
        console.log(response);
    }
    ).catch((error)=>{
        console.log('error',error);
        
    });
        
}