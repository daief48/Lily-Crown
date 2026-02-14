"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getOptimizedImage } from "@/lib/utils";
import { RoyalImage } from "@/components/ui/RoyalImage";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useStore();


    return (
        <main className="bg-muslin-cream min-h-screen">
            <Navbar />

            <div className="pt-32 pb-16 max-w-7xl mx-auto px-4 md:px-6">
                <h1 className="text-3xl md:text-5xl font-serif text-emerald-royal mb-8 text-center">Your Royal Bag</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white shadow-xl rounded-sm border border-heritage-gold/20">
                        <p className="text-lg text-emerald-royal/60 mb-8 font-serif">Your bag is currently empty, my majesty.</p>
                        <Link
                            href="/shop"
                            className="inline-block px-8 py-3 bg-emerald-royal text-white uppercase tracking-widest text-xs font-bold hover:bg-heritage-gold transition-colors shadow-lg"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white p-6 shadow-md border border-heritage-gold/10 gap-6 transition-hover hover:shadow-lg">
                                    <div className="relative w-full sm:w-32 h-40 flex-shrink-0 bg-muslin-cream">
                                        {item.image ? (
                                            <RoyalImage
                                                src={getOptimizedImage(item.image)}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-emerald-royal/20 uppercase text-[10px] tracking-widest text-center px-4 font-bold">
                                                No Image Available
                                            </div>
                                        )}
                                    </div>


                                    <div className="flex-1 text-center sm:text-left w-full">
                                        <h3 className="text-xl font-serif text-emerald-royal">{item.name}</h3>
                                        <p className="text-xs text-emerald-royal/50 uppercase tracking-widest mb-2">{item.category?.name || (typeof item.category === 'string' ? item.category : '')}</p>
                                        <div className="text-lg font-bold text-heritage-gold">৳ {(item.price || 0).toLocaleString()}</div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center border border-emerald-royal/20">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-2 text-emerald-royal hover:bg-emerald-royal/5 transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-10 text-center text-sm font-bold text-emerald-royal">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-2 text-emerald-royal hover:bg-emerald-royal/5 transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-600 transition-colors p-2"
                                            title="Remove Item"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 shadow-xl border-t-4 border-heritage-gold sticky top-32">
                                <h3 className="text-xl font-serif text-emerald-royal mb-6 border-b border-emerald-royal/10 pb-4">Order Summary</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm text-emerald-royal/80">
                                        <span>Subtotal</span>
                                        <span>৳ {cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-emerald-royal/80">
                                        <span>Shipping</span>
                                        <span className="text-emerald-royal/50 text-xs italic">Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-emerald-royal pt-4 border-t border-emerald-royal/10">
                                        <span>Total</span>
                                        <span>৳ {cartTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full py-4 bg-heritage-gold text-white uppercase tracking-widest text-xs font-bold hover:bg-emerald-royal transition-all shadow-lg flex items-center justify-center gap-2 group"
                                >
                                    Checkout Now
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <p className="text-[10px] text-center text-emerald-royal/40 mt-4 italic">
                                    Secure Checkout • Free Returns within 30 days
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
