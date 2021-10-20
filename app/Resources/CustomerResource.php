<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
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
            'name'=> $this->firstname . ' ' . $this->lastname,
            'firstname' => $this->firstname,
            'lastname'=> $this->lastname,
            'attribution' => $this->attribution
        ];
    }
}
