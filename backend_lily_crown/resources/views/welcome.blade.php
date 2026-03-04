<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Lily Crown | Administrative Suite</title>
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=playfair-display:700|instrument-sans:400,500,600" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            :root {
                --emerald-royal: #022c22;
                --heritage-gold: #996515;
                --muslin-cream: #fdfcf7;
            }
            body {
                font-family: 'Instrument Sans', sans-serif;
                background-color: var(--emerald-royal);
                color: var(--muslin-cream);
            }
            .font-serif {
                font-family: 'Playfair Display', serif;
            }
            .glass-card {
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(153, 101, 21, 0.2);
            }
            .gold-gradient {
                background: linear-gradient(135deg, #996515 0%, #c5a059 50%, #996515 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .btn-gold {
                background: linear-gradient(135deg, #996515 0%, #c5a059 100%);
                transition: all 0.3s ease;
            }
            .btn-gold:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(153, 101, 21, 0.3);
            }
        </style>
    </head>
    <body class="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div class="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-amber-500 rounded-full blur-[120px]"></div>
            <div class="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-emerald-500 rounded-full blur-[120px]"></div>
        </div>

        <div class="max-w-4xl w-full relative z-10 text-center space-y-12">
            <!-- Logo Section -->
            <div class="flex justify-center mb-8">
                <div class="relative p-8 glass-card rounded-full inline-block">
                    <img src="/img/logo.png" alt="Lily Crown Logo" class="h-16 md:h-20 drop-shadow-2xl">
                </div>
            </div>

            <!-- Content Section -->
            <div class="space-y-6">
                <h2 class="text-sm uppercase tracking-[0.4em] font-bold text-amber-500/80">Premium Heritage Jewelry</h2>
                <h1 class="text-5xl md:text-7xl font-serif leading-tight">
                    Administrative <span class="gold-gradient italic">Suite</span>
                </h1>
                <p class="text-lg md:text-xl text-muslin-cream/60 max-w-2xl mx-auto font-light leading-relaxed">
                    Elevate the royal experience. Manage collections, orders, and monarch preferences with elegance and precision.
                </p>
            </div>

            <!-- Action Section -->
            <div class="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                @if (Route::has('login'))
                    @auth
                        <a href="{{ url('/home') }}" class="btn-gold px-12 py-4 rounded-sm text-sm font-bold uppercase tracking-[0.2em] text-emerald-950 shadow-2xl">
                            Enter Dashboard
                        </a>
                    @else
                        <a href="{{ route('login') }}" class="btn-gold px-12 py-4 rounded-sm text-sm font-bold uppercase tracking-[0.2em] text-emerald-950 shadow-2xl">
                            Sign In
                        </a>
                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="px-12 py-4 rounded-sm text-sm font-bold uppercase tracking-[0.2em] border border-amber-500/30 hover:bg-amber-500/10 transition-all">
                                Request Access
                            </a>
                        @endif
                    @endauth
                @endif
            </div>

            <!-- Footer Stats Hint -->
            <div class="pt-16 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-40">
                <div class="p-4 border-t border-amber-500/20">
                    <p class="text-[10px] uppercase tracking-widest font-bold">Collections</p>
                    <p class="text-xl font-serif">Royal</p>
                </div>
                <div class="p-4 border-t border-amber-500/20">
                    <p class="text-[10px] uppercase tracking-widest font-bold">Experience</p>
                    <p class="text-xl font-serif">Seamless</p>
                </div>
                <div class="p-4 border-t border-amber-500/20">
                    <p class="text-[10px] uppercase tracking-widest font-bold">Security</p>
                    <p class="text-xl font-serif">Fortified</p>
                </div>
                <div class="p-4 border-t border-amber-500/20">
                    <p class="text-[10px] uppercase tracking-widest font-bold">Standard</p>
                    <p class="text-xl font-serif">Exquisite</p>
                </div>
            </div>
        </div>

        <!-- Decorative Corners -->
        <div class="fixed top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-amber-500/20 m-8 pointer-events-none"></div>
        <div class="fixed bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-amber-500/20 m-8 pointer-events-none"></div>
    </body>
</html>
