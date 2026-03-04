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
        descKey: "feature_1_desc"
    },
    {
        id: 2,
        icon: RotateCcw,
        titleKey: "feature_2_title",
        descKey: "feature_2_desc"
    },
    {
        id: 3,
        icon: ShieldCheck,
        titleKey: "feature_3_title",
        descKey: "feature_3_desc"
    },
    {
        id: 4,
        icon: Headset,
        titleKey: "feature_4_title",
        descKey: "feature_4_desc"
    },
    {
        id: 5,
        icon: BadgeCheck,
        titleKey: "feature_5_title",
        descKey: "feature_5_desc"
    },
    {
        id: 6,
        icon: Gift,
        titleKey: "feature_6_title",
        descKey: "feature_6_desc"
    },
    {
        id: 7,
        icon: Leaf,
        titleKey: "feature_7_title",
        descKey: "feature_7_desc"
    },
    {
        id: 8,
        icon: HeartHandshake,
        titleKey: "feature_8_title",
        descKey: "feature_8_desc"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
};

export function Features() {
    const { t } = useLanguage();
    return (
        <section id="about" className="py-24 md:py-40 bg-gradient-to-b from-emerald-royal to-[#0a2f1f] text-white relative overflow-hidden">
            {/* Background Narrative Elements */}
            <div className="absolute inset-0 opacity-[0.03] jamdani-pattern pointer-events-none scale-150"></div>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>

            {/* Ambient Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-heritage-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-royal/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-20 md:mb-28">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <span className="text-heritage-gold text-xs uppercase tracking-[0.5em] font-bold block mb-4 border-b border-heritage-gold/20 pb-2">{t("features_promise")}</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-serif mt-2 balance"
                    >
                        {t("features_mandate")}
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10"
                >
                    {ROYAL_FEATURES.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.id}
                                variants={itemVariants}
                                whileHover={{
                                    y: -10,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                                className="relative p-6 md:p-8 rounded-3xl group cursor-default"
                            >
                                {/* Card Background with Glassmorphism */}
                                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md rounded-3xl border border-white/10 group-hover:border-heritage-gold/30 group-hover:bg-white/[0.06] transition-all duration-500 shadow-2xl overflow-hidden">
                                    {/* Subtle Glow Trace */}
                                    <div className="absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-heritage-gold/20 to-transparent group-hover:inset-x-full transition-all duration-1000 ease-in-out"></div>
                                </div>

                                <div className="relative z-10 space-y-6">
                                    <div className="relative w-14 h-14 md:w-16 md:h-16 mx-auto">
                                        {/* Icon Container with Floating effect */}
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-full h-full bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-heritage-gold group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl"
                                        >
                                            <Icon size={26} className="text-heritage-gold group-hover:text-white transition-colors" />
                                        </motion.div>

                                        {/* Icon Shadow/Glow */}
                                        <div className="absolute -bottom-2 inset-x-4 h-2 bg-black/20 blur-md rounded-full group-hover:bg-heritage-gold/20 transition-all duration-500"></div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="font-serif text-lg md:text-xl tracking-wide group-hover:text-heritage-gold transition-colors duration-300">
                                            {t(feature.titleKey)}
                                        </h3>
                                        <p className="text-muslin-cream/50 text-[10px] md:text-xs leading-relaxed font-light uppercase tracking-[0.15em] group-hover:text-muslin-cream/80 transition-colors duration-300">
                                            {t(feature.descKey)}
                                        </p>
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
