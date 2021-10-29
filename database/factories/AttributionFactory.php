<?php

namespace Database\Factories;

use App\Models\Attribution;
use Illuminate\Database\Eloquent\Factories\Factory;

class AttributionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Attribution::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'hour' => "{$this->faker->numberBetween(8,16)}",
            'computer_id' => $this->faker->numberBetween(1,5),
            'customer_id' => $this->faker->numberBetween(1, 5),
        ];
    }
}
