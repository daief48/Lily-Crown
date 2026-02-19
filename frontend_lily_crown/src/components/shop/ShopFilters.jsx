"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { ChevronRight, Filter, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

export const ShopFilters = ({ activeFilters, onFilterChange, onClearAll, className, isMobile, disableScroll }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await api.getCategories();
            if (data) setCategories(data);
            setLoading(false);
        };
        loadCategories();
    }, []);

    const priceRanges = [
        { label: "Under ৳500", min: 0, max: 500 },
        { label: "৳500 - ৳2000", min: 500, max: 2000 },
        { label: "৳2000 - ৳5000", min: 2000, max: 5000 },
        { label: "Over ৳5000", min: 5000, max: 999999 },
    ];

    return (
        <aside className={cn(
            "space-y-6 custom-scrollbar",
            !isMobile && "sticky top-32 max-h-[calc(100vh-160px)] overflow-y-auto pr-4",
            isMobile && "pr-0",
            className
        )}>
            {/* Active Filters Summary */}
            {(activeFilters.category || activeFilters.min_price || activeFilters.max_price || activeFilters.search || activeFilters.in_stock || activeFilters.is_ready_to_ship) && (
                <div className="bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-heritage-gold/20 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-royal/60">Refined By</span>
                        <button
                            onClick={onClearAll}
                            className="text-[10px] text-heritage-gold hover:text-emerald-royal font-bold transition-colors"
                        >
                            RESET
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {activeFilters.search && (
                            <div className="bg-heritage-gold text-white px-3 py-1.5 rounded-full text-[10px] flex items-center gap-2 shadow-sm font-medium">
                                "{activeFilters.search}"
                                <button onClick={() => onFilterChange({ search: null })} className="hover:scale-110 transition-transform"><X size={10} /></button>
                            </div>
                        )}
                        {activeFilters.category && (
                            <div className="bg-emerald-royal text-white px-3 py-1.5 rounded-full text-[10px] flex items-center gap-2 shadow-sm">
                                {categories.find(c => c.slug === activeFilters.category)?.name || activeFilters.category}
                                <button onClick={() => onFilterChange({ category: null })} className="hover:scale-110 transition-transform"><X size={10} /></button>
                            </div>
                        )}
                        {(activeFilters.min_price || activeFilters.max_price) && (
                            <div className="bg-white text-emerald-royal border border-heritage-gold/20 px-3 py-1.5 rounded-full text-[10px] flex items-center gap-2 shadow-sm font-medium">
                                ৳{activeFilters.min_price || 0} - {activeFilters.max_price ? `৳${activeFilters.max_price}` : "Max"}
                                <button onClick={() => onFilterChange({ min_price: null, max_price: null })} className="hover:scale-110 transition-transform text-heritage-gold"><X size={10} /></button>
                            </div>
                        )}
                        {activeFilters.in_stock && (
                            <div className="bg-emerald-royal/10 text-emerald-royal px-3 py-1.5 rounded-full text-[10px] flex items-center gap-2 border border-emerald-royal/20">
                                In Stock
                                <button onClick={() => onFilterChange({ in_stock: false })} className="hover:scale-110 transition-transform"><X size={10} /></button>
                            </div>
                        )}
                        {activeFilters.is_ready_to_ship && (
                            <div className="bg-heritage-gold/10 text-heritage-gold px-3 py-1.5 rounded-full text-[10px] flex items-center gap-2 border border-heritage-gold/20">
                                Ready To Ship
                                <button onClick={() => onFilterChange({ is_ready_to_ship: false })} className="hover:scale-110 transition-transform"><X size={10} /></button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Categories Section */}
            <div className="bg-white border border-heritage-gold/10 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-emerald-royal/5 px-5 py-3 border-b border-heritage-gold/5 flex items-center justify-between">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-royal">
                        Collections
                    </h3>
                    <div className="w-1.5 h-1.5 rounded-full bg-heritage-gold"></div>
                </div>
                <div className="p-2">
                    <ul className="space-y-1">
                        <li>
                            <button
                                onClick={() => onFilterChange({ category: null })}
                                className={cn(
                                    "w-full text-left text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-between group",
                                    !activeFilters.category
                                        ? "bg-emerald-royal text-white shadow-lg shadow-emerald-royal/10"
                                        : "text-emerald-royal/70 hover:bg-emerald-royal/5"
                                )}
                            >
                                <span className="font-medium">All Collections</span>
                                <ChevronRight size={12} className={cn("transition-transform", !activeFilters.category ? "translate-x-1" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0")} />
                            </button>
                        </li>
                        {loading ? (
                            [1, 2, 3, 4].map(i => (
                                <li key={i} className="px-3 py-2">
                                    <div className="h-6 bg-emerald-royal/5 animate-pulse rounded-lg w-full"></div>
                                </li>
                            ))
                        ) : (
                            categories.map((cat) => (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => onFilterChange({ category: cat.slug })}
                                        className={cn(
                                            "w-full text-left text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-between group",
                                            activeFilters.category === cat.slug
                                                ? "bg-emerald-royal text-white shadow-lg shadow-emerald-royal/10"
                                                : "text-emerald-royal/70 hover:bg-emerald-royal/5"
                                        )}
                                    >
                                        <span className="font-medium">{cat.name}</span>
                                        <ChevronRight size={12} className={cn("transition-transform", activeFilters.category === cat.slug ? "translate-x-1" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0")} />
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            {/* Availability Filter (New) */}
            <div className="bg-white border border-heritage-gold/10 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-emerald-royal/5 px-5 py-3 border-b border-heritage-gold/5">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-royal">
                        Availability
                    </h3>
                </div>
                <div className="p-4 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-heritage-gold/20 text-emerald-royal focus:ring-emerald-royal"
                            checked={activeFilters.in_stock || false}
                            onChange={(e) => onFilterChange({ in_stock: e.target.checked })}
                        />
                        <span className="text-xs text-emerald-royal/70 group-hover:text-emerald-royal transition-colors font-medium">In Stock Only</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-heritage-gold/20 text-emerald-royal focus:ring-emerald-royal"
                            checked={activeFilters.is_ready_to_ship || false}
                            onChange={(e) => onFilterChange({ is_ready_to_ship: e.target.checked })}
                        />
                        <span className="text-xs text-emerald-royal/70 group-hover:text-emerald-royal transition-colors font-medium">Ready to Ship</span>
                    </label>
                </div>
            </div>

            {/* Price Filter Section */}
            <div className="bg-white border border-heritage-gold/10 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-emerald-royal/5 px-5 py-3 border-b border-heritage-gold/5 flex items-center justify-between">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-royal">
                        Value Selection
                    </h3>
                </div>
                <div className="p-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {priceRanges.map((range, idx) => (
                            <button
                                key={idx}
                                onClick={() => onFilterChange({ min_price: range.min, max_price: range.max })}
                                className={cn(
                                    "text-left text-[10px] py-2 px-3 rounded-lg transition-all border font-bold tracking-tight shrink-0",
                                    activeFilters.min_price === range.min && activeFilters.max_price === range.max
                                        ? "bg-heritage-gold text-white border-heritage-gold"
                                        : "border-heritage-gold/10 text-emerald-royal/60 hover:bg-emerald-royal/5"
                                )}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] text-heritage-gold font-bold">৳</span>
                            <input
                                type="number"
                                placeholder="Min"
                                value={activeFilters.min_price || ""}
                                onChange={(e) => onFilterChange({ min_price: e.target.value })}
                                className="w-full bg-emerald-royal/[0.02] border border-heritage-gold/10 text-[11px] py-2 pl-5 pr-1 outline-none focus:border-heritage-gold/40 rounded-lg transition-all"
                            />
                        </div>
                        <span className="text-heritage-gold/20">-</span>
                        <div className="relative flex-1">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] text-heritage-gold font-bold">৳</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={activeFilters.max_price || ""}
                                onChange={(e) => onFilterChange({ max_price: e.target.value })}
                                className="w-full bg-emerald-royal/[0.02] border border-heritage-gold/10 text-[11px] py-2 pl-5 pr-1 outline-none focus:border-heritage-gold/40 rounded-lg transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-emerald-royal p-5 rounded-2xl text-white shadow-xl shadow-emerald-royal/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>

                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-4 relative z-10">
                    Nawabi Choice
                </h3>
                <div className="space-y-3 relative z-10">
                    <button
                        onClick={() => onFilterChange({ sort: activeFilters.sort === 'trending' ? 'newest' : 'trending' })}
                        className="w-full flex items-center justify-between group/btn cursor-pointer"
                    >
                        <span className={cn(
                            "text-xs font-bold tracking-tight transition-colors",
                            activeFilters.sort === 'trending' ? "text-white" : "text-white/60"
                        )}>Trending Artifacts</span>
                        <div className={cn(
                            "w-4 h-4 rounded border flex items-center justify-center transition-all",
                            activeFilters.sort === 'trending' ? "bg-heritage-gold border-heritage-gold" : "border-white/20"
                        )}>
                            {activeFilters.sort === 'trending' && <Filter size={8} className="text-white" />}
                        </div>
                    </button>
                    <div className="h-px bg-white/10 w-full"></div>
                    <p className="text-[9px] text-white/40 font-medium italic">Handpicked by royal connoisseurs.</p>
                </div>
            </div>
        </aside>
    );
};
