"use client";

import React from "react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";

export function Toast() {
    const { toast } = useStore();

    const config = {
        success: {
            icon: <CheckCircle className="text-emerald-royal shrink-0" size={24} />,
            title: "Success",
            border: "border-emerald-royal"
        },
        error: {
            icon: <AlertCircle className="text-red-500 shrink-0" size={24} />,
            title: "Wait",
            border: "border-red-500"
        },
        info: {
            icon: <Info className="text-heritage-gold shrink-0" size={24} />,
            title: "Notice",
            border: "border-heritage-gold"
        }
    };

    const current = config[toast.type] || config.success;

    return (
        <AnimatePresence>
            {toast.visible && (
                <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    className={`fixed top-24 right-5 z-[9999] bg-white border-l-4 ${current.border} shadow-2xl p-4 rounded-r flex items-center gap-3 w-80 md:w-96 backdrop-blur-md bg-white/90`}
                >
                    {current.icon}
                    <div className="flex-1 overflow-hidden">
                        <h4 className="font-serif font-black text-emerald-royal text-sm uppercase tracking-widest">{current.title}</h4>
                        <p className="text-[11px] md:text-xs text-emerald-royal/60 font-medium tracking-wide mt-0.5 line-clamp-2 uppercase">
                            {toast.message}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
