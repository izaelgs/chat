<?php

namespace App\Events\Chat;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $targetUser;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Message $message, int $targetUser)
    {
        $this->message = $message;
        $this->targetUser = $targetUser;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('user.' . $this->targetUser);
    }

    public function broadcastAs() {
        return 'SendMessage';
    }

    public function broadcastWith() {
        return [
            'message' => $this->message,
        ];
    }
}
