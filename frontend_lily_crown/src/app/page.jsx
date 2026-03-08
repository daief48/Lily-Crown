import dynamic from 'next/dynamic';
import { Navbar, Hero } from "@/components";
import Skeleton from "@/components/ui/Skeleton";

import {
    CategoriesSkeleton,
    PickYourRoyalLookSkeleton,
    TrendingSkeleton,
    FeaturesSkeleton,
    TestimonialsSkeleton,
    BlogPreviewSkeleton,
    InstagramFeedSkeleton
} from '@/components/ui/SectionSkeletons';

// Lazy load non-critical components directly from their source files to avoid barrel-file bloat
const Categories = dynamic(() => import('@/components/sections/Categories').then(mod => ({ default: mod.Categories })), {
    loading: CategoriesSkeleton
});
const FeaturedProducts = dynamic(() => import('@/components/sections/FeaturedProducts').then(mod => ({ default: mod.FeaturedProducts })));
const PickYourRoyalLook = dynamic(() => import('@/components/sections/PickYourRoyalLook').then(mod => ({ default: mod.PickYourRoyalLook })), {
    loading: PickYourRoyalLookSkeleton
});
const Trending = dynamic(() => import('@/components/sections/Trending').then(mod => ({ default: mod.Trending })), {
    loading: TrendingSkeleton
});
const Features = dynamic(() => import('@/components/sections/Features').then(mod => ({ default: mod.Features })), {
    loading: FeaturesSkeleton
});
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(mod => ({ default: mod.Testimonials })), {
    loading: TestimonialsSkeleton
});
const BlogPreview = dynamic(() => import('@/components/sections/BlogPreview').then(mod => ({ default: mod.BlogPreview })), {
    loading: BlogPreviewSkeleton
});
const InstagramFeed = dynamic(() => import('@/components/sections/InstagramFeed').then(mod => ({ default: mod.InstagramFeed })), {
    loading: InstagramFeedSkeleton
});
const Newsletter = dynamic(() => import('@/components/sections/Newsletter').then(mod => ({ default: mod.Newsletter })));
const Footer = dynamic(() => import('@/components/layout/Footer').then(mod => ({ default: mod.Footer })));
const WishlistModal = dynamic(() => import('@/components/ui/WishlistModal').then(mod => ({ default: mod.WishlistModal })));

import { api } from '@/lib/api';

export default async function Home() {
    // Parallel fetching for high-priority above-the-fold content
    const [heroSlides, products, lookbookResponse] = await Promise.all([
        api.getHeroSlides(),
        api.getProducts(),
        api.getLookbook(1, 7)
    ]);

    const mappedSlides = heroSlides ? heroSlides.map(slide => ({
        ...slide,
        highlight: slide.highlight || (slide.title ? slide.title.split(' ')[0] : ''),
        description: slide.subtitle,
    })) : [];

    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero initialSlides={mappedSlides} />
            <Categories />
            <FeaturedProducts initialProducts={products || []} />
            <PickYourRoyalLook initialItems={lookbookResponse?.data || []} />
            <Trending />
            <Features />
            <Testimonials />
            <BlogPreview />
            <InstagramFeed />
            <Newsletter />
            <Footer />

            {/* Overlays */}
            <WishlistModal />
        </main>
    );
}
