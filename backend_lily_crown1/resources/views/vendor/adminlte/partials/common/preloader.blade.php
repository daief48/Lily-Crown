@inject('preloaderHelper', 'JeroenNoten\LaravelAdminLte\Helpers\PreloaderHelper')

<div class="{{ $preloaderHelper->makePreloaderClasses() }}" style="{{ $preloaderHelper->makePreloaderStyle() }}">
    
    {{-- Custom Lily Crown Preloader --}}
    <div class="lily-crown-preloader">
        <div class="preloader-content">
            {{-- Logo Container with Glow Effect --}}
            <div class="logo-container">
                <div class="logo-glow"></div>
                <img src="{{ asset('img/logo.png') }}" alt="Lily Crown" class="preloader-logo">
            </div>
            
            {{-- Loading Text --}}
            <div class="loading-text-container">
                <div class="loading-divider"></div>
                <p class="loading-text">Loading</p>
                <div class="loading-divider"></div>
            </div>
        </div>
    </div>

    {{-- Custom Styles --}}
    <style>
        .lily-crown-preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2420 50%, #1a1a1a 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }

        .preloader-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
        }

        .logo-container {
            position: relative;
            width: 140px;
            height: 140px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .preloader-logo {
            width: 120px;
            height: 120px;
            object-fit: contain;
            position: relative;
            z-index: 2;
            animation: logoPulse 2s ease-in-out infinite;
            filter: drop-shadow(0 0 20px rgba(153, 101, 21, 0.4));
        }

        .logo-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 180px;
            height: 180px;
            background: radial-gradient(circle, rgba(153, 101, 21, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            animation: glowPulse 2s ease-in-out infinite;
            z-index: 1;
        }

        .loading-text-container {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .loading-divider {
            width: 30px;
            height: 1px;
            background: linear-gradient(90deg, transparent, #c9a961, transparent);
            animation: dividerFade 1.5s ease-in-out infinite;
        }

        .loading-text {
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: #c9a961;
            margin: 0;
            animation: textFade 1.5s ease-in-out infinite;
        }

        /* Animations */
        @keyframes logoPulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        @keyframes glowPulse {
            0%, 100% {
                opacity: 0.5;
                transform: translate(-50%, -50%) scale(1);
            }
            50% {
                opacity: 0.8;
                transform: translate(-50%, -50%) scale(1.1);
            }
        }

        @keyframes textFade {
            0%, 100% {
                opacity: 0.5;
            }
            50% {
                opacity: 1;
            }
        }

        @keyframes dividerFade {
            0%, 100% {
                opacity: 0.3;
            }
            50% {
                opacity: 0.8;
            }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .logo-container {
                width: 100px;
                height: 100px;
            }

            .preloader-logo {
                width: 90px;
                height: 90px;
            }

            .logo-glow {
                width: 140px;
                height: 140px;
            }

            .loading-text {
                font-size: 10px;
            }

            .loading-divider {
                width: 20px;
            }
        }
    </style>

</div>
