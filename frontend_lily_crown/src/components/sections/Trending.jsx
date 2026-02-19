"use client";

import React, { useRef, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { api } from "@/lib/api";
import Skeleton from "@/components/ui/Skeleton";

export function Trending() {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const loadTrending = async () => {
            const data = await api.getProducts();
            if (data) {
                setProducts(data.filter(p => p.is_trending));
            }
            setLoading(false);
        };
        loadTrending();
    }, []);

    const scroll = (direction) => {
        if (!scrollRef.current) return;

        const { scrollLeft, clientWidth } = scrollRef.current;
        const scrollTo =
            direction === "left"
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;

        scrollRef.current.scrollTo({
            left: scrollTo,
            behavior: "smooth",
        });
    };

    const handleScroll = () => {
        if (!scrollRef.current) return;

        const card = scrollRef.current.children[0];
        const gap = 16;
        const cardWidth = card.offsetWidth + gap;

        const index = Math.round(
            scrollRef.current.scrollLeft / cardWidth
        );

        setActiveIndex(index);
    };

    return (
        <section className="py-16 md:py-24 bg-muslin-cream/50 border-y border-heritage-gold/5">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-heritage-gold text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">
                            What Everyone Loves
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-emerald-royal mt-2">
                            Most Loved Styles
                        </h2>
                    </motion.div>

                    {/* Desktop arrows */}
                    <div className="hidden md:flex gap-3">
                        <button
                            onClick={() => scroll("left")}
                            className="w-12 h-12 rounded-full border border-heritage-gold/20 flex items-center justify-center hover:bg-emerald-royal hover:text-white text-emerald-royal transition-all bg-white/60"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-12 h-12 rounded-full border border-heritage-gold/20 flex items-center justify-center hover:bg-emerald-royal hover:text-white text-emerald-royal transition-all bg-white/60"
                        >
                            <ChevronRight size={22} />
                        </button>
                    </div>
                </div>

                {/* Slider */}
                {loading ? (
                    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-0 pb-6 overflow-hidden">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-full md:w-[320px] md:flex-shrink-0">
                                <Skeleton className="aspect-[3/4] w-full rounded-2xl shadow-sm" />
                                <div className="space-y-3 mt-4">
                                    <Skeleton className="h-5 w-2/3" />
                                    <Skeleton className="h-4 w-1/3 opacity-60" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex flex-col md:flex-row md:overflow-x-auto gap-6 md:gap-6 scroll-smooth px-4 md:px-0 pb-6"
                        style={{
                            /* hide scrollbar on horizontal layouts */
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className="w-full md:flex-shrink-0 md:w-[320px] max-w-full md:max-w-[320px]"
                            >
                                <ProductCard product={product} index={index} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400 italic font-light">
                        No trending heirlooms at the moment.
                    </div>
                )}

                {/* Desktop arrows are above; no mobile dots for stacked layout */}
            </div>
        </section>
    );
}
