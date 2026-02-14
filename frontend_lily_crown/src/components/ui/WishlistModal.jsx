"use client";

import React from "react";
import { Trash2, ShoppingBag, X, Heart } from "lucide-react";
import { RoyalImage } from "@/components/ui/RoyalImage";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { getOptimizedImage } from "@/lib/utils";

import { products } from "@/data/products";

export function WishlistModal() {
    const { isWishlistOpen, setIsWishlistOpen, wishlistItems, toggleWishlist, addToCart } = useStore();

    const wishlistedProducts = wishlistItems;

    return (
        <AnimatePresence>
            {isWishlistOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsWishlistOpen(false)}
                        className="fixed inset-0 bg-black/50 z-[60]"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8"
                    >
                        <div className="flex justify-between items-center mb-8 border-b pb-4">
                            <h2 className="font-serif text-2xl">Your Wishlist</h2>
                            <button onClick={() => setIsWishlistOpen(false)} className="text-2xl hover:text-rose-gold p-2">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4 overflow-y-auto h-[calc(100vh-180px)] pr-2">
                            {wishlistedProducts.length === 0 ? (
                                <div className="text-center text-gray-400 mt-20 flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                        <Heart size={32} />
                                    </div>
                                    <p className="font-serif text-lg">Your wishlist is empty</p>
                                    <p className="text-xs mt-2">Start adding items you love.</p>
                                    <button
                                        onClick={() => setIsWishlistOpen(false)}
                                        className="mt-6 px-6 py-2 border border-gray-300 text-xs uppercase hover:bg-black hover:text-white transition-colors"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                wishlistedProducts.map((product) => (
                                    <div key={product.id} className="flex gap-4 p-2 hover:bg-gray-50 transition-colors rounded">
                                        <div className="relative w-20 h-24 flex-shrink-0">
                                            <RoyalImage
                                                src={getOptimizedImage(product.image)}
                                                alt={product.name}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center text-left">
                                            <h4 className="font-serif text-gray-800">{product.name}</h4>
                                            <p className="text-rose-gold font-bold text-sm">${product.price}</p>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="text-xs uppercase tracking-wider text-left mt-2 underline text-gray-500 hover:text-black"
                                            >
                                                Move to Cart
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => toggleWishlist(product)}
                                            className="text-gray-400 hover:text-red-500 self-center p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
