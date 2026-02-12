import { api } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductDetail } from "@/components/product/ProductDetail";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { WishlistModal } from "@/components/ui/WishlistModal";
import { Toast } from "@/components/ui/Toast";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
    const { id } = await params;
    const product = await api.getProduct(id);

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
            <Toast />
        </main>
    );
}

export async function generateStaticParams() {
    const products = await api.getProducts();
    if (!products) return [];

    return products.map((product) => ({
        id: product.id.toString(),
    }));
}
