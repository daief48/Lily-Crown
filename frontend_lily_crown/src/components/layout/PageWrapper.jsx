"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageWrapper({ children, showFooter = true }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-[85px] sm:pt-[95px]">
                {children}
            </main>
            {showFooter && <Footer />}
        </>
    );
}
