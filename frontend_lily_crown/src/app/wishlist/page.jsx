"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { getOptimizedImage } from "@/lib/utils";
import { RoyalImage } from "@/components/ui/RoyalImage";

export default function WishlistPage() {
    const { wishlistItems, toggleWishlist, addToCart } = useStore();
    const router = useRouter();

    const validWishlistItems = wishlistItems;

    return (
        <main className="bg-muslin-cream min-h-screen">
            <Navbar />

            <div className="pt-32 pb-16 max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <span className="text-heritage-gold text-xs uppercase tracking-[0.3em] font-bold">
                        Your Favorites
                    </span>
                    <h1 className="text-3xl md:text-5xl font-serif text-emerald-royal mt-3">Royal Wishlist</h1>
                </div>

                {validWishlistItems.length === 0 ? (
                    <div className="text-center py-20 bg-white shadow-xl rounded-sm border border-heritage-gold/20">
                        <p className="text-lg text-emerald-royal/60 mb-8 font-serif">Your wishlist is waiting for your royal selection.</p>
                        <Link
                            href="/shop"
                            className="inline-block px-8 py-3 bg-emerald-royal text-white uppercase tracking-widest text-xs font-bold hover:bg-heritage-gold transition-colors shadow-lg"
                        >
                            Explore Collection
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Bulk Actions */}
                        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mb-10 pb-8 border-b border-heritage-gold/10">
                            <button
                                onClick={() => {
                                    validWishlistItems.forEach(item => addToCart(item));
                                }}
                                className="w-full sm:w-auto px-8 py-3 bg-muslin-cream border border-heritage-gold/30 text-emerald-royal uppercase tracking-widest text-[10px] font-bold hover:bg-heritage-gold hover:text-white transition-all shadow-sm"
                            >
                                Move All to Bag
                            </button>
                            <button
                                onClick={() => {
                                    validWishlistItems.forEach(item => addToCart(item));
                                    router.push('/checkout');
                                }}
                                className="w-full sm:w-auto px-10 py-3 bg-heritage-gold text-white uppercase tracking-widest text-[10px] font-bold hover:bg-emerald-royal transition-all shadow-lg flex items-center justify-center gap-2 group"
                            >
                                <ShoppingBag size={14} className="group-hover:scale-110 transition-transform" />
                                Royal Checkout All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {validWishlistItems.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group relative bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-emerald-royal/5"
                                >
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <RoyalImage
                                            src={getOptimizedImage(product.image)}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => toggleWishlist(product)}
                                            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-emerald-royal hover:bg-red-500 hover:text-white transition-all shadow-md z-10"
                                            title="Remove from Wishlist"
                                        >
                                            <X size={16} />
                                        </button>

                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-emerald-royal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="bg-white text-emerald-royal px-6 py-3 uppercase tracking-widest text-[10px] font-bold hover:bg-emerald-royal hover:text-white transition-all shadow-xl transform translate-y-4 group-hover:translate-y-0 duration-500"
                                            >
                                                Add to Bag
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6 text-center">
                                        <h3 className="text-lg font-serif text-emerald-royal">{product.name}</h3>
                                        <p className="text-[10px] uppercase tracking-widest text-emerald-royal/50 my-2">{product.category?.name || (typeof product.category === 'string' ? product.category : '')}</p>
                                        <p className="text-heritage-gold font-bold">৳ {product.price.toLocaleString()}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </main>
    );
}
