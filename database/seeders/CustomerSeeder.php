<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('customer')->insert([
            ['firstname' => 'Anna', 'lastname' => 'Boyer'],
            ['firstname' => 'Annabelle', 'lastname' => 'Payet'],
            ['firstname' => 'Benoit', 'lastname' => 'Hoarau'],
            ['firstname' => 'Paul', 'lastname' => 'Barret'],
            ['firstname' => 'Pierre', 'lastname' => 'Etheve']
        ]);
    }
}
