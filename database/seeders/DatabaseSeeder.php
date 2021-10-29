<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        // if we want to truncate data
        DB::table('customer')->truncate();
        DB::table('computer')->truncate();
        DB::table('attribution')->truncate();

        \App\Models\User::factory(1)->create();
        \App\Models\Computer::factory(5)->create();
        \App\Models\Customer::factory(5)->create();

        $now = now()->toDateString();
        $faker = \Faker\Factory::create();
        for ($i=1; $i < 5; $i++) {
            DB::table('attribution')->insert([
                'hour' => 8,
                'computer_id' => $i,
                'customer_id' => $faker->numberBetween(1, 5),
                'date' => $now
            ]);
        }

        for ($i = 1; $i < 5; $i++) {
            DB::table('attribution')->insert([
                'hour' => 10,
                'computer_id' => $i,
                'customer_id' => $faker->numberBetween(1, 5),
                'date' => $now
            ]);
        }

        for ($i = 1; $i < 5; $i++) {
            DB::table('attribution')->insert([
                'hour' => 16,
                'computer_id' => $i,
                'customer_id' => $faker->numberBetween(1, 5),
                'date' => $now
            ]);
        }

      /*  $this->call([
           CustomerSeeder::class,
           ComputerSeeder::class,
           AttributionSeeder::class
        ]);*/
        // \App\Models\User::factory(10)->create();
    }
}
