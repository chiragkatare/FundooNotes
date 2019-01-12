<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNoteImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('note_images', function (Blueprint $table) {
            $table->increments('id');
            // $table->binary('pic');
            $table->unsignedInteger('noteid'); 
            $table->foreign('noteid')->references('id')->on('notes')->onDelete('cascade');
            $table->timestamps();
        });

        DB::statement("ALTER TABLE note_images ADD column pic MEDIUMBLOB");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('note_images');
    }
}
