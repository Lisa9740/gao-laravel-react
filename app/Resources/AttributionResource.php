<?php

namespace App\Http\Resources;

use App\Models\Computer;
use App\Models\Customer;
use Illuminate\Http\Resources\Json\JsonResource;

class AttributionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'hour' => $this->hour,
            'date' => $this->date,
            'customer_id' => $this->customer,
            'computer_id' => $this->computer,
        ];
    }
}
