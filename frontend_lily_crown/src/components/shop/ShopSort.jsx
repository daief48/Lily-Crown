"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLanguage } from "@/context/LanguageContext";

const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

export const ShopSort = ({ activeSort, onSortChange, totalItems, onMobileFilterClick }) => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const sortOptions = [
        { value: "newest", label: t('sort_newest') },
        { value: "price_low", label: t('sort_price_low') },
        { value: "price_high", label: t('sort_price_high') },
        { value: "trending", label: t('sort_trending') },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = sortOptions.find(opt => opt.value === activeSort)?.label || t('sort_by');

    return (
        <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Mobile Filter Toggle */}
            <button
                onClick={onMobileFilterClick}
                className="flex sm:hidden items-center justify-center gap-2 flex-1 bg-emerald-royal text-white px-5 py-3 rounded-xl shadow-lg text-[10px] uppercase tracking-wider font-bold active:scale-95 transition-all"
            >
                <SlidersHorizontal size={14} />
                {t('sort_refine')}
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:flex-initial" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full sm:w-60 flex items-center justify-between gap-3 bg-gray-50/50 border border-black/[0.05] px-5 py-3 text-[10px] uppercase tracking-wider font-bold text-emerald-royal hover:bg-white transition-all rounded-xl focus:shadow-sm group"
                >
                    <span className="truncate">{selectedLabel}</span>
                    <ChevronDown size={14} className={cn("transition-transform duration-500 text-heritage-gold", isOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            className="absolute right-0 top-full mt-2 w-full sm:w-60 bg-white border border-black/[0.05] shadow-xl rounded-2xl z-50 py-2 overflow-hidden"
                        >
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onSortChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full text-left px-5 py-3 text-[10px] uppercase tracking-wider font-bold transition-all flex items-center justify-between group",
                                        activeSort === option.value
                                            ? "bg-emerald-royal text-white"
                                            : "text-emerald-royal/60 hover:bg-emerald-royal/5 hover:text-emerald-royal"
                                    )}
                                >
                                    {option.label}
                                    {activeSort === option.value && <div className="w-1 h-1 rounded-full bg-heritage-gold"></div>}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
