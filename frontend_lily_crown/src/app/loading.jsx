import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-muslin-cream">
            {/* 1. Hero Ghost */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-emerald-royal/5">
                <div className="max-w-7xl mx-auto px-4 md:px-6 w-full text-center space-y-8">
                    <Skeleton className="h-6 w-48 mx-auto opacity-50" />
                    <Skeleton className="h-20 w-full max-w-3xl mx-auto" />
                    <div className="flex justify-center gap-4">
                        <Skeleton className="h-14 w-40 rounded-full" />
                        <Skeleton className="h-14 w-40 rounded-full" />
                    </div>
                </div>
            </section>

            {/* 2. Categories Ghost */}
            <section className="py-24 max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex justify-between items-end mb-12">
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-64" />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-[4/5] w-full rounded-2xl shadow-lg" />
                            <Skeleton className="h-6 w-3/4 mx-auto" />
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Featured Products Ghost */}
            <section className="py-24 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-center mb-12">
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-10 w-64" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-6">
                                <Skeleton className="aspect-[3/4] w-full rounded-3xl" />
                                <div className="space-y-3">
                                    <Skeleton className="h-5 w-2/3" />
                                    <Skeleton className="h-4 w-1/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
