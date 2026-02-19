<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HeroSlide;

class HeroSlideSeeder extends Seeder
{
    public function run()
    {
        $slides = [
            [
                'image' => 'https://picsum.photos/seed/hero1/1920/1080',
                'title' => 'Royal Collection 2026',
                'subtitle' => 'Discover timeless elegance',
                'button_text' => 'Shop Now',
                'button_link' => '/products',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'image' => 'https://picsum.photos/seed/hero2/1920/1080',
                'title' => 'Handcrafted Jamdani',
                'subtitle' => 'Heritage meets luxury',
                'button_text' => 'Explore Collection',
                'button_link' => '/products?category=dresses',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'image' => 'https://picsum.photos/seed/hero3/1920/1080',
                'title' => 'Bridal Couture',
                'subtitle' => 'Your dream wedding awaits',
                'button_text' => 'View Bridal',
                'button_link' => '/lookbook',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'image' => 'https://picsum.photos/seed/hero4/1920/1080',
                'title' => 'Exquisite Jewelry',
                'subtitle' => 'Adorn yourself with elegance',
                'button_text' => 'Shop Jewelry',
                'button_link' => '/products?category=jewelry',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'image' => 'https://picsum.photos/seed/hero5/1920/1080',
                'title' => 'New Arrivals',
                'subtitle' => 'Fresh styles for the season',
                'button_text' => 'Discover Now',
                'button_link' => '/products',
                'order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($slides as $slide) {
            HeroSlide::create($slide);
        }
    }
}
