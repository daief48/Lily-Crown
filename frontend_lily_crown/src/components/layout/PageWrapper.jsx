"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageWrapper({ children, showFooter = true }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-[80px] sm:pt-[90px] lg:pt-[115px]">
                {children}
            </main>
            {showFooter && <Footer />}
        </>
    );
}
