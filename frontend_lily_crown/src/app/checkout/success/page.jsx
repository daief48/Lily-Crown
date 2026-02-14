"use client";

import React, { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");

    return (
        <div className="pt-48 pb-24 max-w-2xl mx-auto px-4 text-center">
            <div className="bg-white p-8 md:p-16 shadow-2xl border border-heritage-gold/10 rounded-sm space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 bg-emerald-royal/5 border-2 border-heritage-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={48} className="text-heritage-gold" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif text-emerald-royal">Order of the Crown</h1>
                    <p className="text-heritage-gold uppercase tracking-[0.3em] font-bold text-xs">Successfully Received</p>
                    {orderId && (
                        <p className="text-emerald-royal/60 text-sm font-bold">Order ID: #{orderId}</p>
                    )}
                </div>

                <div className="text-emerald-royal/70 font-light leading-relaxed space-y-4">
                    <p>Thank you for choosing Lily Crown, Majesty. Your order has been registered in our royal archives and is being prepared with the utmost care.</p>
                    <p className="text-sm">We will contact you via phone shortly to confirm your delivery details. Cash on Delivery is ready for your convenience.</p>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/shop"
                        className="px-8 py-4 bg-emerald-royal text-white uppercase tracking-widest text-xs font-bold hover:bg-heritage-gold transition-colors shadow-lg flex items-center justify-center gap-2 group"
                    >
                        <ShoppingBag size={16} />
                        Continue Shopping
                    </Link>
                    <Link
                        href="/orders"
                        className="px-8 py-4 border border-heritage-gold text-heritage-gold uppercase tracking-widest text-xs font-bold hover:bg-heritage-gold hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                        View My Orders
                        <ShoppingBag size={16} />
                    </Link>
                    <Link
                        href="/"
                        className="px-8 py-4 border border-emerald-royal text-emerald-royal uppercase tracking-widest text-xs font-bold hover:bg-emerald-royal hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                        Return to Palace
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <main className="bg-muslin-cream min-h-screen">
            <Navbar />
            <Suspense fallback={<div className="pt-48 text-center">Loading Royal Decree...</div>}>
                <SuccessContent />
            </Suspense>
            <Footer />
        </main>
    );
}
