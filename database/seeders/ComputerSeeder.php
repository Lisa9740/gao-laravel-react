<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ComputerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('computer')->insert([
            ['name' => 'PC1'],
            ['name' => 'PC2'],
            ['name' => 'PC3'],
            ['name' => 'PC4'],
            ['name' => 'PC5'],
        ]);
    }
}
