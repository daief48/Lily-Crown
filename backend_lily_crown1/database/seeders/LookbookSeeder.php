<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lookbook;

class LookbookSeeder extends Seeder
{
    public function run()
    {
        $lookbooks = [
            ['image' => 'https://picsum.photos/seed/look1/800/1000', 'title' => 'Spring Collection 2026', 'category_name' => 'Seasonal', 'order' => 1],
            ['image' => 'https://picsum.photos/seed/look2/800/1000', 'title' => 'Bridal Elegance', 'category_name' => 'Bridal', 'order' => 2],
            ['image' => 'https://picsum.photos/seed/look3/800/1000', 'title' => 'Traditional Charm', 'category_name' => 'Traditional', 'order' => 3],
            ['image' => 'https://picsum.photos/seed/look4/800/1000', 'title' => 'Modern Fusion', 'category_name' => 'Contemporary', 'order' => 4],
            ['image' => 'https://picsum.photos/seed/look5/800/1000', 'title' => 'Evening Glamour', 'category_name' => 'Evening Wear', 'order' => 5],
            ['image' => 'https://picsum.photos/seed/look6/800/1000', 'title' => 'Festive Celebrations', 'category_name' => 'Festive', 'order' => 6],
            ['image' => 'https://picsum.photos/seed/look7/800/1000', 'title' => 'Royal Heritage', 'category_name' => 'Heritage', 'order' => 7],
            ['image' => 'https://picsum.photos/seed/look8/800/1000', 'title' => 'Casual Chic', 'category_name' => 'Casual', 'order' => 8],
            ['image' => 'https://picsum.photos/seed/look9/800/1000', 'title' => 'Summer Breeze', 'category_name' => 'Seasonal', 'order' => 9],
            ['image' => 'https://picsum.photos/seed/look10/800/1000', 'title' => 'Winter Warmth', 'category_name' => 'Seasonal', 'order' => 10],
            ['image' => 'https://picsum.photos/seed/look11/800/1000', 'title' => 'Artisan Crafts', 'category_name' => 'Handcrafted', 'order' => 11],
            ['image' => 'https://picsum.photos/seed/look12/800/1000', 'title' => 'Minimalist Beauty', 'category_name' => 'Contemporary', 'order' => 12],
            ['image' => 'https://picsum.photos/seed/look13/800/1000', 'title' => 'Vintage Vibes', 'category_name' => 'Vintage', 'order' => 13],
            ['image' => 'https://picsum.photos/seed/look14/800/1000', 'title' => 'Bold & Beautiful', 'category_name' => 'Statement', 'order' => 14],
            ['image' => 'https://picsum.photos/seed/look15/800/1000', 'title' => 'Pastel Dreams', 'category_name' => 'Seasonal', 'order' => 15],
            ['image' => 'https://picsum.photos/seed/look16/800/1000', 'title' => 'Golden Hour', 'category_name' => 'Evening Wear', 'order' => 16],
            ['image' => 'https://picsum.photos/seed/look17/800/1000', 'title' => 'Silk Stories', 'category_name' => 'Heritage', 'order' => 17],
            ['image' => 'https://picsum.photos/seed/look18/800/1000', 'title' => 'Embroidered Elegance', 'category_name' => 'Handcrafted', 'order' => 18],
        ];

        foreach ($lookbooks as $lookbook) {
            Lookbook::create($lookbook);
        }
    }
}
