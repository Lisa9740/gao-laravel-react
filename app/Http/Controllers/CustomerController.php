<?php

namespace App\Http\Controllers;

use App\Http\Resources\AttributionResource;
use App\Http\Resources\ComputerResource;
use App\Http\Resources\CustomerResource;
use App\Models\Attribution;
use App\Models\Computer;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CustomerController extends Controller
{
    public function index()
    {
        return CustomerResource::collection(Customer::all());
    }

}
