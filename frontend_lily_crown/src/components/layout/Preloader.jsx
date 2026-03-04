"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { RoyalImage } from "@/components/ui/RoyalImage";

export function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        setMounted(true);

        const hasVisited = sessionStorage.getItem("hasVisited");
        if (hasVisited) {
            setLoading(false);
            return;
        }

        const handleLoad = () => setIsLoaded(true);
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (isLoaded && prev >= 100) return 100;
                if (prev < 90) return prev + 10; // Fill significantly faster
                if (isLoaded) return prev + 25; // Complete quickly when ready
                return prev;
            });
        }, 10); // Run more frequently

        return () => {
            clearInterval(progressInterval);
            window.removeEventListener("load", handleLoad);
        };
    }, [isLoaded]);

    useEffect(() => {
        if (progress >= 100) {
            sessionStorage.setItem("hasVisited", "true");
            const timer = setTimeout(() => setLoading(false), 50);
            return () => clearTimeout(timer);
        }
    }, [progress]);

    const title = "LILY CROWN";

    // Gold Dust Particles
    const particles = Array.from({ length: 20 });

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    key="preloader-overlay"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        filter: "blur(20px)",
                        transition: { duration: 0.5, ease: [0.7, 0, 0.3, 1] }
                    }}
                    className="fixed inset-0 bg-[#050505] z-[99999] flex flex-col justify-center items-center overflow-hidden"
                >
                    {/* Cinematic Background Layers */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-radial-vignette opacity-60"></div>
                        <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-screen"></div>

                        {/* Drifting Gold Dust */}
                        {mounted && particles.map((_, i) => (
                            <motion.div
                                key={`dust-${i}`}
                                initial={{
                                    x: Math.random() * 100 + "%",
                                    y: Math.random() * 100 + "%",
                                    opacity: 0
                                }}
                                animate={{
                                    y: ["-10%", "110%"],
                                    x: ["-5%", "5%"],
                                    opacity: [0, 0.6, 0],
                                    scale: [0, 1.5, 0]
                                }}
                                transition={{
                                    duration: 8 + Math.random() * 12,
                                    repeat: Infinity,
                                    delay: Math.random() * 5,
                                    ease: "linear"
                                }}
                                className="absolute w-[2px] h-[2px] bg-heritage-gold rounded-full blur-[1px]"
                            />
                        ))}
                    </div>

                    <div className="relative z-10 flex flex-col items-center max-w-2xl w-full px-8" ref={containerRef}>
                        {/* Elite Logo Reveal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(15px)" }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-64 h-24 md:w-80 md:h-32 mb-12 flex items-center justify-center"
                        >
                            {/* Inner Aura */}
                            <motion.div
                                animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-x-0 h-1/2 top-1/4 bg-heritage-gold/30 blur-[60px] rounded-full"
                            />

                            <RoyalImage
                                src="/img/logo.png"
                                alt="Lily Crown Logo"
                                fill
                                className="object-contain drop-shadow-[0_4px_30px_rgba(153,101,21,0.3)] mix-blend-lighten"
                                priority
                            />
                        </motion.div>

                        {/* Archival Title Animation */}
                        <div className="relative overflow-hidden mb-6">
                            <motion.h1
                                initial={{ letterSpacing: "1.2em", opacity: 0, filter: "blur(8px)" }}
                                animate={{ letterSpacing: "0.5em", opacity: 1, filter: "blur(0px)" }}
                                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="font-serif text-2xl md:text-3xl lg:text-4xl text-heritage-gold font-medium tracking-[0.5em] whitespace-nowrap text-center"
                            >
                                {title}
                            </motion.h1>
                        </div>

                        {/* Subtle Tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 0.7, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="flex items-center gap-4 mb-20"
                        >
                            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-heritage-gold/50" />
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.8em] text-white/80 font-medium">
                                Elegance Redefined
                            </p>
                            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-heritage-gold/50" />
                        </motion.div>

                        {/* Perimeter Thread Loader with Percentage */}
                        <div className="w-full max-w-sm flex flex-col items-center gap-6">
                            <div className="relative w-full h-[2px] bg-white/5 overflow-hidden rounded-full">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: `${progress - 100}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-heritage-gold to-heritage-gold opacity-100 rounded-full"
                                />
                                {/* Glow Tip */}
                                <motion.div
                                    animate={{ left: `${progress}%` }}
                                    className="absolute top-1/2 -translate-y-1/2 w-16 h-8 bg-heritage-gold/40 blur-xl rounded-full"
                                />
                            </div>

                            {/* Loading Percentage & Status */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <motion.div
                                    className="text-heritage-gold text-lg font-serif font-light tabular-nums"
                                >
                                    {Math.round(progress)}%
                                </motion.div>
                                <motion.p
                                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-[9px] uppercase tracking-[0.4em] text-heritage-gold/60 font-bold"
                                >
                                    Curating The Royal Collection
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Elite Flash Effect on Mount */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.08, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-heritage-gold pointer-events-none z-20 mix-blend-overlay"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
