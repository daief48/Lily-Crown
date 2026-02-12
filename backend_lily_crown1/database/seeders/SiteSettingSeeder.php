<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SiteSetting;

class SiteSettingSeeder extends Seeder
{
    public function run()
    {
        $settings = [
            // Contact Information
            ['key' => 'site_name', 'value' => 'Lily Crown', 'type' => 'text'],
            ['key' => 'site_tagline', 'value' => 'Royal Elegance, Timeless Beauty', 'type' => 'text'],
            ['key' => 'contact_email', 'value' => 'info@lilycrown.com', 'type' => 'text'],
            ['key' => 'contact_phone', 'value' => '+880 1234-567890', 'type' => 'text'],
            ['key' => 'whatsapp_number', 'value' => '+880 1234-567890', 'type' => 'text'],
            ['key' => 'contact_address', 'value' => '123 Fashion Street, Dhaka 1000, Bangladesh', 'type' => 'text'],
            
            // Social Media
            ['key' => 'facebook_url', 'value' => 'https://facebook.com/lilycrown', 'type' => 'text'],
            ['key' => 'instagram_url', 'value' => 'https://instagram.com/lilycrown', 'type' => 'text'],
            ['key' => 'twitter_url', 'value' => 'https://twitter.com/lilycrown', 'type' => 'text'],
            ['key' => 'pinterest_url', 'value' => 'https://pinterest.com/lilycrown', 'type' => 'text'],
            
            // Business Hours
            ['key' => 'business_hours', 'value' => 'Saturday - Thursday: 10:00 AM - 8:00 PM', 'type' => 'text'],
            ['key' => 'weekend_hours', 'value' => 'Friday: Closed', 'type' => 'text'],
            
            // SEO
            ['key' => 'meta_description', 'value' => 'Lily Crown offers exquisite traditional and contemporary fashion. Discover handcrafted Jamdani sarees, bridal wear, and luxury accessories.', 'type' => 'text'],
            ['key' => 'meta_keywords', 'value' => 'Lily Crown, Jamdani, Saree, Bridal Wear, Traditional Fashion, Bangladesh Fashion, Luxury Clothing', 'type' => 'text'],
            
            // Shipping & Returns
            ['key' => 'free_shipping_threshold', 'value' => '500', 'type' => 'number'],
            ['key' => 'return_policy_days', 'value' => '30', 'type' => 'number'],
            ['key' => 'shipping_info', 'value' => 'We offer worldwide shipping. Orders are processed within 2-3 business days.', 'type' => 'text'],
            
            // About
            ['key' => 'about_us', 'value' => 'Lily Crown is a premium fashion brand dedicated to preserving and celebrating traditional Bangladeshi craftsmanship while embracing contemporary design. We work directly with skilled artisans to create exquisite garments that honor our heritage.', 'type' => 'textarea'],
            
            // Newsletter
            ['key' => 'newsletter_title', 'value' => 'Join Our Royal Circle', 'type' => 'text'],
            ['key' => 'newsletter_description', 'value' => 'Subscribe to receive exclusive offers, styling tips, and updates on new collections.', 'type' => 'text'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
