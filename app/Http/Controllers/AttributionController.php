<?php

namespace App\Http\Controllers;


use App\Http\Resources\AttributionResource;
use App\Http\Resources\ComputerResource;
use App\Models\Attribution;
use Illuminate\Http\Request;


class AttributionController extends Controller
{
    public function index()
    {
        return AttributionResource::collection(Attribution::all());
    }

    public function add(Request $request)
    {
        $validatedData = $this->validate($request, [
            'hour' => 'required|string',
            'date' => 'required|date',
            'customer_id' => 'required|exists:customer,id',
            'computer_id' => 'required|exists:computer,id',
        ]);

        $addAttribution = new Attribution();

        $addAttribution->hour = $validatedData['hour'];
        $addAttribution->date = $validatedData['date'];
        $addAttribution->customer_id = $validatedData['customer_id'];
        $addAttribution->computer_id = $validatedData['computer_id'];
        $addAttribution->save();

         new AttributionResource($addAttribution);
        return $this->index();

    }
}
