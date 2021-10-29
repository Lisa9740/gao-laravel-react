<?php

namespace App\Http\Controllers;

use App\Http\Resources\AttributionResource;
use App\Http\Resources\ComputerResource;
use App\Http\Resources\CustomerResource;
use App\Models\Attribution;
use App\Models\Computer;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CustomerController extends Controller
{
    public function index()
    {
        return CustomerResource::collection(Customer::all());
    }

    public function create(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'firstname'       => 'required',
                'lastname'    => 'required',
                'computerId' => 'required',
                'hour'      => 'required',
                'date'       => 'required',
            ],
            [
                'required' => 'Le champ :attribute est requis',
            ]
        );

        $errors = $validator->errors();

        if (count($errors) != 0) {
            return response()->json([
                'success' => false,
                'message' => $errors->first()
            ]);
        }



        $customerCreated = Customer::create([
            'firstname'    => $request->firstname,
            'lastname' => $request->lastname
        ]);

        $createdAssign = Attribution::create([
            'hour'      => $request->hour,
            'computer_id' => $request->computerId,
            'customer_id'  => $customerCreated->id,
            'date'       => date('Y-m-d',strtotime($request->date)),
        ]);

        return response()->json([
            'success' => true,
            'data' => new AttributionResource($createdAssign)
        ]);

    }


    public function search(Request $request)
    {
        $clientSearch = $request->query('customer');
        $listClient   = Customer::where('firstname', 'like', '%' . $clientSearch . '%')->orWhere('lastname', 'like', '%' . $clientSearch . '%')->get();
        return CustomerResource::collection($listClient);
    }

}
