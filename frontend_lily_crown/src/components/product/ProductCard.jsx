"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Heart, Star, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getOptimizedImage } from "@/lib/utils";
import { RoyalImage } from "@/components/ui/RoyalImage";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function ProductCard({ product, index, priority = false }) {
    const { addToCart, toggleWishlist, wishlistItems } = useStore();
    const isWishlisted = wishlistItems.some(item => Number(item.id) === Number(product.id));
    const [isHovered, setIsHovered] = React.useState(false);

    // Get primary and secondary images
    // gallery[0] is used as the alternate/hover image (primary image comes from product.image separately)
    const primaryImage = getOptimizedImage(product.image);
    const secondaryImage = product.gallery && product.gallery.length > 0
        ? getOptimizedImage(product.gallery[0])
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-royal/10 transition-all duration-500"
        >
            <div
                className="relative overflow-hidden aspect-[3/4] bg-muslin-cream/20"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Delivery Badge */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                    {product.badge && (
                        <span className="inline-block px-3 py-1 text-[8px] uppercase font-bold tracking-widest text-white bg-emerald-royal rounded-lg shadow-lg">
                            {product.badge}
                        </span>
                    )}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 text-[8px] font-bold text-heritage-gold bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-heritage-gold/10">
                        <Truck size={10} />
                        <span>ROYAL EXPRESS</span>
                    </div>
                </div>

                <Link href={`/product/${product.id}`} className="block h-full relative">
                    {/* Primary Image */}
                    <Image
                        src={primaryImage}
                        alt={product.name}
                        fill
                        priority={priority}
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className={cn(
                            "object-cover transition-all duration-700 ease-in-out",
                            isHovered && secondaryImage ? "opacity-0 scale-110" : "opacity-100 scale-100"
                        )}
                    />
                    {/* Secondary / Hover Image */}
                    {secondaryImage && (
                        <Image
                            src={secondaryImage}
                            alt={`${product.name} - alternate view`}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className={cn(
                                "object-cover transition-all duration-700 ease-in-out absolute inset-0",
                                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
                            )}
                        />
                    )}
                </Link>

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 bg-gradient-to-t from-black/20 to-transparent">
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-emerald-royal text-white py-3 rounded-xl text-[9px] uppercase tracking-[0.2em] font-bold shadow-2xl hover:bg-heritage-gold transition-colors active:scale-95"
                    >
                        Add to Selection
                    </button>
                </div>

                <button
                    onClick={() => toggleWishlist(product)}
                    className={cn(
                        "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md z-20 border border-white/20",
                        isWishlisted ? "bg-white text-deep-maroon shadow-lg" : "bg-white/40 text-emerald-royal/40 hover:bg-white hover:text-deep-maroon"
                    )}
                >
                    <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
            </div>

            <div className="p-4 flex flex-col flex-1 bg-white">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] text-emerald-royal/40 uppercase tracking-widest font-bold">
                        {product.category?.name || "Artifact"}
                    </span>
                    <div className="flex items-center gap-0.5 text-heritage-gold">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={10} fill={s <= 4 ? "currentColor" : "none"} />
                        ))}
                        <span className="text-[9px] text-emerald-royal/30 ml-1 font-bold">(4.0)</span>
                    </div>
                </div>

                <Link href={`/product/${product.id}`} className="block mb-3">
                    <h3 className="font-serif text-base text-emerald-royal group-hover:text-heritage-gold transition-colors line-clamp-2 min-h-[3rem]">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-auto pt-3 border-t border-heritage-gold/5 flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-emerald-royal font-serif text-xl font-bold">৳{product.price}</span>
                            {product.old_price && (
                                <span className="text-emerald-royal/30 line-through text-xs italic">৳{product.old_price}</span>
                            )}
                        </div>
                        <p className="text-[8px] uppercase tracking-widest text-heritage-gold font-bold">Heritage Piece</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
