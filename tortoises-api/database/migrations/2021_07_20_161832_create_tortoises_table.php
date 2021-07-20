<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTortoisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tortoises', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('weight');
            $table->integer('length');
            $table->string('result');
            $table->float('min');
            $table->float('avg');
            $table->float('max');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tortoises');
    }
}
