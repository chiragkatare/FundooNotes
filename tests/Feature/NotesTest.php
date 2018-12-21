<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use App\User;

class NotesTest extends TestCase
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
     * A test to check if notes can be created for a user or not
     *
     * @return void
     */
    public function testNoteCreate()
    {
        $user = factory(User::class)->create();
        //authenticating as the user
        Passport::actingAs($user);

        $response = $this->withHeaders([
            'Content-Type' => 'Application/json',
        ])->json('POST', '/api/createnote', [
            
            'title'=>'bgsdshjsgdgskjdgkjsgdgsj',
            'body'=>'jeloofdfhdf dfkkdf'
        ]);

        $response->assertStatus(201)->assertJson(['message' => 'Note Created']);
    }

    /**
     * A test to check if notes can be created for a unathenticated user or not
     *
     * @return void
     */
    public function testNoteCreateUnauthenticated()
    {
       
        //no authenticateion request
        $response = $this->withHeaders([
            'Content-Type' => 'Application/json',
        ])->json('POST', '/api/createnote', [
            
            'title'=>'bgsdshjsgdgskjdgkjsgdgsj',
            'body'=>'jeloofdfhdf dfkkdf'
        ]);

        $response->assertStatus(401)->assertJson(['message' => 'Unauthenticated.']);
    }

    /**
     * A test to check for request to get the notes of all the user
     *
     * @return void
     */
    public function testNotesGetALLNotes()
    {
        $user = factory(User::class)->create();
        //authenticating as the user
        Passport::actingAs($user);
       
        //no authenticateion request
        $response = $this->withHeaders([
            'Content-Type' => 'Application/json',
        ])->json('GET', '/api/getnotes');
        $response->assertStatus(200)->assertSuccessful();
    }

}
