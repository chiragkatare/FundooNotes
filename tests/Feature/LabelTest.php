<?php

namespace Tests\Feature;

use Tests\TestCase;
// use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;

class LabelTest extends TestCase
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

    public function testLabelCreate()
    {
        $user = factory(User::class)->create();
        //authenticating as the user
        Passport::actingAs($user);

        $response = $this->withHeaders([
            'Content-Type' => 'Application/json',
        ])->json('POST', '/api/makelabel', [
            
            'label'=>'bgsdshjsgdgskjdgkjsgdgsj',
        ]);

        $response->assertStatus(201)->assertJson(['message' => 'Note Created']);
    }
}
