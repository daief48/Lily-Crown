"use client";

import React from "react";
import {
    Truck,
    RotateCcw,
    ShieldCheck,
    Headset,
    BadgeCheck,
    Gift,
    Leaf,
    HeartHandshake
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const ROYAL_FEATURES = [
    {
        id: 1,
        icon: Truck,
        titleKey: "feature_1_title",
        descKey: "feature_1_desc",
        color: "heritage-gold"
    },
    {
        id: 2,
        icon: BadgeCheck,
        titleKey: "feature_5_title",
        descKey: "feature_5_desc",
        color: "emerald-royal"
    },
    {
        id: 3,
        icon: RotateCcw,
        titleKey: "feature_2_title",
        descKey: "feature_2_desc",
        color: "heritage-gold"
    },
    {
        id: 4,
        icon: ShieldCheck,
        titleKey: "feature_3_title",
        descKey: "feature_3_desc",
        color: "emerald-royal"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 15,
            mass: 1
        }
    }
};

export function Features() {
    const { t } = useLanguage();
    return (
        <section id="about" className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
            {/* Ambient Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-heritage-gold/20 to-transparent"></div>
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-heritage-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-royal/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 mb-4"
                    >
                        <div className="w-12 h-px bg-heritage-gold/30"></div>
                        <span className="text-heritage-gold text-xs font-bold uppercase tracking-[0.4em]">{t("features_promise")}</span>
                        <div className="w-12 h-px bg-heritage-gold/30"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-luxury-black mb-6"
                    >
                        {t("features_mandate")}
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                    {ROYAL_FEATURES.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.id}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="relative group p-8 rounded-2xl bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden"
                            >
                                {/* Polish Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-heritage-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10">
                                    {/* Icon with Royal Badge Styling */}
                                    <div className="mb-8 relative w-fit">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-luxury-black group-hover:bg-emerald-royal group-hover:text-white transition-all duration-500 transform group-hover:shadow-xl group-hover:rotate-6">
                                            <Icon size={24} strokeWidth={1.5} />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-heritage-gold border-4 border-white transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-luxury-black group-hover:text-emerald-royal transition-colors duration-300">
                                            {t(feature.titleKey)}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                            {t(feature.descKey)}
                                        </p>
                                    </div>

                                    {/* Bottom Accent Decor */}
                                    <div className="mt-8 pt-6 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-heritage-gold uppercase tracking-widest">Premium Care</span>
                                        <div className="w-1 h-1 rounded-full bg-heritage-gold"></div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
