<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\PasswordReset;

class PasswordResetTest extends TestCase
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
     * A test to see if user can request the forgot password
     *
     * @group forgotpassword
     * @return void
     */
    public function testForgotPasswordCreateSuccess()
    {
        $user = factory(User::class)->create();

        $response = $this->withHeaders([
            'Content-Type' => 'Application/json',
        ])->json('POST', '/api/forgotpassword', [
            "email" => $user->email
        ]);

        $response->assertStatus(201)
            ->assertJsonCount(1)
            ->assertExactJson(['message' => 'We have emailed your password reset link!']);
    }

    /**
     * A test to see if User cannot request the forgot password using wrong email
     *
     * @group forgotpassword
     * @return void
     */
    public function testForgotPasswordCreateFailure()
    {
        $user = factory(User::class)->create();

        $response = $this->withHeaders([
            'Content-Type' => 'Application/json',
        ])->json('POST', '/api/forgotpassword', [
            //wrong email
            "email" => 'asasasas@asas.com'
        ]);

        $response->assertStatus(200)
            ->assertJsonCount(1)
            ->assertExactJson(['message' => "We can't find a user with that email address."]);
    }

    /**
     * A test to see if User can access the forget password using link
     *
     * @group forgotpassword
     * @return void
     */
    public function testForgotPasswordFind()
    {
        $user = factory(User::class)->create();
        $passwordReset = PasswordReset::updateOrCreate(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'token' => str_random(60)
            ]
        );
        $response = $this->withHeaders([
            'Content-Type' => 'Application/json',
        ])->json('POST', '/api/forgotpassword/find', [
            //wrong email
            "token" => $passwordReset->token
        ]);

        $response->assertStatus(201)
            ->assertJsonCount(1);
    }

    /**
     * A test to see if User can reset the password
     *
     * @group forgotpassword
     * @return void
     */
    public function testForgotPasswordReset()
    {
        $user = factory(User::class)->create();
        $passwordReset = PasswordReset::updateOrCreate(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'token' => str_random(60)
            ]
        );
        $response = $this->withHeaders([
            'Content-Type' => 'Application/json',
        ])->json('POST', '/api/forgotpassword/reset', [
            //wrong email
            'token' => $passwordReset->token,
            "password" => '123456789',
            'rpassword' => '123456789'
        ]);

        $response->assertStatus(201)
            ->assertJsonCount(1);
    }


    /**
     * A test to see if User can access the forget password using link
     *
     * @group forgotpassword
     * @return void
     */
    public function testForgotPasswordValidation()
    {
        $user = factory(User::class)->create();
        $passwordReset = PasswordReset::updateOrCreate(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'token' => str_random(60)
            ]
        );
        $response = $this->withHeaders([
            'Content-Type' => 'Application/json',
        ])->json('POST', '/api/forgotpassword/reset', [
            'token' => $passwordReset->token,
            "password" => '12345a6789',
            'rpassword' => '123456789sas'
        ]);
        $response->assertStatus(201)
            ->assertJsonCount(1);
    }
}
