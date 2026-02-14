"use client";

import React, { useState, useEffect } from "react";
import { Navbar, Footer, SectionHeader } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import {
    Package,
    ChevronRight,
    ShoppingBag,
    Loader2,
    Clock,
    CheckCircle2,
    Truck,
    CreditCard,
    MapPin,
    Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getOptimizedImage } from "@/lib/utils";

const ORDER_STATUSES = [
    { id: 'pending', label: 'Ordered', icon: Clock },
    { id: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
    { id: 'shipped', label: 'In Transit', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: Package }
];

const StatusTracker = ({ currentStatus }) => {
    const activeIndex = ORDER_STATUSES.findIndex(s => s.id === currentStatus);

    return (
        <div className="w-full py-6">
            <div className="relative flex justify-between">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-heritage-gold/10 -translate-y-1/2 z-0" />
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(activeIndex / (ORDER_STATUSES.length - 1)) * 100}%` }}
                    className="absolute top-1/2 left-0 h-0.5 bg-heritage-gold -translate-y-1/2 z-0"
                />

                {ORDER_STATUSES.map((status, index) => {
                    const Icon = status.icon;
                    const isActive = index <= activeIndex;
                    const isCurrent = index === activeIndex;

                    return (
                        <div key={status.id} className="relative z-10 flex flex-col items-center">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.2 : 1,
                                    backgroundColor: isActive ? "#C5A059" : "#F8F5F0",
                                    borderColor: isActive ? "#C5A059" : "#E5E7EB"
                                }}
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors shadow-sm`}
                            >
                                <Icon size={14} className={isActive ? "text-white" : "text-emerald-royal/30"} />
                            </motion.div>
                            <span className={`absolute -bottom-6 whitespace-nowrap text-[9px] uppercase tracking-widest font-bold ${isActive ? "text-emerald-royal" : "text-emerald-royal/30"}`}>
                                {status.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const token = localStorage.getItem('lily_auth_token');
                const data = await api.getOrders(token);
                setOrders(data || []);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
                setError("Could not retrieve your orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const parseItems = (items) => {
        if (!items) return [];
        if (Array.isArray(items)) return items;
        try {
            return JSON.parse(items);
        } catch (e) {
            return [];
        }
    };

    if (!user) {
        return (
            <main className="bg-muslin-cream min-h-screen">
                <Navbar />
                <div className="pt-40 flex flex-col items-center justify-center text-center px-4">
                    <ShoppingBag size={64} className="text-heritage-gold mb-6 opacity-20" />
                    <h1 className="text-3xl font-serif text-emerald-royal mb-4">Royal History Hidden</h1>
                    <p className="text-emerald-royal/60 mb-8 max-w-md">Please sign in to view your order history and tracking details.</p>
                    <Link
                        href="/login"
                        className="px-10 py-4 bg-emerald-royal text-white uppercase tracking-widest text-xs font-bold hover:bg-heritage-gold transition-all shadow-lg"
                    >
                        Sign In
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-muslin-cream">
            <Navbar />

            <div className="pt-32 md:pt-44 pb-20 px-4 md:px-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center md:text-left"
                >
                    <SectionHeader title="Your Royal Legacy" subtitle="Archive of your bespoke choices" />
                </motion.div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-heritage-gold mb-4" size={40} />
                        <p className="text-emerald-royal font-serif italic text-lg opacity-60">Retrieving your treasures from the vault...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-100 p-8 text-center rounded-sm max-w-2xl mx-auto">
                        <p className="text-red-600 font-medium font-serif italic">{error}</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white border border-heritage-gold/10 p-16 md:p-24 text-center rounded-sm shadow-2xl max-w-3xl mx-auto relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-heritage-gold/5 rounded-bl-full pointer-events-none" />

                        <div className="w-24 h-24 bg-emerald-royal/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-heritage-gold/5">
                            <ShoppingBag size={40} className="text-heritage-gold/40" />
                        </div>
                        <h3 className="font-serif text-3xl text-emerald-royal mb-6 italic">The Archive is Empty</h3>
                        <p className="text-emerald-royal/60 mb-10 max-w-md mx-auto leading-relaxed">Your journey with our legendary looms is just beginning. Your refined selections will appear here.</p>
                        <Link
                            href="/shop"
                            className="inline-block bg-emerald-royal text-white px-12 py-5 text-xs uppercase font-bold tracking-[0.3em] hover:bg-heritage-gold transition-all shadow-xl hover:-translate-y-1"
                        >
                            Explore Collections
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {orders.map((order, idx) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: idx * 0.15, duration: 0.6 }}
                                className="group relative"
                            >
                                {/* Card Glass effect */}
                                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10 rounded-sm shadow-2xl transition-all group-hover:bg-white/60" />

                                <div className="border border-heritage-gold/20 overflow-hidden flex flex-col">
                                    {/* Order Header */}
                                    <div className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-heritage-gold/10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-emerald-royal text-white flex items-center justify-center rounded-full shadow-lg border-4 border-white">
                                                <Package size={24} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-[10px] uppercase font-black tracking-widest text-heritage-gold bg-heritage-gold/10 px-3 py-0.5 rounded-full">
                                                        Order #{order.id.toString().padStart(5, '0')}
                                                    </span>
                                                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-royal/40 flex items-center gap-1">
                                                        <Calendar size={10} />
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <h3 className="font-serif text-2xl text-emerald-royal">Refined Selection</h3>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <div className="text-3xl font-serif text-emerald-royal font-black">
                                                <span className="text-heritage-gold text-lg mr-1 font-bold italic font-sans text-[16px]">৳</span>
                                                {parseFloat(order.total).toLocaleString()}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-emerald-royal/40">
                                                <CreditCard size={12} className="text-heritage-gold" />
                                                {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-12">
                                        {/* Order Items Preview */}
                                        <div className="lg:col-span-8 p-6 md:p-10 space-y-8 bg-white/40">
                                            <div className="flex flex-wrap gap-4">
                                                {parseItems(order.items).map((item, i) => (
                                                    <motion.div
                                                        key={`${order.id}-item-${i}`}
                                                        whileHover={{ scale: 1.05 }}
                                                        className="relative w-24 h-32 md:w-32 md:h-44 group/item"
                                                    >
                                                        <div className="absolute inset-0 bg-heritage-gold/20 -m-1 -z-10 rounded-sm opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                                        <div className="w-full h-full relative overflow-hidden border border-heritage-gold/10 bg-white shadow-md">
                                                            <Image
                                                                src={getOptimizedImage(item.image)}
                                                                alt={item.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="(max-width: 768px) 100px, 150px"
                                                            />
                                                            <div className="absolute inset-0 bg-emerald-royal/20 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-end p-2 pointer-events-none">
                                                                <span className="text-white text-[8px] uppercase tracking-tighter font-bold bg-emerald-royal px-1 py-0.5">
                                                                    Qty: {item.quantity}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap gap-y-4 gap-x-12 pt-6 border-t border-heritage-gold/5">
                                                <div className="flex items-center gap-3">
                                                    <MapPin size={16} className="text-heritage-gold" />
                                                    <div>
                                                        <p className="text-[9px] uppercase font-extrabold tracking-widest text-emerald-royal/30">Delivery Address</p>
                                                        <p className="text-sm font-medium text-emerald-royal/80">{order.address}, {order.city}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Clock size={16} className="text-heritage-gold" />
                                                    <div>
                                                        <p className="text-[9px] uppercase font-extrabold tracking-widest text-emerald-royal/30">Estimated Delivery</p>
                                                        <p className="text-sm font-medium text-emerald-royal/80">3-5 Royal Business Days</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Sidebar */}
                                        <div className="lg:col-span-4 p-6 md:p-10 bg-emerald-royal/5 border-t lg:border-t-0 lg:border-l border-heritage-gold/10 flex flex-col justify-center">
                                            <div className="mb-8">
                                                <p className="text-[10px] uppercase font-black tracking-widest text-emerald-royal/40 mb-2 border-b border-heritage-gold/10 pb-1">Current Status</p>
                                                <StatusTracker currentStatus={order.status} />
                                            </div>

                                            <div className="pt-8 space-y-4">
                                                <button className="w-full py-4 border border-emerald-royal/20 text-emerald-royal uppercase tracking-widest text-[10px] font-black hover:bg-emerald-royal hover:text-white transition-all">
                                                    Track Details
                                                </button>
                                                <button className="w-full py-4 bg-emerald-royal text-white uppercase tracking-widest text-[10px] font-black hover:bg-heritage-gold transition-all shadow-lg">
                                                    Bespoke Support
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
