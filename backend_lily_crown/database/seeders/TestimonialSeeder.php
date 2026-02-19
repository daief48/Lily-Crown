<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    public function run()
    {
        $testimonials = [
            [
                'quote' => 'The quality of the Jamdani saree I purchased is absolutely exceptional. The craftsmanship is evident in every thread. Lily Crown has become my go-to for traditional wear.',
                'author' => 'Ayesha Rahman',
                'role' => 'Fashion Designer',
                'image' => 'https://i.pravatar.cc/300?img=1',
            ],
            [
                'quote' => 'I wore a Lily Crown bridal lehenga for my wedding, and I felt like royalty. The attention to detail and the luxurious fabric made my special day even more memorable.',
                'author' => 'Fatima Khan',
                'role' => 'Bride',
                'image' => 'https://i.pravatar.cc/300?img=5',
            ],
            [
                'quote' => 'As someone who values sustainable fashion, I appreciate Lily Crown\'s commitment to supporting local artisans and using eco-friendly practices. Beautiful clothes with a conscience!',
                'author' => 'Nadia Islam',
                'role' => 'Environmental Activist',
                'image' => 'https://i.pravatar.cc/300?img=9',
            ],
            [
                'quote' => 'The jewelry collection is stunning! Each piece is unique and beautifully crafted. I receive compliments every time I wear my Lily Crown necklace.',
                'author' => 'Zara Hassan',
                'role' => 'Entrepreneur',
                'image' => 'https://i.pravatar.cc/300?img=10',
            ],
            [
                'quote' => 'Customer service is outstanding. They helped me choose the perfect outfit for my sister\'s wedding, and the entire shopping experience was delightful.',
                'author' => 'Maria Chowdhury',
                'role' => 'Teacher',
                'image' => 'https://i.pravatar.cc/300?img=20',
            ],
            [
                'quote' => 'The muslin sarees are incredibly soft and elegant. You can feel the heritage and tradition in every piece. Lily Crown is preserving our cultural legacy beautifully.',
                'author' => 'Sadia Malik',
                'role' => 'Cultural Historian',
                'image' => 'https://i.pravatar.cc/300?img=23',
            ],
            [
                'quote' => 'I love how Lily Crown combines traditional designs with modern aesthetics. Their collection is perfect for women who want to honor their roots while staying contemporary.',
                'author' => 'Hina Sultana',
                'role' => 'Blogger',
                'image' => 'https://i.pravatar.cc/300?img=26',
            ],
            [
                'quote' => 'The bags and accessories are of premium quality. My leather handbag has lasted for years and still looks brand new. Worth every penny!',
                'author' => 'Amina Begum',
                'role' => 'Lawyer',
                'image' => 'https://i.pravatar.cc/300?img=27',
            ],
            [
                'quote' => 'Shopping at Lily Crown is always a pleasure. The website is easy to navigate, and the products always exceed my expectations. Highly recommended!',
                'author' => 'Laila Ahmed',
                'role' => 'Marketing Manager',
                'image' => 'https://i.pravatar.cc/300?img=29',
            ],
            [
                'quote' => 'The embroidery work on my evening gown was absolutely breathtaking. I felt like a princess at the gala. Thank you, Lily Crown, for making me feel special!',
                'author' => 'Rania Khan',
                'role' => 'Architect',
                'image' => 'https://i.pravatar.cc/300?img=31',
            ],
            [
                'quote' => 'I appreciate the detailed product descriptions and high-quality images on the website. It made online shopping so much easier and more confident.',
                'author' => 'Samira Hossain',
                'role' => 'Doctor',
                'image' => 'https://i.pravatar.cc/300?img=32',
            ],
            [
                'quote' => 'Lily Crown\'s collection is a perfect blend of elegance and comfort. I can wear their outfits all day without any discomfort. Truly exceptional!',
                'author' => 'Yasmin Ali',
                'role' => 'Banker',
                'image' => 'https://i.pravatar.cc/300?img=35',
            ],
            [
                'quote' => 'The gift wrapping service is wonderful! I ordered a saree for my mother, and it arrived beautifully packaged. She was thrilled with both the presentation and the product.',
                'author' => 'Zainab Siddiqui',
                'role' => 'Student',
                'image' => 'https://i.pravatar.cc/300?img=38',
            ],
            [
                'quote' => 'Fast shipping and excellent packaging. My order arrived in perfect condition, and the quality of the products is consistently high. Lily Crown never disappoints!',
                'author' => 'Farah Iqbal',
                'role' => 'Journalist',
                'image' => 'https://i.pravatar.cc/300?img=41',
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
