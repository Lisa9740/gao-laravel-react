<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\App;

class Computer extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'computer';
    protected $fillable = [
        'name',
    ];

    public function attributions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Models\Attribution');
    }

    public $timestamps = false;
}
