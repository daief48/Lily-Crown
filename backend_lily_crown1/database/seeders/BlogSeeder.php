<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;

class BlogSeeder extends Seeder
{
    public function run()
    {
        $blogs = [
            [
                'title' => 'The Art of Traditional Bangladeshi Fashion',
                'slug' => 'art-of-traditional-bangladeshi-fashion',
                'content' => 'Discover the rich heritage of Bangladeshi fashion, from the intricate Jamdani weaves to the elegant muslin fabrics that have captivated the world for centuries. Our collection celebrates this timeless tradition.',
                'thumbnail' => 'https://picsum.photos/seed/blog1/1200/800',
                'category_name' => 'Fashion',
            ],
            [
                'title' => 'How to Style Your Bridal Lehenga',
                'slug' => 'how-to-style-bridal-lehenga',
                'content' => 'Expert tips on accessorizing and styling your bridal lehenga for the perfect wedding day look. From jewelry selection to makeup coordination, we cover everything you need to know.',
                'thumbnail' => 'https://picsum.photos/seed/blog2/1200/800',
                'category_name' => 'Bridal',
            ],
            [
                'title' => 'Sustainable Fashion: Our Commitment',
                'slug' => 'sustainable-fashion-commitment',
                'content' => 'Learn about Lily Crown\'s dedication to sustainable and ethical fashion practices. We believe in creating beautiful garments while respecting our environment and artisans.',
                'thumbnail' => 'https://picsum.photos/seed/blog3/1200/800',
                'category_name' => 'Sustainability',
            ],
            [
                'title' => 'Jewelry Trends for 2026',
                'slug' => 'jewelry-trends-2026',
                'content' => 'Explore the latest jewelry trends that are defining 2026. From statement pieces to delicate minimalism, discover what\'s making waves in the fashion world.',
                'thumbnail' => 'https://picsum.photos/seed/blog4/1200/800',
                'category_name' => 'Jewelry',
            ],
            [
                'title' => 'The Perfect Saree for Every Occasion',
                'slug' => 'perfect-saree-every-occasion',
                'content' => 'A comprehensive guide to choosing the right saree for weddings, festivals, formal events, and casual gatherings. Learn about fabrics, colors, and styling tips.',
                'thumbnail' => 'https://picsum.photos/seed/blog5/1200/800',
                'category_name' => 'Fashion',
            ],
            [
                'title' => 'Behind the Scenes: Crafting a Jamdani',
                'slug' => 'behind-scenes-crafting-jamdani',
                'content' => 'Take an exclusive look at the meticulous process of creating a traditional Jamdani saree. Meet the artisans who keep this ancient craft alive.',
                'thumbnail' => 'https://picsum.photos/seed/blog6/1200/800',
                'category_name' => 'Craftsmanship',
            ],
            [
                'title' => 'Accessorizing 101: Complete Your Look',
                'slug' => 'accessorizing-101-complete-look',
                'content' => 'Master the art of accessorizing with our expert guide. Learn how to pair jewelry, bags, and shoes to create stunning, cohesive outfits.',
                'thumbnail' => 'https://picsum.photos/seed/blog7/1200/800',
                'category_name' => 'Style Tips',
            ],
            [
                'title' => 'Caring for Your Silk Garments',
                'slug' => 'caring-for-silk-garments',
                'content' => 'Essential tips for maintaining the beauty and longevity of your precious silk garments. Learn proper washing, storing, and handling techniques.',
                'thumbnail' => 'https://picsum.photos/seed/blog8/1200/800',
                'category_name' => 'Care Guide',
            ],
            [
                'title' => 'The Royal Heritage of Muslin',
                'slug' => 'royal-heritage-muslin',
                'content' => 'Delve into the fascinating history of Dhaka muslin, once known as "woven air" and prized by royalty worldwide. Discover how we\'re reviving this legendary fabric.',
                'thumbnail' => 'https://picsum.photos/seed/blog9/1200/800',
                'category_name' => 'Heritage',
            ],
            [
                'title' => 'Wedding Season Style Guide 2026',
                'slug' => 'wedding-season-style-guide-2026',
                'content' => 'Your ultimate guide to wedding season fashion. From guest attire to bridal ensembles, find inspiration for every celebration.',
                'thumbnail' => 'https://picsum.photos/seed/blog10/1200/800',
                'category_name' => 'Bridal',
            ],
            [
                'title' => 'Color Psychology in Fashion',
                'slug' => 'color-psychology-fashion',
                'content' => 'Understand how colors influence perception and mood. Learn to choose colors that complement your personality and the occasion.',
                'thumbnail' => 'https://picsum.photos/seed/blog11/1200/800',
                'category_name' => 'Style Tips',
            ],
            [
                'title' => 'Handloom vs Power Loom: Know the Difference',
                'slug' => 'handloom-vs-power-loom',
                'content' => 'Discover the distinctive qualities of handloom fabrics and why they\'re worth the investment. Support traditional craftsmanship with informed choices.',
                'thumbnail' => 'https://picsum.photos/seed/blog12/1200/800',
                'category_name' => 'Craftsmanship',
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::updateOrCreate(
                ['slug' => $blog['slug']],
                $blog
            );
        }
    }
}
