"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";

import { api } from "@/lib/api";
import Skeleton from "@/components/ui/Skeleton";
import { useLanguage } from "@/context/LanguageContext";

export function FeaturedProducts({ initialProducts = [] }) {
    const { t } = useLanguage();
    const [filter, setFilter] = useState(t("category_all"));
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(initialProducts.length === 0);
    const [isExpanded, setIsExpanded] = useState(false);

    // derive initial categories
    const initialCats = initialProducts.length > 0
        ? [t("category_all"), ...Array.from(new Set(initialProducts.map(p => (p.category && (p.category.name || p.category))).filter(Boolean)))]
        : [t("category_all")];

    const [categories, setCategories] = useState(initialCats);

    React.useEffect(() => {
        if (initialProducts.length > 0) return;

        const loadProducts = async () => {
            const data = await api.getProducts();
            if (data) {
                setProducts(data);

                // derive categories dynamically from products
                const cats = Array.from(new Set(data.map(p => (p.category && (p.category.name || p.category))).filter(Boolean)));
                setCategories([t("category_all"), ...cats]);
            }
            setLoading(false);
        };
        loadProducts();
    }, [initialProducts, t]);

    const filteredProducts =
        filter === t("category_all")
            ? products
            : products.filter((p) => {
                const catName = p.category?.name || p.category;
                return catName === filter;
            });

    const visibleProducts = isExpanded ? filteredProducts : filteredProducts.slice(0, 4);

    return (
        <section id="featured" className="py-16 md:py-24 bg-muslin-cream">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4">
                    <div>
                        <span className="text-heritage-gold text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">
                            {t("featured_tagline")}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif mt-1 text-emerald-royal">
                            {t("featured_heading")}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-full md:w-auto">
                            <div className="flex gap-2 items-center overflow-x-auto no-scrollbar py-1 px-1 w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
                                <div className="flex gap-2" role="tablist" aria-label="Product categories">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => { setFilter(cat); setIsExpanded(false); }}
                                            className={`flex-shrink-0 text-[13px] md:text-[12px] px-3 py-2 rounded-full transition-all whitespace-nowrap ${filter === cat
                                                ? "bg-emerald-royal text-white shadow-sm"
                                                : "bg-white/5 text-emerald-royal/80 hover:bg-white/10"
                                                }`}
                                            role="tab"
                                            aria-selected={filter === cat}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex-shrink-0">
                            <button
                                onClick={() => setIsExpanded(true)}
                                className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-royal text-white text-xs rounded-full hover:bg-heritage-gold transition"
                            >
                                {t("featured_view_all")}
                            </button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2 md:px-0">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-5">
                                <Skeleton className="aspect-[3/4] w-full rounded-2xl shadow-sm" />
                                <div className="space-y-3">
                                    <Skeleton className="h-5 w-2/3" />
                                    <Skeleton className="h-4 w-1/3 opacity-60" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : visibleProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 px-2 md:px-0">
                        {visibleProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} priority={index < 2} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400 italic font-light">
                        {t("featured_empty_message")}
                    </div>
                )}

                {!isExpanded && !loading && filteredProducts.length > 4 && (
                    <div className="text-center mt-12 md:mt-16">
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="w-full md:w-auto px-10 py-3 bg-emerald-royal text-white uppercase tracking-widest text-[10px] md:text-xs hover:bg-heritage-gold transition-all font-bold rounded-full"
                        >
                            {t("featured_view_all")}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
