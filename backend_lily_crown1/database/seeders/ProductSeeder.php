<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            // Dresses
            ['name' => 'Royal Silk Evening Gown', 'is_trending' => true, 'slug' => 'royal-silk-evening-gown', 'category_id' => 1, 'price' => 850.00, 'description' => 'Luxurious silk evening gown with intricate embroidery', 'image' => 'https://picsum.photos/seed/dress1/800/1000', 'gallery' => ['https://picsum.photos/seed/dress1a/800/1000', 'https://picsum.photos/seed/dress1b/800/1000']],
            ['name' => 'Monarch Dhaka Jamdani', 'is_trending' => true, 'slug' => 'monarch-dhaka-jamdani', 'category_id' => 1, 'price' => 1200.00, 'description' => 'Traditional Jamdani saree with golden thread work', 'image' => 'https://picsum.photos/seed/dress2/800/1000', 'gallery' => ['https://picsum.photos/seed/dress2a/800/1000']],
            ['name' => 'Tigall Saree I7', 'slug' => 'tigall-saree-i7', 'category_id' => 1, 'price' => 2100.00, 'description' => 'Premium designer saree with modern patterns', 'image' => 'https://picsum.photos/seed/dress3/800/1000', 'gallery' => ['https://picsum.photos/seed/dress3a/800/1000']],
            ['name' => 'Emerald Velvet Lehenga', 'is_trending' => true, 'slug' => 'emerald-velvet-lehenga', 'category_id' => 1, 'price' => 1500.00, 'description' => 'Stunning velvet lehenga with crystal embellishments', 'image' => 'https://picsum.photos/seed/dress4/800/1000', 'gallery' => ['https://picsum.photos/seed/dress4a/800/1000']],
            ['name' => 'Heritage Muslin Saree', 'is_trending' => true, 'slug' => 'heritage-muslin-saree', 'category_id' => 1, 'price' => 950.00, 'description' => 'Authentic muslin saree with traditional motifs', 'image' => 'https://picsum.photos/seed/dress5/800/1000', 'gallery' => ['https://picsum.photos/seed/dress5a/800/1000']],
            ['name' => 'Crimson Bridal Gown', 'slug' => 'crimson-bridal-gown', 'category_id' => 1, 'price' => 3200.00, 'description' => 'Exquisite bridal gown with hand-sewn pearls', 'image' => 'https://picsum.photos/seed/dress6/800/1000', 'gallery' => ['https://picsum.photos/seed/dress6a/800/1000']],
            
            // Jewelry
            ['name' => 'Diamond Necklace Set', 'is_trending' => true, 'slug' => 'diamond-necklace-set', 'category_id' => 2, 'price' => 2500.00, 'description' => 'Elegant diamond necklace with matching earrings', 'image' => 'https://picsum.photos/seed/jewelry1/800/800', 'gallery' => ['https://picsum.photos/seed/jewelry1a/800/800']],
            ['name' => 'Gold Bangles Collection', 'is_trending' => true, 'slug' => 'gold-bangles-collection', 'category_id' => 2, 'price' => 1800.00, 'description' => 'Set of 6 traditional gold bangles', 'image' => 'https://picsum.photos/seed/jewelry2/800/800', 'gallery' => ['https://picsum.photos/seed/jewelry2a/800/800']],
            ['name' => 'Pearl Drop Earrings', 'slug' => 'pearl-drop-earrings', 'category_id' => 2, 'price' => 450.00, 'description' => 'Classic pearl earrings with gold accents', 'image' => 'https://picsum.photos/seed/jewelry3/800/800', 'gallery' => ['https://picsum.photos/seed/jewelry3a/800/800']],
            ['name' => 'Ruby Statement Ring', 'slug' => 'ruby-statement-ring', 'category_id' => 2, 'price' => 1200.00, 'description' => 'Bold ruby ring with diamond halo', 'image' => 'https://picsum.photos/seed/jewelry4/800/800', 'gallery' => ['https://picsum.photos/seed/jewelry4a/800/800']],
            ['name' => 'Emerald Choker Necklace', 'slug' => 'emerald-choker-necklace', 'category_id' => 2, 'price' => 2200.00, 'description' => 'Stunning emerald choker with intricate design', 'image' => 'https://picsum.photos/seed/jewelry5/800/800', 'gallery' => ['https://picsum.photos/seed/jewelry5a/800/800']],
            
            // Bags
            ['name' => 'Luxury Leather Handbag', 'is_trending' => true, 'slug' => 'luxury-leather-handbag', 'category_id' => 3, 'price' => 650.00, 'description' => 'Premium leather handbag with gold hardware', 'image' => 'https://picsum.photos/seed/bag1/800/800', 'gallery' => ['https://picsum.photos/seed/bag1a/800/800']],
            ['name' => 'Silk Evening Clutch', 'slug' => 'silk-evening-clutch', 'category_id' => 3, 'price' => 280.00, 'description' => 'Elegant silk clutch with crystal clasp', 'image' => 'https://picsum.photos/seed/bag2/800/800', 'gallery' => ['https://picsum.photos/seed/bag2a/800/800']],
            ['name' => 'Designer Tote Bag', 'slug' => 'designer-tote-bag', 'category_id' => 3, 'price' => 520.00, 'description' => 'Spacious designer tote with multiple compartments', 'image' => 'https://picsum.photos/seed/bag3/800/800', 'gallery' => ['https://picsum.photos/seed/bag3a/800/800']],
            ['name' => 'Beaded Evening Bag', 'slug' => 'beaded-evening-bag', 'category_id' => 3, 'price' => 380.00, 'description' => 'Hand-beaded evening bag with chain strap', 'image' => 'https://picsum.photos/seed/bag4/800/800', 'gallery' => ['https://picsum.photos/seed/bag4a/800/800']],
            
            // Shoes
            ['name' => 'Crystal Embellished Heels', 'slug' => 'crystal-embellished-heels', 'category_id' => 4, 'price' => 420.00, 'description' => 'Stunning heels with crystal embellishments', 'image' => 'https://picsum.photos/seed/shoe1/800/800', 'gallery' => ['https://picsum.photos/seed/shoe1a/800/800']],
            ['name' => 'Velvet Bridal Pumps', 'slug' => 'velvet-bridal-pumps', 'category_id' => 4, 'price' => 380.00, 'description' => 'Luxurious velvet pumps perfect for weddings', 'image' => 'https://picsum.photos/seed/shoe2/800/800', 'gallery' => ['https://picsum.photos/seed/shoe2a/800/800']],
            ['name' => 'Gold Strappy Sandals', 'slug' => 'gold-strappy-sandals', 'category_id' => 4, 'price' => 320.00, 'description' => 'Elegant gold sandals with ankle strap', 'image' => 'https://picsum.photos/seed/shoe3/800/800', 'gallery' => ['https://picsum.photos/seed/shoe3a/800/800']],
            ['name' => 'Pearl Embroidered Flats', 'slug' => 'pearl-embroidered-flats', 'category_id' => 4, 'price' => 280.00, 'description' => 'Comfortable flats with pearl embroidery', 'image' => 'https://picsum.photos/seed/shoe4/800/800', 'gallery' => ['https://picsum.photos/seed/shoe4a/800/800']],
            
            // Accessories
            ['name' => 'Silk Embroidered Dupatta', 'slug' => 'silk-embroidered-dupatta', 'category_id' => 5, 'price' => 180.00, 'description' => 'Beautiful silk dupatta with gold embroidery', 'image' => 'https://picsum.photos/seed/acc1/800/800', 'gallery' => ['https://picsum.photos/seed/acc1a/800/800']],
            ['name' => 'Designer Hair Accessories', 'slug' => 'designer-hair-accessories', 'category_id' => 5, 'price' => 120.00, 'description' => 'Set of elegant hair pins and clips', 'image' => 'https://picsum.photos/seed/acc2/800/800', 'gallery' => ['https://picsum.photos/seed/acc2a/800/800']],
            ['name' => 'Beaded Belt', 'slug' => 'beaded-belt', 'category_id' => 5, 'price' => 95.00, 'description' => 'Handcrafted beaded belt with adjustable fit', 'image' => 'https://picsum.photos/seed/acc3/800/800', 'gallery' => ['https://picsum.photos/seed/acc3a/800/800']],
            ['name' => 'Luxury Scarf Collection', 'slug' => 'luxury-scarf-collection', 'category_id' => 5, 'price' => 150.00, 'description' => 'Premium silk scarves in various colors', 'image' => 'https://picsum.photos/seed/acc4/800/800', 'gallery' => ['https://picsum.photos/seed/acc4a/800/800']],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['slug' => $product['slug']],
                $product
            );
        }
    }
}
