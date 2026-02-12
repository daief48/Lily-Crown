<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InstagramPost;

class InstagramPostSeeder extends Seeder
{
    public function run()
    {
        $posts = [
            ['image' => 'https://picsum.photos/seed/insta1/800/800', 'link' => 'https://instagram.com/p/1', 'caption' => 'New arrival: Royal Silk Evening Gown ✨ #LilyCrown #Luxury'],
            ['image' => 'https://picsum.photos/seed/insta2/800/800', 'link' => 'https://instagram.com/p/2', 'caption' => 'Behind the scenes: Crafting a Jamdani masterpiece 🧵 #Handmade'],
            ['image' => 'https://picsum.photos/seed/insta3/800/800', 'link' => 'https://instagram.com/p/3', 'caption' => 'Bridal collection 2026 👰 #WeddingGoals #BridalFashion'],
            ['image' => 'https://picsum.photos/seed/insta4/800/800', 'link' => 'https://instagram.com/p/4', 'caption' => 'Sustainable fashion, timeless style 🌿 #EcoFriendly'],
            ['image' => 'https://picsum.photos/seed/insta5/800/800', 'link' => 'https://instagram.com/p/5', 'caption' => 'Jewelry that tells a story 💎 #Elegance #Jewelry'],
            ['image' => 'https://picsum.photos/seed/insta6/800/800', 'link' => 'https://instagram.com/p/6', 'caption' => 'Traditional meets modern ✨ #FusionFashion #Style'],
            ['image' => 'https://picsum.photos/seed/insta7/800/800', 'link' => 'https://instagram.com/p/7', 'caption' => 'Customer love 💕 Thank you for sharing! #CustomerLove'],
            ['image' => 'https://picsum.photos/seed/insta8/800/800', 'link' => 'https://instagram.com/p/8', 'caption' => 'Spring collection preview 🌸 #NewArrivals #SpringFashion'],
            ['image' => 'https://picsum.photos/seed/insta9/800/800', 'link' => 'https://instagram.com/p/9', 'caption' => 'Artisan spotlight: Meet our master weavers 👏 #Artisans'],
            ['image' => 'https://picsum.photos/seed/insta10/800/800', 'link' => 'https://instagram.com/p/10', 'caption' => 'Evening glamour at its finest ✨ #EveningWear #Glamour'],
            ['image' => 'https://picsum.photos/seed/insta11/800/800', 'link' => 'https://instagram.com/p/11', 'caption' => 'Heritage in every thread 🧵 #Heritage #Tradition'],
            ['image' => 'https://picsum.photos/seed/insta12/800/800', 'link' => 'https://instagram.com/p/12', 'caption' => 'Festive season ready! 🎉 #FestiveFashion #Celebrations'],
            ['image' => 'https://picsum.photos/seed/insta13/800/800', 'link' => 'https://instagram.com/p/13', 'caption' => 'Minimalist elegance 🤍 #MinimalistStyle #Contemporary'],
            ['image' => 'https://picsum.photos/seed/insta14/800/800', 'link' => 'https://instagram.com/p/14', 'caption' => 'Bold colors, bolder statements 💃 #BoldFashion #Style'],
            ['image' => 'https://picsum.photos/seed/insta15/800/800', 'link' => 'https://instagram.com/p/15', 'caption' => 'Luxury accessories collection 👜 #Accessories #Luxury'],
            ['image' => 'https://picsum.photos/seed/insta16/800/800', 'link' => 'https://instagram.com/p/16', 'caption' => 'Silk stories: The making of muslin 📖 #Muslin #Craftsmanship'],
        ];

        foreach ($posts as $post) {
            InstagramPost::create($post);
        }
    }
}
