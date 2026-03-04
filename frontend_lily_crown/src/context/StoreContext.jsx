"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext(undefined);

export function StoreProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
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
                    // Filter valid items and deduplicate by ID using Number()
                    const validItems = parsedCart.filter(item => item && item.id);
                    const uniqueItems = Array.from(new Map(validItems.map(item => {
                        const id = Number(item.id);
                        return [id, { ...item, id }];
                    })).values());

                    setCartItems(uniqueItems);
                }
            }

            if (savedWishlist) {
                const parsedWishlist = JSON.parse(savedWishlist);
                if (Array.isArray(parsedWishlist)) {
                    const validItems = parsedWishlist.filter(item => item && item.id);
                    const normalizedItems = validItems.map(item => ({ ...item, id: Number(item.id) }));
                    setWishlistItems(normalizedItems);
                }
            }
        } catch (error) {
            console.error("Failed to load store data from localStorage:", error);
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem("lily_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("lily_wishlist", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const parsePrice = (price) => {
        if (typeof price === 'number') return price;
        if (!price) return 0;
        // Remove currency symbols, commas, and other non-numeric chars except decimal point
        const sanitized = String(price).replace(/[^\d.]/g, '');
        const parsed = parseFloat(sanitized);
        return isNaN(parsed) ? 0 : parsed;
    };

    const addToCart = (product) => {
        const productId = Number(product.id);
        setCartItems((prev) => {
            const existing = prev.find((item) => Number(item.id) === productId);
            if (existing) {
                return prev.map((item) =>
                    Number(item.id) === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            const safeProduct = {
                ...product,
                id: productId,
                price: parsePrice(product.price),
                quantity: 1
            };
            return [...prev, safeProduct];
        });
        showToast(`${product.name} added to your bag.`);
    };

    const removeFromCart = (id) => {
        const productId = Number(id);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== productId));
    };

    const updateQuantity = (id, delta) => {
        const productId = Number(id);
        setCartItems((prev) =>
            prev.map((item) => {
                if (Number(item.id) === productId) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const toggleWishlist = (product) => {
        const productId = Number(product.id);
        setWishlistItems((prev) => {
            const exists = prev.find(item => Number(item.id) === productId);
            if (exists) {
                showToast(`${product.name} removed from wishlist.`);
                return prev.filter(item => Number(item.id) !== productId);
            }
            showToast(`${product.name} saved to your wishlist.`);
            return [...prev, { ...product, id: productId }];
        });
    };

    const clearCart = () => {
        setCartItems([]);
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
                clearCart,
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
