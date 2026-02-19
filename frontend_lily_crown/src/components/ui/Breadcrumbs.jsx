"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function Breadcrumbs({ items, className }) {
    return (
        <nav className={cn("flex", className)} aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-emerald-royal/50 hover:text-heritage-gold transition-colors duration-300"
                    >
                        <Home size={12} className="mr-2" />
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <ChevronRight size={14} className="text-heritage-gold/30 mx-1" />
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="ml-1 text-[10px] uppercase tracking-widest font-bold text-emerald-royal/50 hover:text-heritage-gold transition-colors duration-300 md:ml-2"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="ml-1 text-[10px] uppercase tracking-widest font-bold text-emerald-royal md:ml-2">
                                    {item.label}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
