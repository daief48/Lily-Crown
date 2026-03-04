"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

import { api } from "@/lib/api";
import { getOptimizedImage } from "@/lib/utils";
import Skeleton from "@/components/ui/Skeleton";
import { RoyalImage } from "@/components/ui/RoyalImage";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
    const { t } = useLanguage();
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSlides = async () => {
            const data = await api.getHeroSlides();
            if (data && data.length > 0) {
                const mappedSlides = data.map(slide => ({
                    ...slide,
                    highlight: slide.highlight || slide.title.split(' ')[0],
                    description: slide.subtitle,
                }));
                setSlides(mappedSlides);
            }
            setLoading(false);
        };
        loadSlides();
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 10000);
        return () => clearInterval(timer);
    }, [slides]);

    if (loading) return (
        <section className="relative min-h-[100dvh] flex items-center pt-20 md:pt-20 pb-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white -z-10"></div>
            <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-6 w-full max-w-xl" />
                        <div className="flex gap-4">
                            <Skeleton className="h-14 w-48" />
                            <Skeleton className="h-14 w-48" />
                        </div>
                    </div>
                    <Skeleton className="w-full h-[600px] rounded-2xl" />
                </div>
            </div>
        </section>
    );

    if (slides.length === 0) return null;

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section
            id="home"
            className="relative min-h-[100dvh] flex items-center pt-32 md:pt-24 pb-16 overflow-hidden"
        >
            {/* Modern Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-emerald-royal/5 -z-10"></div>

            {/* Animated Blur Orbs */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-heritage-gold/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-royal/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative h-full flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch h-full"
                    >
                        {/* Left Content */}
                        <motion.div
                            className="space-y-6 lg:space-y-8"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex items-center gap-2 w-fit"
                            >
                                <div className="w-2 h-2 bg-heritage-gold rounded-full"></div>
                                <span className="text-xs md:text-sm font-semibold text-heritage-gold uppercase tracking-widest">
                                    {slides[currentSlide].subtitle}
                                </span>
                            </motion.div>

                            {/* Main Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-luxury-black"
                            >
                                {slides[currentSlide].title.split(slides[currentSlide].highlight)[0]}
                                <span className="bg-gradient-to-r from-heritage-gold to-emerald-royal bg-clip-text text-transparent">
                                    {slides[currentSlide].highlight}
                                </span>
                                {slides[currentSlide].title.split(slides[currentSlide].highlight)[1]}
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-base md:text-lg text-gray-600 leading-relaxed max-w-lg"
                            >
                                {slides[currentSlide].description}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4 pt-4"
                            >
                                <Link
                                    href={slides[currentSlide].link || "/shop"}
                                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-royal to-emerald-800 text-white font-semibold uppercase tracking-wider text-sm overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {slides[currentSlide].button_text || t("hero_shop_btn")}
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-heritage-gold to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </Link>

                                <Link
                                    href={slides[currentSlide].secondary_link || slides[currentSlide].secondary_button_link || "/about"}
                                    className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-luxury-black text-luxury-black font-semibold uppercase tracking-wider text-sm rounded-lg transition-all duration-300 hover:bg-luxury-black hover:text-white"
                                >
                                    {slides[currentSlide].secondary_button_text || t("hero_story_btn")}
                                </Link>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="hidden md:grid grid-cols-2 gap-8 pt-8 border-t border-gray-200"
                            >
                                <div>
                                    <p className="text-3xl font-bold text-luxury-black">500+</p>
                                    <p className="text-sm text-gray-600 mt-1 uppercase tracking-wide">{t("hero_royal_items")}</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-luxury-black">24K+</p>
                                    <p className="text-sm text-gray-600 mt-1 uppercase tracking-wide">{t("hero_happy_hearts")}</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Image Section */}
                        <motion.div
                            className="relative flex items-center justify-center"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Main Image Container */}
                            <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] mx-auto">
                                <motion.div
                                    className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <RoyalImage
                                        src={getOptimizedImage(slides[currentSlide].image)}
                                        alt={slides[currentSlide].title}
                                        fill
                                        className="object-contain"
                                        priority={currentSlide === 0}
                                        fetchPriority={currentSlide === 0 ? "high" : "low"}
                                        quality={90}
                                        loading={currentSlide === 0 ? "eager" : "lazy"}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-royal/20 via-transparent to-transparent group-hover:from-emerald-royal/10 transition-all duration-300"></div>
                                </motion.div>

                                {/* Premium Badge */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                    className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-gradient-to-r from-heritage-gold to-emerald-600 text-white p-4 md:p-6 rounded-full shadow-2xl"
                                >
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={18} className="animate-pulse" />
                                        <span className="font-bold text-sm md:text-base">{t("hero_premium_badge")}</span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Hidden Prefetch for Next Slide */}
                {slides.length > 1 && (
                    <div className="hidden" aria-hidden="true">
                        <Image
                            src={getOptimizedImage(slides[(currentSlide + 1) % slides.length].image)}
                            alt="prefetch"
                            width={10}
                            height={10}
                            priority={false}
                        />
                    </div>
                )}

                {/* Slide Navigation Dots */}
                <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                    {slides.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`transition-all duration-300 rounded-full ${index === currentSlide
                                ? "bg-luxury-black w-8 h-2"
                                : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
                                }`}
                            whileHover={{ scale: 1.2 }}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={index === currentSlide ? "true" : "false"}
                        />
                    ))}
                </div>
            </div>

            {/* Next/Prev Navigation Buttons - Outside constrained container for wider placement */}
            <div className="hidden xl:flex absolute inset-y-0 left-8 right-8 items-center justify-between pointer-events-none">
                <motion.button
                    onClick={prevSlide}
                    className="pointer-events-auto p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-luxury-black hover:bg-emerald-royal hover:text-white transition-all shadow-xl group"
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                    onClick={nextSlide}
                    className="pointer-events-auto p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-luxury-black hover:bg-emerald-royal hover:text-white transition-all shadow-xl group"
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Next slide"
                >
                    <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </div>

            {/* Tablet/Mobile specific navigation (keep within bounds or hidden) */}
            <div className="hidden md:flex xl:hidden absolute inset-y-0 left-4 right-4 items-center justify-between pointer-events-none">
                <motion.button
                    onClick={prevSlide}
                    className="pointer-events-auto p-2 rounded-full bg-white/40 backdrop-blur-md text-luxury-black shadow-lg"
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft size={20} />
                </motion.button>
                <motion.button
                    onClick={nextSlide}
                    className="pointer-events-auto p-2 rounded-full bg-white/40 backdrop-blur-md text-luxury-black shadow-lg"
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight size={20} />
                </motion.button>
            </div>
        </section>
    );
}
