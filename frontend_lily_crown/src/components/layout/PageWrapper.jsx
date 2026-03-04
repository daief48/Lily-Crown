"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageWrapper({ children, showFooter = true }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-[60px] sm:pt-[70px]">
                {children}
            </main>
            {showFooter && <Footer />}
        </>
    );
}
