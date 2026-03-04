import dynamic from 'next/dynamic';
import { Navbar, Hero } from "@/components";
import Skeleton from "@/components/ui/Skeleton";

// Lazy load non-critical components directly from their source files to avoid barrel-file bloat
const Categories = dynamic(() => import('@/components/sections/Categories').then(mod => ({ default: mod.Categories })), {
    loading: () => <div className="py-24 max-w-7xl mx-auto px-4 md:px-6"><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />)}</div></div>
});
const FeaturedProducts = dynamic(() => import('@/components/sections/FeaturedProducts').then(mod => ({ default: mod.FeaturedProducts })), {
    loading: () => <div className="py-24 max-w-7xl mx-auto px-4 md:px-6"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{[1, 2, 3, 4].map(i => <div key={i} className="space-y-4"><Skeleton className="aspect-[3/4] rounded-3xl" /><Skeleton className="h-4 w-2/3" /></div>)}</div></div>
});
const PickYourRoyalLook = dynamic(() => import('@/components/sections/PickYourRoyalLook').then(mod => ({ default: mod.PickYourRoyalLook })), {
    loading: () => <div className="py-24 max-w-7xl mx-auto px-4 md:px-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-[3/4] rounded-xl" />)}</div></div>
});
const Trending = dynamic(() => import('@/components/sections/Trending').then(mod => ({ default: mod.Trending })), {
    loading: () => <div className="py-24 max-w-7xl mx-auto px-4 md:px-6"><div className="flex gap-6 overflow-hidden md:flex-row flex-col">{[1, 2, 3, 4].map(i => <Skeleton key={i} className="flex-shrink-0 w-full md:w-[320px] aspect-[16/9] md:aspect-[3/4] rounded-lg" />)}</div></div>
});
const Features = dynamic(() => import('@/components/sections/Features').then(mod => ({ default: mod.Features })), {
    loading: () => <div className="py-16 bg-white/50"><div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">{[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 rounded-2xl" />)}</div></div>
});
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(mod => ({ default: mod.Testimonials })));
const BlogPreview = dynamic(() => import('@/components/sections/BlogPreview').then(mod => ({ default: mod.BlogPreview })));
const InstagramFeed = dynamic(() => import('@/components/sections/InstagramFeed').then(mod => ({ default: mod.InstagramFeed })));
const Newsletter = dynamic(() => import('@/components/sections/Newsletter').then(mod => ({ default: mod.Newsletter })));
const Footer = dynamic(() => import('@/components/layout/Footer').then(mod => ({ default: mod.Footer })));
const WishlistModal = dynamic(() => import('@/components/ui/WishlistModal').then(mod => ({ default: mod.WishlistModal })));

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <Categories />
            <FeaturedProducts />
            <PickYourRoyalLook />
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
