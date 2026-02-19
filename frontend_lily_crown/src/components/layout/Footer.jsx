"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

import { api } from "@/lib/api";

export function Footer() {
    const [settings, setSettings] = React.useState({});

    React.useEffect(() => {
        const loadSettings = async () => {
            const data = await api.getSettings();
            if (data) setSettings(data);
        };
        loadSettings();
    }, []);

    const socialLinks = {
        instagram: settings.instagram_url || "#",
        facebook: settings.facebook_url || "#",
    };

    const contactInfo = {
        address: settings.site_address || "Gulshan-2, Dhaka, Bangladesh",
        phone: settings.site_phone || "+880 1234 567890",
        email: settings.site_email || "legacy@lilycrown.com",
    };
    return (
        <footer className="relative bg-[#0a2e24] text-white pt-24 pb-12 overflow-hidden">
            {/* Elegant Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,160,82,0.05),transparent_40%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(196,160,82,0.03),transparent_30%)]"></div>

            {/* Subtle Jamdani Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.02] jamdani-pattern pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                {/* Newsletter Section - Premium Glassmorphism */}
                <div className="mb-24 relative">
                    <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/[0.05] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"></div>
                    <div className="relative p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl text-center lg:text-left space-y-4">
                            <h3 className="text-3xl md:text-5xl font-serif text-heritage-gold leading-tight">
                                Join the Royal <span className="italic">Inner Circle</span>
                            </h3>
                            <p className="text-muslin-cream/60 text-lg font-light leading-relaxed">
                                Subscribe to receive exclusive previews of our newest Dhaka heritage collections and private invitations.
                            </p>
                        </div>
                        <form
                            className="w-full lg:max-w-md group"
                            onSubmit={(e) => {
                                e.preventDefault();
                                // Handle subscription
                            }}
                        >
                            <div className="relative flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Your royal email address"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-heritage-gold/50 transition-all placeholder:text-white/20"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="gold-gradient-bg text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-heritage-gold/20 active:scale-95 transition-all whitespace-nowrap"
                                >
                                    Subscribe
                                </button>
                            </div>
                            <p className="mt-4 text-[10px] text-white/20 uppercase tracking-widest text-center lg:text-left">
                                By joining, you agree to our <Link href="/privacy" className="underline hover:text-white transition-colors">Privacy Policy</Link>
                            </p>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-20 mb-24 text-center sm:text-left">
                    <div className="col-span-1 flex flex-col items-center sm:items-start space-y-8">
                        <Link href="/" className="relative h-[80px] w-[140px] md:h-[100px] md:w-[150px] block transform transition-transform hover:scale-105 duration-700">
                            <Image
                                src="/img/logo.png"
                                alt="Lily Crown Dhaka"
                                fill
                                loading="lazy"
                                sizes="(max-width: 768px) 140px, 150px"
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-muslin-cream/50 text-base leading-relaxed max-w-xs font-light tracking-wide">
                            Honoring the timeless artistry of Dhaka. We weave heritage into modern silhouettes for the contemporary monarchy.
                        </p>
                        <div className="flex space-x-5">
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-heritage-gold hover:border-transparent transition-all duration-500 group relative overflow-hidden"
                                aria-label="Follow Lily Crown on Instagram"
                            >
                                <Instagram size={18} className="group-hover:scale-110 transition-transform relative z-10" />
                                <div className="absolute inset-0 bg-heritage-gold scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-full opacity-20"></div>
                            </a>
                            <a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-heritage-gold hover:border-transparent transition-all duration-500 group relative overflow-hidden"
                                aria-label="Follow Lily Crown on Facebook"
                            >
                                <Facebook size={18} className="group-hover:scale-110 transition-transform relative z-10" />
                                <div className="absolute inset-0 bg-heritage-gold scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-full opacity-20"></div>
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-start">
                        <h4 className="font-serif text-xl mb-8 text-heritage-gold tracking-wide">Our Boutique</h4>
                        <ul className="space-y-5 text-muslin-cream/60 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">
                            <li>
                                <Link href="/shop" className="hover:text-heritage-gold transition-colors">
                                    New Collections
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=jamdani" className="hover:text-heritage-gold transition-colors">
                                    Monarch Jamdani
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=muslin" className="hover:text-heritage-gold transition-colors">
                                    Imperial Muslin
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=silk" className="hover:text-heritage-gold transition-colors">
                                    Rajshahi Silk
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h4 className="font-serif text-xl mb-8 text-heritage-gold tracking-wide">Contact Us</h4>
                        <ul className="space-y-5 text-muslin-cream/60 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">
                            <li>
                                <Link href="/contact" className="hover:text-heritage-gold transition-colors">
                                    Message Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping-returns" className="hover:text-heritage-gold transition-colors">
                                    Delivery Info
                                </Link>
                            </li>
                            <li>
                                <Link href="/size-guide" className="hover:text-heritage-gold transition-colors">
                                    Size Helper
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-heritage-gold transition-colors">
                                    Questions?
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h4 className="font-serif text-xl mb-10 text-heritage-gold tracking-wide relative inline-block pb-3">
                            Visit Us
                            <span className="absolute bottom-0 left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 w-8 h-px bg-heritage-gold/40"></span>
                        </h4>
                        <ul className="space-y-8 text-muslin-cream/50 text-sm font-light">
                            <li className="flex items-start justify-center sm:justify-start gap-4 group">
                                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-heritage-gold/30 transition-colors flex-shrink-0 animate-pulse-slow">
                                    <MapPin size={18} className="text-heritage-gold" />
                                </div>
                                <span className="pt-2 leading-relaxed tracking-wide group-hover:text-muslin-cream transition-colors">{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center justify-center sm:justify-start gap-4 group">
                                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-heritage-gold/30 transition-colors flex-shrink-0">
                                    <Phone size={18} className="text-heritage-gold" />
                                </div>
                                <span className="tracking-widest group-hover:text-muslin-cream transition-colors">{contactInfo.phone}</span>
                            </li>
                            <li className="flex items-center justify-center sm:justify-start gap-4 group">
                                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-heritage-gold/30 transition-colors flex-shrink-0">
                                    <Mail size={18} className="text-heritage-gold" />
                                </div>
                                <span className="tracking-wide group-hover:text-muslin-cream transition-colors">{contactInfo.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="border-t border-white/5 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-muslin-cream/20 text-[10px] uppercase tracking-[0.5em] font-bold text-center md:text-left">
                        &copy; {new Date().getFullYear()} Lily Crown Palace • Dhaka. Crafted for the Nawabi Spirit.
                    </p>
                    <div className="flex gap-10 text-white/20 text-[9px] uppercase tracking-widest font-bold">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
