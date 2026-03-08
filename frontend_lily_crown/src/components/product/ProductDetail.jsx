"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, ChevronLeft, ChevronRight, Star, ShieldCheck, Truck, RefreshCw, X, ZoomIn, CreditCard, Plus, Minus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { getOptimizedImage } from "@/lib/utils";
import { RoyalImage } from "@/components/ui/RoyalImage";

export function ProductDetail({ product }) {
    const { addToCart, toggleWishlist, wishlistItems, showToast } = useStore();
    const { t } = useLanguage();
    const router = useRouter();

    // Diagnostic log for variations
    console.log("Product data received:", product);
    const [activeImage, setActiveImage] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selections, setSelections] = useState([]);
    const [mainQuantity, setMainQuantity] = useState(1);
    const [validationError, setValidationError] = useState({ size: false, color: false });

    const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
    const hasColors = Array.isArray(product.colors) && product.colors.length > 0;
    const isMultiVariant = hasSizes && hasColors;

    // Auto-add selection based on available variation types
    useEffect(() => {
        const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
        const hasColors = Array.isArray(product.colors) && product.colors.length > 0;

        // If no variations exist, we don't auto-add to tray (user uses main buttons)
        if (!hasSizes && !hasColors) return;

        const isSizePicked = hasSizes ? !!selectedSize : true;
        const isColorPicked = hasColors ? !!selectedColor : true;
        const selectionComplete = isSizePicked && isColorPicked;

        const atLeastOneManualChoice = (hasSizes && !!selectedSize) || (hasColors && !!selectedColor);

        if (selectionComplete && atLeastOneManualChoice) {
            // Check if this combination already exists
            const existingIdx = selections.findIndex(s =>
                (hasSizes ? s.size === selectedSize : true) &&
                (hasColors ? s.color?.name === selectedColor?.name : true)
            );

            if (existingIdx === -1) {
                const newSelection = {
                    id: `${Date.now()}-${selectedSize || 'none'}-${selectedColor?.name || 'none'}`,
                    size: hasSizes ? selectedSize : null,
                    color: hasColors ? selectedColor : null,
                    quantity: 1,
                    price: product.price
                };
                setSelections(prev => [...prev, newSelection]);
                showToast(t('product_added_to_list', { quantity: 1 }));
            }

            // Reset local selection to allow picking again
            const timer = setTimeout(() => {
                setSelectedSize(null);
                setSelectedColor(null);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [selectedSize, selectedColor, product, selections, t]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isLightboxOpen]);

    const isWishlisted = wishlistItems.some(item => Number(item.id) === Number(product.id));

    if (!product) return null;

    // Ensure gallery is always an array, fallback to primary image
    const safeGallery = (Array.isArray(product.gallery) && product.gallery.length > 0)
        ? product.gallery
        : [product.image].filter(Boolean);

    const nextImage = () => setActiveImage((prev) => (prev + 1) % safeGallery.length);
    const prevImage = () => setActiveImage((prev) => (prev - 1 + safeGallery.length) % safeGallery.length);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;
        setMousePos({ x, y });
    };

    const updateSelectionQuantity = (selectionId, delta) => {
        setSelections(prev => prev.map(s => {
            if (s.id === selectionId) {
                return { ...s, quantity: Math.max(1, s.quantity + delta) };
            }
            return s;
        }));
    };

    const removeSelection = (selectionId) => {
        setSelections(prev => prev.filter(s => s.id !== selectionId));
    };

    const handleAddToCart = (redirect = false) => {
        if (selections.length === 0) {
            // Fallback: If nothing in list, but something selected, add it directly
            const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
            const hasColors = Array.isArray(product.colors) && product.colors.length > 0;

            let hasError = false;
            const newError = { size: false, color: false };

            if (hasSizes && !selectedSize) {
                newError.size = true;
                hasError = true;
            }

            if (hasColors && !selectedColor) {
                newError.color = true;
                hasError = true;
            }

            if (hasError) {
                setValidationError(newError);
                if (newError.size && newError.color) {
                    showToast(t('product_error_select_variation'));
                } else if (newError.size) {
                    showToast(t('product_error_select_size'));
                } else {
                    showToast(t('product_error_select_color'));
                }
                return;
            }

            // Clear errors
            setValidationError({ size: false, color: false });

            // If a single selection is currently active but not yet in tray, add it directly
            // For simple products, use the mainQuantity state
            const qty = (hasSizes || hasColors) ? 1 : mainQuantity;
            addToCart(product, hasSizes ? selectedSize : null, hasColors ? selectedColor : null, qty);
        } else {
            // Add all items from selection list
            selections.forEach(sel => {
                addToCart(product, sel.size, sel.color, sel.quantity);
            });
            setSelections([]);
        }

        if (redirect) router.push('/cart');
    };

    return (
        <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-muslin-cream">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">

                    {/* Left: Image Gallery */}
                    <div className="space-y-4 w-full">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl nakshi-border group">
                            <div
                                className="h-full w-full cursor-zoom-in relative overflow-hidden"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                onClick={() => {
                                    console.log("Image clicked, opening lightbox");
                                    setIsLightboxOpen(true);
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeImage}
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: isHovering ? 2 : 1,
                                            x: isHovering ? `${50 - mousePos.x}%` : 0,
                                            y: isHovering ? `${50 - mousePos.y}%` : 0,
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            opacity: { duration: 0.5 },
                                            scale: { type: "tween", ease: "easeOut", duration: 0.2 },
                                            x: { type: "tween", ease: "easeOut", duration: 0.2 },
                                            y: { type: "tween", ease: "easeOut", duration: 0.2 }
                                        }}
                                        className="h-full w-full"
                                    >
                                        <RoyalImage
                                            src={getOptimizedImage(safeGallery[activeImage])}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Zoom Hint Icon */}
                                {!isHovering && (
                                    <div className="absolute bottom-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-emerald-royal shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ZoomIn size={20} />
                                    </div>
                                )}
                            </div>

                            {/* Navigation Arrows - Optimized for Touch */}
                            <button
                                onClick={prevImage}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all z-10 hover:bg-white text-emerald-royal"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all z-10 hover:bg-white text-emerald-royal"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 no-scrollbar px-1">
                            {safeGallery.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative w-16 md:w-24 aspect-[3/4] rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${activeImage === idx ? "border-heritage-gold scale-95 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <RoyalImage src={getOptimizedImage(img)} alt={`Thumbnail ${idx}`} fill sizes="100px" className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="space-y-6 md:space-y-10 px-2 lg:px-0">


                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-heritage-gold text-xs md:text-sm uppercase tracking-[0.3em] font-black">
                                    {product.category?.name || (typeof product.category === 'string' ? product.category : '')}
                                </span>
                                {product.badge && (
                                    <>
                                        <div className="w-1 h-1 rounded-full bg-heritage-gold/30"></div>
                                        <span className="bg-heritage-gold text-white text-[9px] md:text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-widest shadow-sm">
                                            {product.badge}
                                        </span>
                                    </>
                                )}
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-emerald-royal leading-[0.9] tracking-tighter">
                                {product.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6">
                                <p className="text-3xl md:text-4xl text-emerald-royal font-bold">৳{product.price}</p>
                                <div className="flex items-center gap-1 text-heritage-gold pl-6 border-l border-heritage-gold/20">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-current" />
                                    ))}
                                    <span className="text-emerald-royal/60 text-xs md:text-sm ml-2 font-black uppercase tracking-widest">{t('product_royal_reviews')}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-600 leading-relaxed font-normal text-lg md:text-xl max-w-xl"
                        >
                            {product.description}
                        </motion.p>

                        {/* Selections Table - Moved up for better visibility */}
                        <AnimatePresence>
                            {selections.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="bg-emerald-royal/5 rounded-2xl p-6 border border-heritage-gold/20 overflow-hidden mb-8 shadow-sm"
                                >
                                    <h5 className="font-serif text-xl text-emerald-royal mb-4 flex items-center gap-3">
                                        <ShoppingBag size={20} className="text-heritage-gold" />
                                        {t('product_current_selections')}
                                    </h5>
                                    <div className="space-y-3">
                                        {selections.map((sel) => (
                                            <motion.div
                                                layout
                                                key={sel.id}
                                                className="flex items-center justify-between bg-white/50 backdrop-blur-sm p-3 rounded-lg border border-heritage-gold/10"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded-full border border-black/5" style={{ backgroundColor: sel.color?.hex || sel.color?.hex_code }}></div>
                                                    <div>
                                                        <p className="text-xs font-black text-emerald-royal uppercase tracking-widest">
                                                            {isMultiVariant
                                                                ? `${sel.size} / ${sel.color?.name}`
                                                                : (sel.size ? `${t('cart_size')}: ${sel.size}` : `${t('cart_color')}: ${sel.color?.name}`)
                                                            }
                                                        </p>
                                                        <p className="text-[11px] md:text-xs text-emerald-royal/60 font-black uppercase tracking-widest">
                                                            {t('product_qty_label')}: {sel.quantity} × ৳{sel.price}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center bg-emerald-royal/5 border border-emerald-royal/10 rounded-full p-0.5">
                                                        <button
                                                            onClick={() => updateSelectionQuantity(sel.id, -1)}
                                                            className="w-7 h-7 flex items-center justify-center text-emerald-royal hover:bg-emerald-royal/10 rounded-full transition-colors"
                                                        >
                                                            <Minus size={10} />
                                                        </button>
                                                        <span className="w-6 text-center text-[10px] font-black text-emerald-royal">{sel.quantity}</span>
                                                        <button
                                                            onClick={() => updateSelectionQuantity(sel.id, 1)}
                                                            className="w-7 h-7 flex items-center justify-center text-emerald-royal hover:bg-emerald-royal/10 rounded-full transition-colors"
                                                        >
                                                            <Plus size={10} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeSelection(sel.id)}
                                                        className="p-2 text-emerald-royal/30 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-heritage-gold/10 flex justify-between items-center px-1">
                                        <span className="text-xs uppercase tracking-[0.2em] font-black text-emerald-royal/40">{t('product_selection_total_label')}</span>
                                        <span className="text-lg font-black text-emerald-royal">
                                            ৳{selections.reduce((acc, s) => acc + (s.price * s.quantity), 0).toLocaleString()}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Simple Product Quantity - Only shown if no variations */}
                        {!(Array.isArray(product.sizes) && product.sizes.length > 0) && !(Array.isArray(product.colors) && product.colors.length > 0) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-6 py-6 border-y border-heritage-gold/10"
                            >
                                <span className="text-xs uppercase tracking-[0.3em] font-black text-emerald-royal/60">
                                    {t('product_quantity')}
                                </span>
                                <div className="flex items-center bg-white border border-emerald-royal/10 rounded-2xl p-1 shadow-sm">
                                    <button
                                        onClick={() => setMainQuantity(q => Math.max(1, q - 1))}
                                        className="w-12 h-12 flex items-center justify-center text-emerald-royal hover:bg-emerald-royal/5 rounded-xl transition-all"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-12 text-center text-lg font-black text-emerald-royal">
                                        {mainQuantity}
                                    </span>
                                    <button
                                        onClick={() => setMainQuantity(q => q + 1)}
                                        className="w-12 h-12 flex items-center justify-center text-emerald-royal hover:bg-emerald-royal/5 rounded-xl transition-all"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Sophisticated Variation Selection */}
                        {(hasSizes || hasColors) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-12 py-4"
                            >
                                {/* Size Choice */}
                                {hasSizes && (
                                    <motion.div
                                        animate={validationError.size ? { x: [-4, 4, -4, 4, 0] } : {}}
                                        transition={{ duration: 0.4 }}
                                        className={`space-y-6 p-4 rounded-2xl transition-colors duration-500 ${validationError.size ? 'bg-red-50/50 ring-1 ring-red-500/20' : ''}`}
                                    >
                                        <div className="flex items-center justify-between border-b border-emerald-royal/10 pb-4">
                                            <div className="flex flex-col gap-1.5">
                                                <h4 className={`text-xs md:text-sm uppercase tracking-[0.4em] font-black transition-colors ${validationError.size ? 'text-red-500' : 'text-emerald-royal/60'}`}>
                                                    {isMultiVariant ? t('product_step_size') : t('product_choose_size')}
                                                </h4>
                                                <p className="text-[11px] md:text-[13px] text-heritage-gold/80 font-medium uppercase tracking-widest">{t('product_size_guide_tip')}</p>
                                            </div>
                                            {selectedSize && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="text-xs font-black text-heritage-gold uppercase tracking-[0.2em] bg-heritage-gold/5 px-3 py-1 rounded-full"
                                                >
                                                    {selectedSize}
                                                </motion.span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-4 pt-4">
                                            {product.sizes.map((size) => {
                                                const sizeName = typeof size === 'object' ? size.name : size;
                                                return (
                                                    <button
                                                        key={sizeName}
                                                        onClick={() => {
                                                            setSelectedSize(selectedSize === sizeName ? null : sizeName);
                                                            if (validationError.size) setValidationError(prev => ({ ...prev, size: false }));
                                                        }}
                                                        className={`h-14 px-8 rounded-2xl text-[13px] md:text-[14px] font-black uppercase tracking-[0.25em] transition-all duration-500 ${selectedSize === sizeName
                                                            ? 'bg-emerald-royal text-white shadow-[0_15px_35px_-10px_rgba(6,78,59,0.4)] scale-110 z-10'
                                                            : 'bg-white/80 border border-emerald-royal/10 text-emerald-royal/70 hover:border-emerald-royal hover:text-emerald-royal hover:bg-white hover:shadow-xl'
                                                            }`}
                                                    >
                                                        {sizeName}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Color Selection */}
                                {hasColors && (
                                    <motion.div
                                        animate={validationError.color ? { x: [-4, 4, -4, 4, 0] } : {}}
                                        transition={{ duration: 0.4 }}
                                        className={`space-y-6 p-4 rounded-2xl transition-colors duration-500 ${validationError.color ? 'bg-red-50/50 ring-1 ring-red-500/20' : ''}`}
                                    >
                                        <div className="flex items-center justify-between border-b border-emerald-royal/10 pb-4">
                                            <div className="flex flex-col gap-1.5">
                                                <h4 className={`text-xs md:text-sm uppercase tracking-[0.4em] font-black transition-colors ${validationError.color ? 'text-red-500' : 'text-emerald-royal/60'}`}>
                                                    {isMultiVariant ? t('product_step_color') : t('product_choice_color')}
                                                </h4>
                                                <p className="text-[11px] md:text-[13px] text-heritage-gold/80 font-medium uppercase tracking-widest">{t('product_color_essence_tip')}</p>
                                            </div>
                                            {selectedColor && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="text-xs font-black text-heritage-gold uppercase tracking-[0.2em] bg-heritage-gold/5 px-3 py-1 rounded-full"
                                                >
                                                    {selectedColor.name}
                                                </motion.span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-6 pt-4">
                                            {product.colors.map((color) => (
                                                <button
                                                    key={color.name}
                                                    onClick={() => {
                                                        setSelectedColor(selectedColor?.name === color.name ? null : color);
                                                        if (validationError.color) setValidationError(prev => ({ ...prev, color: false }));
                                                    }}
                                                    className={`relative w-11 h-11 flex items-center justify-center transition-all duration-500 rounded-full p-1 border-2 ${selectedColor?.name === color.name
                                                        ? 'border-heritage-gold scale-125 z-10 shadow-lg'
                                                        : 'border-transparent hover:scale-110 hover:border-emerald-royal/10'
                                                        }`}
                                                >
                                                    <span
                                                        className="block w-full h-full rounded-full border border-black/5 shadow-inner"
                                                        style={{ backgroundColor: color.hex || color.hex_code }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Guidance */}
                                <div className="pt-8">
                                    <div className="flex items-center justify-center gap-4 py-2 opacity-30 select-none">
                                        <div className="h-px w-8 bg-emerald-royal" />
                                        <span className="text-[9px] uppercase tracking-[0.4em] font-bold">{t('product_variation_guide')}</span>
                                        <div className="h-px w-8 bg-emerald-royal" />
                                    </div>
                                </div>
                            </motion.div>
                        )}



                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 py-8 border-y border-heritage-gold/10"
                        >
                            <button
                                onClick={() => handleAddToCart(false)}
                                className="flex-1 bg-white border-2 border-emerald-royal text-emerald-royal py-5 px-8 uppercase tracking-[0.2em] font-bold text-xs md:text-sm hover:bg-emerald-royal hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 relative shadow-lg"
                            >
                                <ShoppingBag size={20} />
                                <span>{t('product_keep_in_bag')}</span>
                                {selections.length > 0 && (
                                    <span className="absolute -top-3 -right-3 w-7 h-7 bg-heritage-gold text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-xl">
                                        {selections.length}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => handleAddToCart(true)}
                                className="flex-1 gold-gradient-bg text-white py-5 px-8 uppercase tracking-[0.2em] font-bold text-xs md:text-sm shadow-2xl hover:shadow-emerald-royal/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                <CreditCard size={20} />
                                {t('product_buy_now')}
                            </button>
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`w-14 h-14 border-2 rounded-xl flex items-center justify-center transition-all ${isWishlisted
                                    ? "border-deep-maroon text-deep-maroon bg-deep-maroon/5 shadow-inner"
                                    : "border-emerald-royal/20 text-emerald-royal/40 hover:border-emerald-royal hover:text-emerald-royal"
                                    }`}
                                title={isWishlisted ? t('wishlist_remove_sanctuary') : t('wishlist_add_sanctuary')}
                            >
                                <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
                            </button>
                        </motion.div>

                        {/* Features/Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-5">
                                <h4 className="font-serif text-xl md:text-2xl text-emerald-royal">{t('product_beautiful_details')}</h4>
                                <ul className="space-y-4">
                                    {Array.isArray(product.details) ? product.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-center gap-4 text-sm md:text-base text-gray-500 font-light">
                                            <div className="w-2 h-2 rounded-full bg-heritage-gold flex-shrink-0 animate-pulse"></div>
                                            {detail}
                                        </li>
                                    )) : (
                                        <li className="text-red-500 text-sm">{t('product_details_unavailable')}</li>
                                    )}
                                </ul>
                            </div>

                            <div className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-heritage-gold/5 flex flex-col justify-center">
                                <div className="flex items-center gap-4 text-base md:text-lg text-emerald-royal font-black tracking-tight">
                                    <ShieldCheck size={24} className="text-heritage-gold flex-shrink-0" />
                                    <span>{t('product_nawabi_quality')}</span>
                                </div>
                                <div className="flex items-center gap-4 text-base md:text-lg text-emerald-royal font-black tracking-tight">
                                    <Truck size={24} className="text-heritage-gold flex-shrink-0" />
                                    <span>{t('product_royal_delivery')}</span>
                                </div>
                                <div className="flex items-center gap-4 text-base md:text-lg text-emerald-royal font-black tracking-tight">
                                    <ShieldCheck size={24} className="text-heritage-gold flex-shrink-0" />
                                    <span>{t('product_exchange_policy')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal - Using Portal correctly */}
            {
                isMounted && createPortal(
                    <AnimatePresence>
                        {isLightboxOpen && (
                            <motion.div
                                key="lightbox-modal"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[100000] bg-black/95 flex items-center justify-center p-4 md:p-10"
                                onClick={() => setIsLightboxOpen(false)}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
                                    className="absolute top-10 right-10 text-white/70 hover:text-white transition-colors z-[100001] p-4 bg-white/10 rounded-full backdrop-blur-md"
                                >
                                    <X size={32} />
                                </button>

                                <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        className="relative w-full h-full max-w-5xl"
                                    >
                                        <RoyalImage
                                            src={getOptimizedImage(safeGallery[activeImage])}
                                            alt={product.name}
                                            fill
                                            className="object-contain"
                                            priority
                                            containerClassName="w-full h-full"
                                        />
                                    </motion.div>

                                    {/* Lightbox Controls */}
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-0 pointer-events-none">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all pointer-events-auto"
                                        >
                                            <ChevronLeft size={32} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all pointer-events-auto"
                                        >
                                            <ChevronRight size={32} />
                                        </button>
                                    </div>

                                    {/* Counter */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 font-serif tracking-widest text-sm">
                                        {activeImage + 1} / {safeGallery.length}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )
            }
        </section >
    );
}
