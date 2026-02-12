"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, RefreshCw, ChevronLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useStore();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        customer_name: "",
        customer_email: "",
        phone: "",
        address: "",
        city: "",
        payment_method: "cod", // Default to COD
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:8000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    total: cartTotal,
                    items: cartItems,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                clearCart();
                router.push(`/checkout/success?order_id=${data.order_id}`);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Order submission error:", error);
            alert("Connection error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <main className="bg-muslin-cream min-h-screen flex flex-col items-center justify-center p-4">
                <Navbar />
                <div className="text-center py-20 bg-white shadow-xl rounded-sm border border-heritage-gold/20 max-w-lg w-full">
                    <p className="text-lg text-emerald-royal/60 mb-8 font-serif">Your bag is empty, my majesty.</p>
                    <Link
                        href="/shop"
                        className="inline-block px-8 py-3 bg-emerald-royal text-white uppercase tracking-widest text-xs font-bold hover:bg-heritage-gold transition-colors shadow-lg"
                    >
                        Return to Shop
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="bg-muslin-cream min-h-screen pb-16">
            <Navbar />

            <div className="pt-32 max-w-7xl mx-auto px-4 md:px-6">
                <Link href="/cart" className="flex items-center gap-2 text-emerald-royal/60 hover:text-emerald-royal mb-8 transition-colors group">
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="uppercase tracking-widest text-[10px] font-bold">Back to Bag</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Shipping Form */}
                    <div className="bg-white p-8 md:p-12 shadow-2xl border border-heritage-gold/10 rounded-sm">
                        <h2 className="text-3xl font-serif text-emerald-royal mb-8">Shipping Sanctuary</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/50 ml-1">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="customer_name"
                                        value={formData.customer_name}
                                        onChange={handleChange}
                                        className="w-full bg-muslin-cream/30 border border-heritage-gold/20 p-4 focus:border-heritage-gold outline-none transition-all placeholder:text-emerald-royal/20"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/50 ml-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        name="customer_email"
                                        value={formData.customer_email}
                                        onChange={handleChange}
                                        className="w-full bg-muslin-cream/30 border border-heritage-gold/20 p-4 focus:border-heritage-gold outline-none transition-all placeholder:text-emerald-royal/20"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/50 ml-1">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-muslin-cream/30 border border-heritage-gold/20 p-4 focus:border-heritage-gold outline-none transition-all placeholder:text-emerald-royal/20"
                                    placeholder="01xxxxxxxxx"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/50 ml-1">Delivery Address</label>
                                <textarea
                                    required
                                    name="address"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full bg-muslin-cream/30 border border-heritage-gold/20 p-4 focus:border-heritage-gold outline-none transition-all placeholder:text-emerald-royal/20"
                                    placeholder="House, Street, Area..."
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/50 ml-1">City</label>
                                <input
                                    required
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full bg-muslin-cream/30 border border-heritage-gold/20 p-4 focus:border-heritage-gold outline-none transition-all placeholder:text-emerald-royal/20"
                                    placeholder="Dhaka, Chittagong..."
                                />
                            </div>

                            <div className="pt-8 border-t border-heritage-gold/10">
                                <h3 className="text-xl font-serif text-emerald-royal mb-6 flex items-center gap-3">
                                    <CreditCard size={20} className="text-heritage-gold" />
                                    Payment Method
                                </h3>
                                <div className="p-4 bg-emerald-royal/5 border border-heritage-gold/20 rounded-sm flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-5 h-5 rounded-full border-4 border-heritage-gold bg-white"></div>
                                        <div>
                                            <p className="text-sm font-bold text-emerald-royal uppercase tracking-wider">Cash on Delivery</p>
                                            <p className="text-[10px] text-emerald-royal/50">Pay when you receive your order</p>
                                        </div>
                                    </div>
                                    <span className="text-heritage-gold font-bold text-xs uppercase tracking-widest">Selected</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-heritage-gold text-white uppercase tracking-[0.2em] font-bold text-sm shadow-2xl hover:bg-emerald-royal transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                            >
                                {isSubmitting ? "Processing Majesty..." : "Confirm Royal Order"}
                            </button>
                        </form>
                    </div>

                    {/* Order Sidebar */}
                    <div className="lg:sticky lg:top-32 space-y-8">
                        <div className="bg-emerald-royal p-8 text-white shadow-2xl border-l-4 border-heritage-gold">
                            <h3 className="text-xl font-serif mb-6 border-b border-white/10 pb-4">Royal Manifesto</h3>

                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-16 h-20 flex-shrink-0 bg-white/10 rounded-sm overflow-hidden border border-white/10">
                                            {item.image && (
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-serif line-clamp-1">{item.name}</p>
                                            <p className="text-[10px] uppercase tracking-widest text-white/50">{item.quantity} × ৳{item.price.toLocaleString()}</p>
                                            <p className="text-xs font-bold text-heritage-gold mt-1">৳{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                                <div className="flex justify-between text-white/60 text-xs uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span>৳{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-white/60 text-xs uppercase tracking-widest">
                                    <span>Shipping</span>
                                    <span className="text-heritage-gold italic">Complimentary</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/10">
                                    <span className="font-serif">Total</span>
                                    <span className="text-heritage-gold">৳{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-sm border border-heritage-gold/10 text-center space-y-2">
                                <ShieldCheck size={24} className="mx-auto text-heritage-gold" />
                                <p className="text-[9px] uppercase tracking-widest font-bold text-emerald-royal">Secure Order</p>
                            </div>
                            <div className="bg-white p-4 rounded-sm border border-heritage-gold/10 text-center space-y-2">
                                <Truck size={24} className="mx-auto text-heritage-gold" />
                                <p className="text-[9px] uppercase tracking-widest font-bold text-emerald-royal">Royal Delivery</p>
                            </div>
                            <div className="bg-white p-4 rounded-sm border border-heritage-gold/10 text-center space-y-2">
                                <RefreshCw size={24} className="mx-auto text-heritage-gold" />
                                <p className="text-[9px] uppercase tracking-widest font-bold text-emerald-royal">Easy Exchange</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
