"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Mail, Heart, Sparkles, ChevronUp, ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { api } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
    const { t } = useLanguage();
    const [settings, setSettings] = React.useState({});
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        const loadSettings = async () => {
            const data = await api.getSettings();
            if (data) setSettings(data);
        };
        const loadCategories = async () => {
            const cats = await api.getCategories();
            if (Array.isArray(cats)) setCategories(cats);
        };
        loadSettings();
        loadCategories();
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

    const [showScrollTop, setShowScrollTop] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="relative bg-[#020d08] text-muslin-cream pt-32 pb-12 overflow-hidden border-t border-heritage-gold/10">
            {/* Cinematic Background Layering */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-heritage-gold/30 to-transparent"></div>

                {/* Dynamic Ambient Glows */}
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-48 -right-48 w-[800px] h-[800px] bg-emerald-royal/10 rounded-full blur-[150px]"
                ></motion.div>
                <div className="absolute bottom-0 -left-48 w-[600px] h-[600px] bg-heritage-gold/5 rounded-full blur-[120px]"></div>

                <div className="absolute inset-0 jamdani-pattern opacity-[0.02] scale-150 origin-center rotate-12"></div>
                <div className="absolute inset-0 bg-[url('/img/grain.png')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                {/* Elevated Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-32 relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-royal/30 to-black/40 backdrop-blur-3xl rounded-[3rem] border border-heritage-gold/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]"></div>

                    <div className="relative p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden rounded-[3rem]">
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 animate-luxury-shimmer opacity-10 pointer-events-none"></div>

                        <div className="max-w-xl text-center lg:text-left space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center justify-center lg:justify-start gap-4"
                            >
                                <div className="h-px w-8 bg-heritage-gold/40"></div>
                                <span className="text-heritage-gold text-xs font-bold uppercase tracking-[0.4em]">{t("footer_newsletter_heading") || "Royal Invitation"}</span>
                            </motion.div>

                            <h3 className="text-4xl md:text-6xl font-serif leading-[1.1] tracking-tight">
                                Join the <span className="heritage-gradient-text italic font-light drop-shadow-sm">{t("footer_newsletter_italic") || "Inner Circle"}</span>
                            </h3>

                            <p className="text-muslin-cream/60 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                                {t("footer_newsletter_desc") || "Be honored with the first sightings of our new heritage collections and exclusive invitations."}
                            </p>
                        </div>

                        <form className="w-full lg:max-w-md group/form" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative p-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 group-focus-within/form:border-heritage-gold/50 transition-all duration-500 shadow-inner">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="email"
                                        placeholder={t("footer_newsletter_placeholder") || "Your royal email address"}
                                        className="flex-1 bg-transparent px-8 py-4 text-sm focus:outline-none placeholder:text-muslin-cream/20 text-muslin-cream tracking-wide"
                                        required
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="gold-gradient-bg text-luxury-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-2 group/btn"
                                    >
                                        {t("footer_newsletter_btn") || "Subscribe"}
                                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </motion.button>
                                </div>
                            </div>
                            <p className="mt-6 text-[10px] text-muslin-cream/30 uppercase tracking-[0.3em] text-center lg:text-left font-medium">
                                By joining, you accept our <Link href="/privacy" className="text-heritage-gold hover:text-white transition-colors underline underline-offset-4 decoration-heritage-gold/30">Privacy Mandate</Link>
                            </p>
                        </form>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
                    {/* Brand Identity */}
                    <div className="lg:col-span-4 space-y-10 text-center sm:text-left">
                        <Link href="/" className="inline-block group">
                            <div className="relative h-24 w-48 transition-transform duration-500 group-hover:scale-105">
                                <div className="absolute inset-0 bg-heritage-gold/20 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <Image
                                    src="/img/logo.png"
                                    alt="Lily Crown Palace"
                                    fill
                                    className="object-contain brightness-0 invert"
                                />
                            </div>
                        </Link>

                        <p className="text-muslin-cream/40 text-lg leading-relaxed font-light italic max-w-sm">
                            {t("footer_tagline") || "Honoring the timeless artistry of Dhaka. We weave heritage into modern silhouettes for the contemporary monarchy."}
                        </p>

                        <div className="flex justify-center sm:justify-start gap-4">
                            {[
                                { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
                                { icon: Facebook, href: socialLinks.facebook, label: "Facebook" }
                            ].map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5 }}
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-heritage-gold hover:bg-heritage-gold hover:text-luxury-black transition-all duration-500 group shadow-lg"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-1 hidden lg:block"></div> {/* Spacer */}

                    {[
                        {
                            title: t("footer_boutique") || "Collections",
                            items: categories.map(cat => ({ label: cat.name, href: `/shop?category=${cat.slug}` }))
                        },
                        {
                            title: t("footer_info") || "Palace Info",
                            items: [
                                { label: "Our Story", href: "/about" },
                                { label: "Royal Tales", href: "/blog" },
                                { label: "Contact Us", href: "/contact" },
                                { label: "Vault Tracking", href: "/orders" }
                            ]
                        }
                    ].map((col, idx) => (
                        <div key={idx} className="lg:col-span-2 space-y-10">
                            <h4 className="font-serif text-xl gold-glow-text tracking-wider">{col.title}</h4>
                            <ul className="space-y-5">
                                {col.items.length > 0 ? col.items.map((item, i) => (
                                    <li key={i}>
                                        <Link
                                            href={item.href}
                                            className="text-muslin-cream/40 text-[11px] uppercase tracking-[0.25em] hover:text-heritage-gold transition-all duration-300 flex items-center group/link"
                                        >
                                            <span className="w-0 group-hover/link:w-4 h-px bg-heritage-gold mr-0 group-hover/link:mr-3 transition-all duration-300 opacity-0 group-hover/link:opacity-100"></span>
                                            {item.label}
                                        </Link>
                                    </li>
                                )) : <li className="text-muslin-cream/10 animate-pulse text-[10px] uppercase tracking-widest">Awaiting Proclamation...</li>}
                            </ul>
                        </div>
                    ))}

                    {/* Visit Us Column */}
                    <div className="lg:col-span-3 space-y-10">
                        <h4 className="font-serif text-xl gold-glow-text tracking-wider">{t("footer_visit") || "The Sanctuary"}</h4>
                        <div className="space-y-8">
                            {[
                                { icon: MapPin, text: contactInfo.address, title: t("footer_grand_atrium") },
                                { icon: Phone, text: contactInfo.phone, title: t("footer_royal_line") }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-5 group cursor-default">
                                    <div className="w-12 h-12 rounded-2xl bg-heritage-gold/5 border border-heritage-gold/10 flex items-center justify-center shrink-0 group-hover:bg-heritage-gold group-hover:text-luxury-black transition-all duration-500 shadow-lg">
                                        <item.icon size={20} className="transition-transform group-hover:scale-110" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-[10px] text-heritage-gold/50 font-bold uppercase tracking-[0.2em]">{item.title}</span>
                                        <span className="text-muslin-cream/50 text-sm font-light leading-relaxed group-hover:text-muslin-cream/80 transition-colors">
                                            {item.text}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Hierarchy */}
                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center md:text-left">
                        <div className="space-y-2">
                            <p className="text-muslin-cream/20 text-[10px] uppercase tracking-[0.4em] font-medium">
                                &copy; {new Date().getFullYear()} <span className="text-heritage-gold">Lily Crown Collective</span>
                            </p>
                            <p className="text-heritage-gold/30 text-[9px] uppercase tracking-[0.3em] italic">
                                Dhaka • Heritage Reimagined
                            </p>
                        </div>

                        <div className="flex gap-8">
                            {['privacy', 'terms', 'cookies'].map((link) => (
                                <Link
                                    key={link}
                                    href={`/${link}`}
                                    className="text-muslin-cream/20 text-[10px] uppercase tracking-[0.25em] hover:text-heritage-gold transition-all duration-300 relative group/legal"
                                >
                                    {t(`footer_${link}`)}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-heritage-gold/30 group-hover/legal:w-full transition-all duration-300"></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 px-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full bg-heritage-gold/20 border border-luxury-black flex items-center justify-center">
                                    <Sparkles size={10} className="text-heritage-gold" />
                                </div>
                            ))}
                        </div>
                        <span className="text-muslin-cream/20 text-[9px] uppercase tracking-[0.3em] font-bold">{t('footer_mughal_artisanship')}</span>
                    </div>
                </div>
            </div>

            {/* Back to Top Sanctuary */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        className="fixed bottom-10 right-10 w-14 h-14 rounded-2xl bg-heritage-gold text-luxury-black flex items-center justify-center shadow-[0_0_40px_rgba(197,168,115,0.4)] z-50 group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <ChevronUp size={24} strokeWidth={3} className="relative z-10" />
                    </motion.button>
                )}
            </AnimatePresence>
        </footer>
    );
}
