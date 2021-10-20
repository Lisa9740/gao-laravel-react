<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customer';

    protected $fillable = [
        'firstname',
        'lastname'
    ];

    public function attribution()
    {
        return $this->hasMany("App\Models\Attribution");
    }

    public $timestamps = false;
}
