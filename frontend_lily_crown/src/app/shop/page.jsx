"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { WishlistModal } from "@/components/ui/WishlistModal";
import { Toast } from "@/components/ui/Toast";

import { api } from "@/lib/api";
import Skeleton from "@/components/ui/Skeleton";

export default function ShopPage() {
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadProducts = async () => {
            const data = await api.getProducts();
            if (data) {
                setProducts(data);
            }
            setLoading(false);
        };
        loadProducts();
    }, []);

    return (
        <main className="min-h-screen bg-muslin-cream">
            <Navbar />
            <SectionHeader title="The Royal Boutique" subtitle="Heirlooms of Mother Bengal" />

            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <p className="text-gray-500 font-light italic">Refined selection of {products.length} heritage pieces</p>
                    <div className="flex gap-4">
                        <select className="bg-white border border-heritage-gold/20 px-6 py-2 text-xs uppercase tracking-widest outline-none cursor-pointer hover:border-heritage-gold transition-colors">
                            <option>Sort By: Nawabi Choice</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest Legacy</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-2/3" />
                                    <Skeleton className="h-4 w-1/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {products.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                )}
            </section>

            <Footer />
            <WishlistModal />
            <Toast />
        </main>
    );
}
