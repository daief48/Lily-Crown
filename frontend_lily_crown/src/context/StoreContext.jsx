"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const StoreContext = createContext(undefined);

export function StoreProvider({ children }) {
    const { t } = useLanguage();
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "success", visible: false });

    // Load from LocalStorage
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("lily_cart");
            const savedWishlist = localStorage.getItem("lily_wishlist");

            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart)) {
                    // Filter valid items and deduplicate by ID using Number()
                    const validItems = parsedCart.filter(item => item && (item.id || item.variantId));
                    const uniqueItems = Array.from(new Map(validItems.map(item => {
                        const id = item.variantId || `${item.id}-any-any`;
                        return [id, { ...item, variantId: id }];
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

    const addToCart = (product, size = null, color = null, quantity = 1) => {
        const productId = Number(product.id);
        const sizeStr = size && typeof size === 'object' ? size.name : size;
        // Create a unique key for the specific variation
        const variantId = `${productId}-${sizeStr || 'any'}-${color?.name || 'any'}`;

        const colorObj = color ? {
            name: color.name,
            hex: color.hex || color.hex_code,
            product_key: color.product_key || null
        } : null;

        setCartItems((prev) => {
            const existing = prev.find((item) => item.variantId === variantId);
            if (existing) {
                return prev.map((item) =>
                    item.variantId === variantId ? { ...item, quantity: item.quantity + quantity } : item
                );
            }

            const safeProduct = {
                ...product,
                id: productId,
                variantId: variantId,
                selectedSize: sizeStr,
                selectedColor: colorObj,
                price: parsePrice(product.price),
                quantity: quantity
            };
            return [...prev, safeProduct];
        });
        showToast(t('product_added_to_bag', { name: product.name }));
    };

    const removeFromCart = (variantId) => {
        setCartItems((prev) => prev.filter((item) => item.variantId !== variantId));
    };

    const updateQuantity = (variantId, delta) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.variantId === variantId) {
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

    const showToast = (message, type = "success") => {
        setToast({ message, type, visible: true });
        setTimeout(() => {
            setToast({ message: "", type: "success", visible: false });
        }, 3000);
    };

    const updateVariant = (oldVariantId, newSize = null, newColor = null) => {
        setCartItems((prev) => {
            const item = prev.find((i) => i.variantId === oldVariantId);
            if (!item) return prev;

            const productId = Number(item.id);
            const sizeStr = newSize && typeof newSize === "object" ? newSize.name : newSize;
            const colorObj = newColor ? {
                name: newColor.name,
                hex: newColor.hex || newColor.hex_code,
                product_key: newColor.product_key || null
            } : null;

            const newVariantId = `${productId}-${sizeStr || "any"}-${colorObj?.name || "any"}`;

            // If it's the same variant, do nothing
            if (newVariantId === oldVariantId) return prev;

            const existingNewVariant = prev.find((i) => i.variantId === newVariantId);

            if (existingNewVariant) {
                // Merge with existing variant and remove old one
                return prev
                    .map((i) => {
                        if (i.variantId === newVariantId) {
                            return { ...i, quantity: i.quantity + item.quantity };
                        }
                        return i;
                    })
                    .filter((i) => i.variantId !== oldVariantId);
            }

            // Update existing item to new variant
            return prev.map((i) =>
                i.variantId === oldVariantId
                    ? {
                        ...i,
                        variantId: newVariantId,
                        selectedSize: sizeStr,
                        selectedColor: colorObj,
                    }
                    : i
            );
        });
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
                updateVariant,
                clearCart,
                toggleWishlist,
                isCartOpen,
                setIsCartOpen,
                isWishlistOpen,
                setIsWishlistOpen,
                isSearchOpen,
                setIsSearchOpen,
                toast,
                showToast,
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
