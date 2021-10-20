<?php

namespace App\Http\Controllers;

use App\Http\Resources\ComputerResource;
use App\Models\Computer;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ComputerController extends Controller
{
    public function index()
    {
        return ComputerResource::collection(Computer::all());
    }

    public function add(Request $request)
    {
            $validatedData = $this->validate($request, [
                'name' => 'required|string',
            ]);

            $addComputer = new Computer();

            $addComputer->name = $validatedData['name'];
            $addComputer->save();

            new ComputerResource($addComputer);
            return $this->index();

    }
}
