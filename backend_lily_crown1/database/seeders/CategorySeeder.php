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
            ],
            [
                'name' => 'Jewelry',
                'slug' => 'jewelry',
                'icon' => 'fa-gem',
            ],
            [
                'name' => 'Bags',
                'slug' => 'bags',
                'icon' => 'fa-shopping-bag',
            ],
            [
                'name' => 'Shoes',
                'slug' => 'shoes',
                'icon' => 'fa-shoe-prints',
            ],
            [
                'name' => 'Accessories',
                'slug' => 'accessories',
                'icon' => 'fa-crown',
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
