<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttributionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('attribution')->insert([
            ['date'=> new \DateTime(),'hour'=> 9,'computer_id'=> 3, 'customer_id' => 1 ],
            ['date'=>  '2020-10-29','hour'=> 9,'computer_id'=> 3, 'customer_id' => 1 ],
            ['date'=>  '2020-10-28','hour'=> 15,'computer_id'=> 1, 'customer_id' => 1 ],
        ]);
    }
}
