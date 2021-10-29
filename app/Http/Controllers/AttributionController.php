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

    public function create(Request $request)
    {
        $validatedData = $this->validate($request, [
            'hours' => 'required|integer',
            'date' => 'required|date',
            'customerId' => 'required|exists:customer,id',
            'computerId' => 'required|exists:computer,id',
        ]);

        $date  = strtotime($validatedData['date']) ;

        $addAttribution = new Attribution();

        $addAttribution->hour = $validatedData['hours'];
        $addAttribution->date = date('Y-m-d', $date);
        $addAttribution->customer_id = $validatedData['customerId'];
        $addAttribution->computer_id = $validatedData['computerId'];
        $addAttribution->save();

        return new AttributionResource($addAttribution);
    }

    public function deleteAttribution($id): \Illuminate\Http\JsonResponse
    {
        Attribution::destroy($id);
        return response()->json([
            'success' => true,
            'message' => "Suppression réussie"
        ]);
    }

}
