<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class Computer extends Model
{
    protected $table = 'computer';
    protected $fillable = [
        'name',
    ];

    public function attributions()
    {
        return $this->hasMany('App\Models\Attribution');
    }

    public $timestamps = false;
}
