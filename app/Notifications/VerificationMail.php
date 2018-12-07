<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class VerificationMail extends Notification implements ShouldQueue
{
    use Queueable;

    public $email;
    public $id;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $email, string $id)
    {
        $this->email = $email;
        $this->id = $id;
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
        $url = "verifyemail/$this->email";
        return (new MailMessage)
            ->line('Welcome to Fundoo Notes')
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
