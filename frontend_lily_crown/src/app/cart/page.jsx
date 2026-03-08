"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getOptimizedImage } from "@/lib/utils";
import { RoyalImage } from "@/components/ui/RoyalImage";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, updateVariant, cartTotal, showToast } = useStore();
    const { t } = useLanguage();


    return (
        <main className="bg-muslin-cream min-h-screen">
            <Navbar />

            <div className="pt-32 pb-16 max-w-7xl mx-auto px-4 md:px-6">
                <h1 className="text-3xl md:text-5xl font-serif text-emerald-royal mb-8 text-center">{t('cart_title')}</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white shadow-xl rounded-sm border border-heritage-gold/20">
                        <p className="text-lg text-emerald-royal/60 mb-8 font-serif">{t('cart_empty_message')}</p>
                        <Link
                            href="/shop"
                            className="inline-block px-8 py-3 bg-emerald-royal text-white uppercase tracking-widest text-xs font-bold hover:bg-heritage-gold transition-colors shadow-lg"
                        >
                            {t('shop_start_shopping')}
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.variantId} className="flex flex-col sm:flex-row items-center bg-white p-6 shadow-md border border-heritage-gold/10 gap-6 transition-hover hover:shadow-lg">
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
                                                {t('product_no_image')}
                                            </div>
                                        )}
                                    </div>


                                    <div className="flex-1 text-center sm:text-left w-full">
                                        <h3 className="text-xl font-serif text-emerald-royal">{item.name}</h3>
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 mt-1 mb-2">
                                            <p className="text-[10px] text-emerald-royal/50 uppercase tracking-[0.2em]">{item.category?.name || (typeof item.category === 'string' ? item.category : '')}</p>
                                        </div>

                                        {/* Variation Selectors - Matching ProductDetail Style */}
                                        <div className="space-y-6 mt-6 mb-6">
                                            {/* Size Selectors */}
                                            {Array.isArray(item.sizes) && item.sizes.length > 0 && (
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between border-b border-emerald-royal/5 pb-2">
                                                        <h4 className="text-[9px] uppercase tracking-[0.3em] font-black text-emerald-royal/40">
                                                            {t('product_step_size')}
                                                        </h4>
                                                        {item.selectedSize && (
                                                            <span className="text-[9px] font-black text-heritage-gold uppercase tracking-widest bg-heritage-gold/5 px-2 py-0.5 rounded-full">
                                                                {item.selectedSize}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                                        {item.sizes.map((size) => {
                                                            const sizeName = typeof size === 'object' ? size.name : size;
                                                            return (
                                                                <button
                                                                    key={sizeName}
                                                                    onClick={() => updateVariant(item.variantId, sizeName, item.selectedColor)}
                                                                    className={`h-10 px-6 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${item.selectedSize === sizeName
                                                                        ? 'bg-emerald-royal text-white shadow-lg scale-105'
                                                                        : 'bg-white border border-emerald-royal/10 text-emerald-royal/70 hover:border-emerald-royal hover:shadow-md'
                                                                        }`}
                                                                >
                                                                    {sizeName}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Color Selectors */}
                                            {Array.isArray(item.colors) && item.colors.length > 0 && (
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between border-b border-emerald-royal/5 pb-2">
                                                        <h4 className="text-[9px] uppercase tracking-[0.3em] font-black text-emerald-royal/40">
                                                            {t('product_step_color')}
                                                        </h4>
                                                        {item.selectedColor && (
                                                            <span className="text-[9px] font-black text-heritage-gold uppercase tracking-widest bg-heritage-gold/5 px-2 py-0.5 rounded-full">
                                                                {item.selectedColor.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                                                        {item.colors.map((color) => (
                                                            <button
                                                                key={color.name}
                                                                onClick={() => updateVariant(item.variantId, item.selectedSize, color)}
                                                                className={`relative w-8 h-8 flex items-center justify-center transition-all duration-300 rounded-full p-0.5 border-2 ${item.selectedColor?.name === color.name
                                                                    ? 'border-heritage-gold scale-110 shadow-md'
                                                                    : 'border-transparent hover:scale-110 hover:border-emerald-royal/20'
                                                                    }`}
                                                                title={color.name}
                                                            >
                                                                <span
                                                                    className="block w-full h-full rounded-full border border-black/5"
                                                                    style={{ backgroundColor: color.hex || color.hex_code }}
                                                                />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-xl font-bold text-heritage-gold mt-2">৳{(item.price || 0).toLocaleString()}</div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center bg-emerald-royal/5 border border-emerald-royal/10 rounded-xl p-1">
                                            <button
                                                onClick={() => updateQuantity(item.variantId, -1)}
                                                className="w-10 h-10 flex items-center justify-center text-emerald-royal hover:bg-emerald-royal/10 rounded-lg transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-10 text-center text-base font-bold text-emerald-royal">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.variantId, 1)}
                                                className="w-10 h-10 flex items-center justify-center text-emerald-royal hover:bg-emerald-royal/10 rounded-lg transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.variantId)}
                                            className="text-red-500 hover:text-red-600 transition-colors p-3 bg-red-50 rounded-xl"
                                            title={t('cart_remove_item')}
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
                                <h3 className="text-xl font-serif text-emerald-royal mb-6 border-b border-emerald-royal/10 pb-4">{t('cart_order_summary')}</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm text-emerald-royal/80">
                                        <span>{t('cart_subtotal')}</span>
                                        <span>৳{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-emerald-royal/80">
                                        <span>{t('cart_shipping')}</span>
                                        <span className="text-emerald-royal/50 text-xs italic">{t('cart_shipping_disclaimer')}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-emerald-royal pt-4 border-t border-emerald-royal/10">
                                        <span>{t('cart_total')}</span>
                                        <span>৳{cartTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        const incompleteItems = cartItems.filter(item => {
                                            const needsSize = Array.isArray(item.sizes) && item.sizes.length > 0;
                                            const needsColor = Array.isArray(item.colors) && item.colors.length > 0;
                                            return (needsSize && !item.selectedSize) || (needsColor && !item.selectedColor);
                                        });

                                        if (incompleteItems.length > 0) {
                                            showToast(t('product_error_incomplete_selection', { name: incompleteItems[0].name }), 'error');
                                            return;
                                        }
                                        window.location.href = "/checkout";
                                    }}
                                    className="w-full py-4 bg-heritage-gold text-white uppercase tracking-widest text-xs font-bold hover:bg-emerald-royal transition-all shadow-lg flex items-center justify-center gap-2 group"
                                >
                                    {t('cart_checkout_btn')}
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-[10px] text-center text-emerald-royal/40 mt-4 italic">
                                    {t('cart_secure_checkout_guarantee')}
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
