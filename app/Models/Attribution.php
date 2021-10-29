<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribution extends Model
{
    protected $table = 'attribution';

    protected $fillable = [
        'date','hour', 'computer_id', 'customer_id'
    ];

    public function computer()
    {
        return $this->belongsTo('App\Models\Computer', 'computer_id', 'id');
    }
    public function customer()
    {
        return $this->belongsTo('App\Models\Customer', 'customer_id', 'id');
    }

    public $timestamps = false;
}
