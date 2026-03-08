"use client";

import React, { useState } from "react";
import Image from "next/image";
import Skeleton from "./Skeleton";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

export const RoyalImage = ({
    src,
    alt,
    className,
    containerClassName,
    fill = false,
    width,
    height,
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    onLoad,
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={cn(
            "relative overflow-hidden transition-colors duration-500",
            isLoading ? "bg-muslin-cream/50" : "bg-transparent",
            containerClassName,
            fill ? "w-full h-full" : ""
        )}>
            {isLoading && (
                <div className="absolute inset-0 z-10 transition-opacity duration-500">
                    <Skeleton className="w-full h-full rounded-none" />
                </div>
            )}

            <Image
                src={hasError ? "https://picsum.photos/1200/800?grayscale&blur=2" : src}
                alt={alt || "Lily Crown Heirloom"}
                fill={fill}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                priority={priority}
                sizes={sizes}
                onLoad={(e) => {
                    setIsLoading(false);
                    if (onLoad) onLoad(e);
                }}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
                className={cn(
                    "transition-all duration-1000 ease-in-out",
                    isLoading ? "opacity-0 scale-105 blur-lg" : "opacity-100 scale-100 blur-0",
                    className
                )}
                {...props}
            />
        </div>
    );
};
