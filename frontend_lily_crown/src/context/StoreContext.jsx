"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext(undefined);

export function StoreProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState(new Set());
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [toast, setToast] = useState({ message: "", visible: false });

    // Load from LocalStorage
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("lily_cart");
            const savedWishlist = localStorage.getItem("lily_wishlist");

            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart)) {
                    // Filter valid items and deduplicate by ID (handling string/number mismatch)
                    // Added check for image property to prevent src errors
                    const validItems = parsedCart.filter(item => item && item.id && item.image && item.image.trim() !== "");
                    const uniqueItems = Array.from(new Map(validItems.map(item => [Number(item.id), { ...item, id: Number(item.id) }])).values());

                    setCartItems(uniqueItems);
                }
            }

            if (savedWishlist) {
                const parsedWishlist = JSON.parse(savedWishlist);
                if (Array.isArray(parsedWishlist)) setWishlistItems(new Set(parsedWishlist));
            }
        } catch (error) {
            console.error("Failed to load store data from localStorage:", error);
            // Fallback to defaults (empty) is automatic since state already has them
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem("lily_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("lily_wishlist", JSON.stringify(Array.from(wishlistItems)));
    }, [wishlistItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Ensure price is valid
            const safeProduct = { ...product, price: typeof product.price === 'number' ? product.price : 0, quantity: 1 };
            return [...prev, safeProduct];
        });
        showToast(`${product.name} added to your bag.`);
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const toggleWishlist = (id) => {
        setWishlistItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const showToast = (message) => {
        setToast({ message, visible: true });
        setTimeout(() => {
            setToast({ message: "", visible: false });
        }, 3000);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

    return (
        <StoreContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,
                wishlistItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleWishlist,
                isCartOpen,
                setIsCartOpen,
                isWishlistOpen,
                setIsWishlistOpen,
                isSearchOpen,
                setIsSearchOpen,
                toast,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
}
