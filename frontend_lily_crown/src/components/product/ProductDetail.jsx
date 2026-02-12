"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, ChevronLeft, ChevronRight, Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getOptimizedImage } from "@/lib/utils";

export function ProductDetail({ product }) {
    const { addToCart, toggleWishlist, wishlistItems } = useStore();
    const [activeImage, setActiveImage] = useState(0);
    const isWishlisted = wishlistItems.has(product.id);

    if (!product) return null;

    const nextImage = () => setActiveImage((prev) => (prev + 1) % product.gallery.length);
    const prevImage = () => setActiveImage((prev) => (prev - 1 + product.gallery.length) % product.gallery.length);

    return (
        <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-muslin-cream">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">

                    {/* Left: Image Gallery */}
                    <div className="space-y-4 w-full">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl nakshi-border group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="h-full w-full"
                                >
                                    <Image
                                        src={getOptimizedImage(product.gallery[activeImage])}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows - Optimized for Touch */}
                            <button
                                onClick={prevImage}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all z-10 hover:bg-white text-emerald-royal"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all z-10 hover:bg-white text-emerald-royal"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 no-scrollbar px-1">
                            {product.gallery.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative w-16 md:w-24 aspect-[3/4] rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${activeImage === idx ? "border-heritage-gold scale-95 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <Image src={getOptimizedImage(img)} alt={`Thumbnail ${idx}`} fill sizes="100px" className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="space-y-6 md:space-y-10 px-2 lg:px-0">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-heritage-gold text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">
                                    {product.category?.name || product.category}
                                </span>
                                {product.badge && (
                                    <>
                                        <div className="w-1 h-1 rounded-full bg-heritage-gold/30"></div>
                                        <span className="bg-heritage-gold text-white text-[9px] md:text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-widest shadow-sm">
                                            {product.badge}
                                        </span>
                                    </>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif text-emerald-royal leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6">
                                <p className="text-3xl md:text-4xl text-emerald-royal font-bold">${product.price}</p>
                                <div className="flex items-center gap-1 text-heritage-gold pl-6 border-l border-heritage-gold/20">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-current" />
                                    ))}
                                    <span className="text-emerald-royal/40 text-[10px] md:text-xs ml-2 font-bold uppercase tracking-widest">Royal Reviews</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-600 leading-relaxed font-light text-lg md:text-xl max-w-xl"
                        >
                            {product.description}
                        </motion.p>

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 py-8 border-y border-heritage-gold/10"
                        >
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 gold-gradient-bg text-white py-5 px-8 uppercase tracking-[0.2em] font-bold text-xs md:text-sm shadow-2xl hover:shadow-emerald-royal/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                <ShoppingBag size={20} />
                                Keep in My Bag
                            </button>
                            <button
                                onClick={() => toggleWishlist(product.id)}
                                className={`flex-1 border-2 py-5 px-8 uppercase tracking-[0.2em] font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-3 ${isWishlisted
                                    ? "border-deep-maroon text-deep-maroon bg-deep-maroon/5 shadow-inner"
                                    : "border-emerald-royal text-emerald-royal hover:bg-emerald-royal hover:text-white"
                                    }`}
                            >
                                <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
                                {isWishlisted ? "Saved in My Sanctuary" : "Save to My Sanctuary"}
                            </button>
                        </motion.div>

                        {/* Features/Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-5">
                                <h4 className="font-serif text-xl md:text-2xl text-emerald-royal">Shundor (Beautiful) Details</h4>
                                <ul className="space-y-4">
                                    {Array.isArray(product.details) ? product.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-center gap-4 text-sm md:text-base text-gray-500 font-light">
                                            <div className="w-2 h-2 rounded-full bg-heritage-gold flex-shrink-0 animate-pulse"></div>
                                            {detail}
                                        </li>
                                    )) : (
                                        <li className="text-red-500 text-sm">Details unavailable (Invalid Format)</li>
                                    )}
                                </ul>
                            </div>

                            <div className="space-y-5 bg-white p-8 rounded-2xl shadow-xl border border-heritage-gold/5 flex flex-col justify-center">
                                <div className="flex items-center gap-4 text-sm md:text-base text-emerald-royal font-bold">
                                    <ShieldCheck size={20} className="text-heritage-gold flex-shrink-0" />
                                    <span>Real Nawabi Quality</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm md:text-base text-emerald-royal font-bold">
                                    <Truck size={20} className="text-heritage-gold flex-shrink-0" />
                                    <span>Fast Royal Delivery</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm md:text-base text-emerald-royal font-bold">
                                    <RefreshCw size={20} className="text-heritage-gold flex-shrink-0" />
                                    <span>Easy 14-day Exchange</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
