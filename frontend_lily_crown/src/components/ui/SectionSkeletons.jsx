import Skeleton from "./Skeleton";

export function CategoriesSkeleton() {
    return (
        <section className="py-24 bg-muslin-cream">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 flex flex-col items-center">
                    <Skeleton className="h-4 w-32 mb-4" />
                    <Skeleton className="h-10 w-64" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
                    <div className="md:col-span-2 h-64 md:h-96">
                        <Skeleton variant="royal" className="w-full h-full rounded-2xl" />
                    </div>
                    <div className="h-64 md:h-80 lg:h-96">
                        <Skeleton variant="royal" className="w-full h-full rounded-2xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export function TrendingSkeleton() {
    return (
        <section className="py-16 md:py-24 bg-muslin-cream/50 border-y border-heritage-gold/5">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-64" />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 px-4 md:px-0 pb-6 overflow-hidden">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full md:w-[320px] md:flex-shrink-0">
                            <Skeleton variant="royal" className="aspect-[3/4] w-full rounded-2xl shadow-sm" />
                            <div className="space-y-3 mt-4">
                                <Skeleton className="h-5 w-2/3" />
                                <Skeleton className="h-4 w-1/3 opacity-60" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FeaturesSkeleton() {
    return (
        <section className="py-24 md:py-32 bg-emerald-royal relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
                    <Skeleton className="h-4 w-32 mb-4 opacity-20" />
                    <Skeleton className="h-12 w-3/4 md:w-1/2 opacity-20" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 h-64">
                            <Skeleton className="w-16 h-16 rounded-2xl mb-10 opacity-20" />
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-3/4 opacity-20" />
                                <Skeleton className="h-4 w-full opacity-10" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function PickYourRoyalLookSkeleton() {
    return (
        <section className="py-24 bg-muslin-cream">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4 flex flex-col items-center">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-12 w-64" />
                    <Skeleton className="h-1 w-24" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                        <div key={i} className="aspect-[3/4] rounded-xl overflow-hidden">
                            <Skeleton variant="royal" className="w-full h-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function TestimonialsSkeleton() {
    return (
        <section className="py-20 md:py-32 bg-muslin-cream border-y border-heritage-gold/5 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 md:px-6 text-center text-center flex flex-col items-center">
                <div className="mb-10 flex flex-col items-center">
                    <Skeleton className="w-10 h-10 rounded-none mb-4 opacity-20" />
                    <Skeleton className="w-40 h-3" />
                </div>
                <div className="space-y-4 mb-12 w-full">
                    <Skeleton className="h-8 w-full max-w-2xl mx-auto" />
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                </div>
                <div className="flex items-center justify-center gap-5">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div className="text-left space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export function BlogPreviewSkeleton() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl space-y-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-12 w-3/4" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-6">
                            <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
                            <div className="space-y-3">
                                <Skeleton className="h-3 w-40" />
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function InstagramFeedSkeleton() {
    return (
        <section className="py-24 bg-muslin-cream border-t border-heritage-gold/5">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16 flex flex-col items-center">
                    <Skeleton className="w-8 h-8 rounded-full mb-4 opacity-20" />
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-3 w-48 opacity-60" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 px-2 md:px-0">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="aspect-square rounded-xl" />
                    ))}
                </div>
            </div>
        </section>
    );
}
