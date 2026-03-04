"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "@/locales/en";
import bn from "@/locales/bn";

const STORAGE_KEY = "lily_lang";
const translations = { en, bn };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState("en");

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === "bn" || stored === "en") setLang(stored);
        } catch (_) { }
    }, []);

    const toggleLang = () => {
        setLang((prev) => {
            const next = prev === "en" ? "bn" : "en";
            try { localStorage.setItem(STORAGE_KEY, next); } catch (_) { }
            return next;
        });
    };

    const t = (key) => translations[lang]?.[key] ?? translations["en"]?.[key] ?? key;

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
    return ctx;
}
