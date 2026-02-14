"use client";

import React, { useState, useEffect } from "react";
import { Navbar, Footer, SectionHeader } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Shield, Edit2, Check, X, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
            });
        }
    }, [user]);

    const handleUpdate = (e) => {
        e.preventDefault();
        // Simulate update or call API
        console.log("Updating profile:", formData);
        setIsEditing(false);
        // Note: Actual API integration would update the user in AuthContext
    };

    if (!user) {
        return (
            <main className="bg-muslin-cream min-h-screen">
                <Navbar />
                <div className="pt-40 flex flex-col items-center justify-center text-center px-4">
                    <Shield size={64} className="text-heritage-gold mb-6 opacity-20" />
                    <h1 className="text-3xl font-serif text-emerald-royal mb-4">Royal Sanctuary Protected</h1>
                    <p className="text-emerald-royal/60 mb-8 max-w-md">Please sign in to access your private quarters and view your heritage collection.</p>
                    <a
                        href="/login"
                        className="px-10 py-4 bg-emerald-royal text-white uppercase tracking-widest text-xs font-bold hover:bg-heritage-gold transition-all shadow-lg"
                    >
                        Sign In
                    </a>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-muslin-cream">
            <Navbar />

            <div className="pt-32 md:pt-40 pb-20 px-4 md:px-10 max-w-7xl mx-auto">
                <div className="mb-12">
                    <SectionHeader title="Royal Profile" subtitle="Manage your heritage account" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Profile Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-1 bg-white p-8 border border-heritage-gold/20 shadow-xl rounded-sm text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-heritage-gold/5 rounded-bl-[80px]"></div>
                        <div className="w-24 h-24 bg-emerald-royal/5 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-heritage-gold/30">
                            <User size={40} className="text-heritage-gold" />
                        </div>
                        <h2 className="font-serif text-2xl text-emerald-royal mb-2 font-medium">{user.name}</h2>
                        <p className="text-xs uppercase tracking-widest text-emerald-royal/50 mb-8">{user.role || "Distinguished Member"}</p>

                        <div className="space-y-4 text-left border-t border-heritage-gold/10 pt-8">
                            <div className="flex items-center gap-3 text-emerald-royal/70">
                                <Mail size={16} className="text-heritage-gold" />
                                <span className="text-sm">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-emerald-royal/70">
                                <Shield size={16} className="text-heritage-gold" />
                                <span className="text-sm">Account Verified</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Profile Details / Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2 bg-white p-8 md:p-12 border border-heritage-gold/20 shadow-xl rounded-sm"
                    >
                        <div className="flex justify-between items-center mb-10 border-b border-heritage-gold/10 pb-6">
                            <h3 className="font-serif text-2xl text-emerald-royal italic">Personal Details</h3>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-heritage-gold hover:text-emerald-royal transition-colors"
                                >
                                    <Edit2 size={14} /> Edit Profile
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/40">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-muslin-cream/30 border border-heritage-gold/20 p-4 text-sm outline-none focus:border-heritage-gold transition-all"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/40">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full bg-muslin-cream/30 border border-heritage-gold/20 p-4 text-sm outline-none focus:border-heritage-gold transition-all"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 bg-emerald-royal text-white px-8 py-3 text-xs uppercase font-bold tracking-widest hover:bg-heritage-gold transition-all gold-gradient-bg"
                                    >
                                        <Check size={16} /> Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center gap-2 border border-emerald-royal/20 text-emerald-royal px-8 py-3 text-xs uppercase font-bold tracking-widest hover:bg-emerald-royal/5 transition-all"
                                    >
                                        <X size={16} /> Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/40 mb-2">Full Name</p>
                                        <p className="text-base text-emerald-royal font-serif text-lg">{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/40 mb-2">Email Address</p>
                                        <p className="text-base text-emerald-royal font-serif text-lg">{user.email}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/40 mb-2">Default Palace Address</p>
                                        <div className="flex items-center gap-3 text-emerald-royal font-serif text-lg py-2">
                                            <MapPin size={18} className="text-heritage-gold" />
                                            <span className="opacity-50 italic">Not provided yet</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-heritage-gold/5 border border-heritage-gold/10 rounded-sm">
                                    <p className="text-sm text-emerald-royal/70 italic">"As a member of the Lily Crown family, you are part of a legacy that values timeless elegance and artisanal heritage."</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
