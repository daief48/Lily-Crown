import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-muslin-cream">
            {/* Minimal High-Fidelity Nav Ghost */}
            <div className="h-20 border-b border-heritage-gold/5 bg-white/80 backdrop-blur-md flex items-center px-6 md:px-12 justify-between">
                <Skeleton className="h-8 w-32" />
                <div className="hidden md:flex gap-8">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex gap-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </div>

            {/* Premium Hero Ghost */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-emerald-royal/5">
                {/* Ambient Vibrant Glows */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-heritage-gold/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-royal/10 blur-[120px] animate-pulse delay-700" />

                <div className="max-w-7xl mx-auto px-4 md:px-6 w-full text-center space-y-10 relative z-10">
                    <div className="flex flex-col items-center gap-4">
                        <Skeleton className="h-4 w-32 opacity-20" />
                        <Skeleton variant="royal" className="h-16 md:h-24 w-full max-w-4xl" />
                        <Skeleton className="h-6 w-3/4 max-w-xl opacity-30" />
                    </div>
                    <div className="flex justify-center gap-6">
                        <Skeleton variant="royal" className="h-14 w-44 rounded-full" />
                        <Skeleton className="h-14 w-44 rounded-full border border-heritage-gold/20 bg-transparent" />
                    </div>
                </div>

                {/* Decorative floating elements */}
                <div className="absolute bottom-20 left-20 hidden lg:block">
                    <Skeleton variant="royal" className="w-48 h-1" />
                </div>
            </section>

            {/* Subtle Content Transition Ghost */}
            <section className="py-24 max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-6">
                            <Skeleton variant="royal" className="aspect-square w-full rounded-2xl" />
                            <div className="space-y-3">
                                <Skeleton className="h-6 w-3/4 opacity-20" />
                                <Skeleton className="h-4 w-1/2 opacity-10" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
