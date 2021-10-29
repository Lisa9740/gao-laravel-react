<?php

namespace App\Http\Controllers;


use App\Http\Resources\ComputerResource;
use App\Models\Computer;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ComputerController extends BaseController
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
            return $this->sendResponse(['success' => true, 'content' => new ComputerResource($addComputer)]);
    }

    public function findAll(Request $request)
    {
        $currentDate = $request->query('date');

        $computers = Computer::with(array('attributions' => function ($query) use ($currentDate) {
            $query->where('date', $currentDate);
        }))->paginate(6);

        return ComputerResource::collection($computers);
    }
}
