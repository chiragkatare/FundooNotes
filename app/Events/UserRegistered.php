<?php

/**
 * event for user Registration
 * executed automatically by registration api at successfull registration 
 * 
 * listener = app/listener/SendVerificationMail
 */


namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UserRegistered
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $token;
    public $user;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user,$token)
    {
        $this->token = $token;
        $this->user = $user;
    }

    /**        
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
