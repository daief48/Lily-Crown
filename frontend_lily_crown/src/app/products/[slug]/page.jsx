import { api } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductDetail } from "@/components/product/ProductDetail";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { WishlistModal } from "@/components/ui/WishlistModal";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
    // We use 'slug' as the parameter name now
    const { slug } = await params;

    // The api.getProduct function already supports both ID and Slug
    const product = await api.getProduct(slug);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            <Navbar />
            <ProductDetail product={product} />
            <RelatedProducts currentProductId={product.id} category={product.category} />
            <Footer />

            {/* Overlays */}
            <WishlistModal />
        </main>
    );
}

export async function generateStaticParams() {
    const products = await api.getProducts();
    if (!products) return [];

    return products.map((product) => ({
        slug: product.slug || product.id.toString(),
    }));
}
