<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run()
    {
        // Run seeders in order
        $this->call([
            AdminSeeder::class,
            CategorySeeder::class,
            SizeSeeder::class,
            ColorSeeder::class,
            ProductSeeder::class,
            BlogSeeder::class,
            SubscriberSeeder::class,
            HeroSlideSeeder::class,
            FeatureSeeder::class,
            TestimonialSeeder::class,
            LookbookSeeder::class,
            InstagramPostSeeder::class,
            ContactInquirySeeder::class,
            SiteSettingSeeder::class,
        ]);
    }
}
