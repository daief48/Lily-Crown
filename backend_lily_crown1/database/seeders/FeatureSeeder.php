<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Feature;

class FeatureSeeder extends Seeder
{
    public function run()
    {
        $features = [
            [
                'icon' => 'fa-shipping-fast',
                'title' => 'Free Shipping',
                'description' => 'On orders over $500',
            ],
            [
                'icon' => 'fa-undo',
                'title' => 'Easy Returns',
                'description' => '30-day return policy',
            ],
            [
                'icon' => 'fa-shield-alt',
                'title' => 'Secure Payment',
                'description' => '100% secure transactions',
            ],
            [
                'icon' => 'fa-headset',
                'title' => '24/7 Support',
                'description' => 'Dedicated customer service',
            ],
            [
                'icon' => 'fa-certificate',
                'title' => 'Authentic Products',
                'description' => 'Guaranteed genuine items',
            ],
            [
                'icon' => 'fa-gift',
                'title' => 'Gift Wrapping',
                'description' => 'Complimentary luxury packaging',
            ],
            [
                'icon' => 'fa-leaf',
                'title' => 'Sustainable',
                'description' => 'Eco-friendly practices',
            ],
            [
                'icon' => 'fa-hands-helping',
                'title' => 'Artisan Support',
                'description' => 'Supporting local craftspeople',
            ],
        ];

        foreach ($features as $feature) {
            Feature::create($feature);
        }
    }
}
