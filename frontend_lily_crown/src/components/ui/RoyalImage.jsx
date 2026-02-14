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
    unoptimized = true, // We need this for local backend images
    onLoadingComplete,
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={cn("relative overflow-hidden", containerClassName, fill ? "w-full h-full" : "")}>
            {isLoading && (
                <Skeleton
                    className={cn(
                        "absolute inset-0 z-10",
                        fill ? "w-full h-full" : ""
                    )}
                    variant="gold"
                />
            )}

            <Image
                src={hasError ? "https://picsum.photos/1200/800?grayscale&blur=2" : src}
                alt={alt}
                fill={fill}
                width={width}
                height={height}
                priority={priority}
                unoptimized={unoptimized}
                onLoadingComplete={(img) => {
                    setIsLoading(false);
                    if (onLoadingComplete) onLoadingComplete(img);
                }}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
                className={cn(
                    "transition-opacity duration-700",
                    isLoading ? "opacity-0" : "opacity-100",
                    className
                )}
                {...props}
            />
        </div>
    );
};
