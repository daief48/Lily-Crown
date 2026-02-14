"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { api } from "@/lib/api";
import { ProductCard } from "@/components/product/ProductCard";
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function AIStylistPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAIRecommendations() {
            try {
                // For now, use featured products as "AI recommendations"
                const data = await api.getProducts(1, 8);
                if (data?.data) {
                    setProducts(data.data);
                }
            } catch (error) {
                console.error("AI Stylist error:", error);
            } finally {
                setLoading(false);
            }
        }
        loadAIRecommendations();
    }, []);

    return (
        <main className="bg-muslin-cream min-h-screen">
            <Navbar />

            <div className="pt-32 pb-16 max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 mb-2"
                    >
                        <Sparkles className="text-heritage-gold" size={20} />
                        <span className="text-heritage-gold text-xs uppercase tracking-[0.3em] font-bold">
                            Intelligent Curation
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-emerald-royal"
                    >
                        Your Royal AI Stylist
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-emerald-royal/60 max-w-2xl mx-auto font-light"
                    >
                        Our artisanal intelligence has curated a selection of masterpieces tailored to your exquisite taste.
                    </motion.p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] bg-white/50 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-white shadow-xl rounded-sm border border-heritage-gold/20">
                        <p className="text-lg text-emerald-royal/60 mb-8 font-serif">The Stylist is preparing your collection.</p>
                        <Link
                            href="/shop"
                            className="inline-block px-8 py-3 bg-emerald-royal text-white uppercase tracking-widest text-xs font-bold hover:bg-heritage-gold transition-colors shadow-lg"
                        >
                            Browse All Masterpieces
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product, idx) => (
                            <ProductCard key={product.id} product={product} index={idx} />
                        ))}
                    </div>
                )}

                <div className="mt-16 pt-16 border-t border-heritage-gold/10 text-center">
                    <Link
                        href="/orders"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-white border-2 border-emerald-royal text-emerald-royal uppercase tracking-[0.2em] font-bold text-xs hover:bg-emerald-royal hover:text-white transition-all shadow-xl"
                    >
                        <ShoppingBag size={18} />
                        View My Royal Orders
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}
