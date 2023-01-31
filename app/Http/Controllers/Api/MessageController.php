<?php

namespace App\Http\Controllers\Api;

use App\Events\Chat\SendMessage;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Symfony\Component\HttpFoundation\Response;

class MessageController extends Controller
{

    public function listMessages(User $user)
    {
        $userFrom = Auth::user()->id;
        $userTo = $user->id;

        /**
         * [from = userFrom && to = userTo]
         * OR
         * [from = userTo && to = userFrom]
         */
        $messages = Message::where(
            function($query) use($userFrom, $userTo) {
                $query->where([
                    'from' => $userFrom,
                    'to' => $userTo,
                ]);
            }
        )->orWhere(
            function($query) use($userFrom, $userTo) {
                $query->where([
                    'from' => $userTo,
                    'to' => $userFrom,
                ]);
            }
        )->latest()->simplePaginate(10);

        return response()->json($messages, Response::HTTP_OK);
    }

    public function index()
    {

        $userLogged = Auth::user();
        $messages = Message::where('from', $userLogged->id)->paginate(5);

        return response()->json($messages, Response::HTTP_OK);
    }

    public function store(Request $request) {
        $data = $request->all();

        try {
            $data['from'] = Auth::user()->id;
            $data['content'] = filter_var($data['content'], FILTER_UNSAFE_RAW);
            $message = Message::create($data);

            Event::dispatch(new SendMessage($message, $data['to']));

            return response()->json([
                "message" => $message
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), Response::HTTP_FORBIDDEN);
        }
    }
}
