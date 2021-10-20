<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttributionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attribution', function (Blueprint $table) {
            $table->id();
            $table->integer('hour');
            $table->bigInteger('computer_id')->unsigned();
            $table->bigInteger('customer_id')->unsigned();
            $table->foreign('computer_id')
                ->references('id')
                ->on('computer');
            $table->foreign('customer_id')
                ->references('id')
                ->on('customer');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::dropIfExists('attribution');
    }
}
