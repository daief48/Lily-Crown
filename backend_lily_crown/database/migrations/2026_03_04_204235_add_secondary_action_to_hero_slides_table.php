<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('hero_slides', function (Blueprint $table) {
            $table->string('secondary_button_text')->nullable()->after('button_link');
            $table->string('secondary_button_link')->nullable()->after('secondary_button_text');
            $table->unsignedBigInteger('blog_id')->nullable()->after('product_id');
            
            $table->foreign('blog_id')->references('id')->on('blogs')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hero_slides', function (Blueprint $table) {
            $table->dropForeign(['blog_id']);
            $table->dropColumn(['secondary_button_text', 'secondary_button_link', 'blog_id']);
        });
    }
};
