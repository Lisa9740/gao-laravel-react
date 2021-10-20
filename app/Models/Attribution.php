<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribution extends Model
{
    protected $table = 'attribution';

    protected $fillable = [
        'date','hour'
    ];

    public function computer()
    {
        return $this->belongsTo('App\Models\Computer');
    }
    public function customer()
    {
        return $this->belongsTo('App\Models\Customer');
    }





    public $timestamps = false;
}
