"use client";

import React from "react";
import {
    Truck,
    RotateCcw,
    ShieldCheck,
    BadgeCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const ROYAL_FEATURES = [
    {
        id: 1,
        icon: Truck,
        titleKey: "feature_1_title",
        descKey: "feature_1_desc"
    },
    {
        id: 2,
        icon: BadgeCheck,
        titleKey: "feature_5_title",
        descKey: "feature_5_desc"
    },
    {
        id: 3,
        icon: RotateCcw,
        titleKey: "feature_2_title",
        descKey: "feature_2_desc"
    },
    {
        id: 4,
        icon: ShieldCheck,
        titleKey: "feature_3_title",
        descKey: "feature_3_desc"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export function Features() {
    const { t } = useLanguage();
    return (
        <section id="about" className="py-24 md:py-32 bg-emerald-royal relative overflow-hidden">
            {/* Artistic Texture & Overlays */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0 bg-[url('/img/patterns/jamdani-light.png')] bg-repeat opacity-40 scale-125"></div>
            </div>

            {/* Modern Glow Orbs */}
            <div className="absolute -top-40 -left-20 w-96 h-96 bg-heritage-gold/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-black/40 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 mb-4"
                    >
                        <div className="w-8 h-px bg-heritage-gold/40"></div>
                        <span className="text-heritage-gold text-xs font-bold uppercase tracking-[0.5em]">
                            {t("features_promise")}
                        </span>
                        <div className="w-8 h-px bg-heritage-gold/40"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
                    >
                        {t("features_mandate")}
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
                >
                    {ROYAL_FEATURES.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.id}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="group relative p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:bg-white/[0.05] hover:border-heritage-gold/30 transition-all duration-500 shadow-2xl"
                            >
                                <div className="mb-10 relative">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-heritage-gold group-hover:bg-heritage-gold group-hover:text-emerald-royal transition-all duration-500">
                                        <Icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-heritage-gold rounded-full group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-heritage-gold transition-colors duration-300">
                                        {t(feature.titleKey)}
                                    </h3>
                                    <p className="text-muslin-cream/60 text-sm leading-relaxed group-hover:text-muslin-cream/90 transition-colors duration-300">
                                        {t(feature.descKey)}
                                    </p>
                                </div>

                                {/* Modern Accent */}
                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center">
                                    <div className="h-0.5 w-6 bg-heritage-gold group-hover:w-12 transition-all duration-500 rounded-full"></div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
