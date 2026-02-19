<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'Dresses',
                'slug' => 'dresses',
                'icon' => 'fa-female',
                'image' => 'https://picsum.photos/seed/cat_dresses/400/400',
                'banner_image' => 'https://picsum.photos/seed/banner_dresses/1600/400',
            ],
            [
                'name' => 'Jewelry',
                'slug' => 'jewelry',
                'icon' => 'fa-gem',
                'image' => 'https://picsum.photos/seed/cat_jewelry/400/400',
                'banner_image' => 'https://picsum.photos/seed/banner_jewelry/1600/400',
            ],
            [
                'name' => 'Bags',
                'slug' => 'bags',
                'icon' => 'fa-shopping-bag',
                'image' => 'https://picsum.photos/seed/cat_bags/400/400',
                'banner_image' => 'https://picsum.photos/seed/banner_bags/1600/400',
            ],
            [
                'name' => 'Shoes',
                'slug' => 'shoes',
                'icon' => 'fa-shoe-prints',
                'image' => 'https://picsum.photos/seed/cat_shoes/400/400',
                'banner_image' => 'https://picsum.photos/seed/banner_shoes/1600/400',
            ],
            [
                'name' => 'Accessories',
                'slug' => 'accessories',
                'icon' => 'fa-crown',
                'image' => 'https://picsum.photos/seed/cat_acc/400/400',
                'banner_image' => 'https://picsum.photos/seed/banner_acc/1600/400',
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
