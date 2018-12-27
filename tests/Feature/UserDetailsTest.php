<?php

namespace Tests\Feature;

use Tests\TestCase;

use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use \App\User;

class UserDetailsTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }

    /**
     * A test to see the if user details can be asseced from the app of the authenticated user
     * 
     * @group userdetails
     */
    public function testUserDetailsGet()
    {
        $user  =User::where('email', 'chiragkatare123@gmail.com')->first();
        //to get user as authorized
        Passport::actingAs($user);

        $response = $this->get('/api/userdetails');
            $response->assertStatus(200);
    }


    /**
     * A test to see the if user details can be asseced from the app of the authenticated user
     * 
     * @group userdetails
     */
    public function testUserDetailsGetUnAuthenticated()
    {
        // $user  =User::where('email', 'chiragkatare123@gmail.com')->first();
        // //to get user as authorized
        // Passport::actingAs($user);

        $response = $this->get('/api/userdetails');
            $response->assertStatus(302);
    }

    
}
