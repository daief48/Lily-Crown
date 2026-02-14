"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            router.push("/"); // Redirect to home or previous page
        } else {
            setError(result.message || "Invalid credentials");
        }
        setIsLoading(false);
    };

    return (
        <main className="bg-muslin-cream min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
                <div className="w-full max-w-md bg-white p-8 md:p-12 shadow-2xl border border-heritage-gold/10 rounded-sm relative overflow-hidden">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-heritage-gold/5 rounded-bl-[100px]"></div>

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-serif text-emerald-royal mb-2">Royal Entrance</h1>
                        <p className="text-xs uppercase tracking-widest text-emerald-royal/50">Access your private sanctuary</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs text-center rounded-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/50 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-heritage-gold" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-muslin-cream/30 border border-heritage-gold/20 py-3 pl-12 pr-4 focus:border-heritage-gold outline-none transition-all placeholder:text-emerald-royal/20 text-sm"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/50 ml-1">Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-heritage-gold" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-muslin-cream/30 border border-heritage-gold/20 py-3 pl-12 pr-4 focus:border-heritage-gold outline-none transition-all placeholder:text-emerald-royal/20 text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-[10px] text-emerald-royal/60 hover:text-heritage-gold transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-emerald-royal text-white uppercase tracking-[0.2em] font-bold text-xs shadow-lg hover:bg-heritage-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
                        >
                            {isLoading ? "Authenticating..." : "Enter Palace"}
                            {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-heritage-gold/10 text-center">
                        <p className="text-xs text-emerald-royal/60 mb-4">New to Lily Crown?</p>
                        <Link
                            href="/register"
                            className="inline-block px-6 py-2 border border-emerald-royal/20 text-emerald-royal text-[10px] uppercase tracking-widest font-bold hover:bg-emerald-royal hover:text-white transition-all"
                        >
                            Create an Account
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
