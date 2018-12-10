<?php

/**
 * Notification fot sending the verifi=cation mail to the user 
 * queued mail so happens on different process 
 * run "php artisan queue:listen" to clear queue
 */

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class VerificationMail extends Notification implements ShouldQueue
{
    use Queueable;

    public $email;
    public $token;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $email, string $token)
    {
        $this->email = $email;
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
       // $url = "verifyemail/".$this->id;
        $url = "verifyemail/$this->token";
        return (new MailMessage)
            ->line('Welcome to Fundoo Notes')
            ->line('Please Verify your email to get started with us')
            ->action('Verify Email', url($url))
            ->line('Thank you for Registering!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
