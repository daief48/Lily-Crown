@extends('adminlte::page')

@section('title', 'Lily Crown • Royal Order Sanctuary')

@section('content_header')
    <div class="d-flex justify-content-between align-items-center mb-4 luxury-animate">
        <div>
            <h1 class="text-emerald-royal font-serif display-4 mb-1" style="font-weight: 900; letter-spacing: -2px;">Order Sanctuary</h1>
            <p class="text-heritage-gold uppercase tracking-[0.4em] font-bold small mb-0 opacity-80">Refining Bespoke Selection #{{ str_pad($order->id, 5, '0', STR_PAD_LEFT) }}</p>
        </div>
        <div class="d-none d-md-block text-right">
            <div class="glass-badge px-4 py-2">
                <i class="fas fa-shield-alt mr-2 text-heritage-gold"></i>
                <span class="font-black small tracking-widest text-emerald-royal">SECURE VAULT ACCESS</span>
            </div>
        </div>
    </div>
@stop

@section('content')
    <div class="container-fluid pb-5">
        <!-- Modern Status Progress -->
        <div class="card border-0 shadow-premium mb-5 overflow-hidden glass-card" style="border-radius: 24px;">
            <div class="card-body p-5">
                <div class="text-center mb-5">
                    <h5 class="text-emerald-royal font-serif italic mb-2 h4">Bespoke Journey Progression</h5>
                    <div class="divider-gold mx-auto"></div>
                </div>
                
                @php
                    $statuses = [
                        ['id' => 'Pending', 'icon' => 'fa-hourglass-start', 'label' => 'Awaiting Approval'],
                        ['id' => 'Processing', 'icon' => 'fa-magic', 'label' => 'Under Creation'],
                        ['id' => 'Shipped', 'icon' => 'fa-paper-plane', 'label' => 'In Royal Transit'],
                        ['id' => 'Delivered', 'icon' => 'fa-crown', 'label' => 'Graciously Received'],
                        ['id' => 'Cancelled', 'icon' => 'fa-times-circle', 'label' => 'Retracted']
                    ];
                    $currentIndex = array_search($order->status, array_column($statuses, 'id'));
                @endphp

                <div class="status-timeline-container px-lg-5">
                    <div class="status-line">
                        <div class="status-line-progress" style="width: {{ $currentIndex * 25 }}%;"></div>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center position-relative" style="z-index: 2;">
                        @foreach($statuses as $index => $status)
                            <div class="status-node text-center">
                                <form action="{{ route('orders.update', $order->id) }}" method="POST">
                                    @csrf
                                    @method('PUT')
                                    <input type="hidden" name="status" value="{{ $status['id'] }}">
                                    <button type="submit" class="status-button {{ $index <= $currentIndex ? 'is-active' : '' }} {{ $order->status == $status['id'] ? 'is-current pulsate-gold' : '' }}" title="{{ $status['label'] }}">
                                        <div class="status-icon-box">
                                            <i class="fas {{ $status['icon'] }}"></i>
                                        </div>
                                        <span class="status-label-text uppercase tracking-widest font-black">{{ $status['id'] }}</span>
                                    </button>
                                </form>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- Left Column: Order Artifacts -->
            <div class="col-lg-8">
                <div class="card border-0 shadow-premium mb-4 overflow-hidden" style="border-radius: 24px;">
                    <div class="card-header border-0 p-4 d-flex justify-content-between align-items-center" style="background: var(--emerald-royal);">
                        <h4 class="card-title text-heritage-gold font-serif italic mb-0 h4">The Royal Collection</h4>
                        <span class="badge border border-heritage-gold text-heritage-gold px-3 py-2 rounded-pill small uppercase font-bold tracking-widest">
                            {{ count(json_decode($order->items) ?: []) }} Artifacts
                        </span>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead style="background: var(--muslin-cream);">
                                    <tr>
                                        <th class="border-0 px-4 py-3 uppercase tracking-widest font-black x-small text-muted">Exquisite Artifact</th>
                                        <th class="border-0 px-4 py-3 uppercase tracking-widest font-black x-small text-muted">Price</th>
                                        <th class="border-0 px-4 py-3 uppercase tracking-widest font-black x-small text-muted">Quantity</th>
                                        <th class="border-0 px-4 py-3 uppercase tracking-widest font-black x-small text-muted text-right">Summation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @php $items = json_decode($order->items); @endphp
                                    @if(is_array($items))
                                        @foreach($items as $item)
                                            <tr class="item-row">
                                                <td class="px-4 py-4">
                                                    <div class="d-flex align-items-center">
                                                        <div class="artifact-preview-box mr-4 shadow-premium">
                                                            @php
                                                                $imgUrl = is_string($item) ? null : ($item->image ?? null);
                                                                if ($imgUrl && !str_starts_with($imgUrl, 'http')) {
                                                                    $imgUrl = asset($imgUrl);
                                                                }
                                                            @endphp
                                                            <img src="{{ $imgUrl ?? asset('images/placeholder.png') }}" alt="{{ $item->name ?? '' }}">
                                                            <div class="glass-overlay"></div>
                                                        </div>
                                                        <div class="flex-grow-1">
                                                            <h6 class="font-serif font-bold text-emerald-royal mb-1 h5">{{ $item->name ?? 'Untitled Treasure' }}</h6>
                                                            
                                                            <div class="d-flex flex-wrap align-items-center mb-2" style="gap: 15px;">
                                                                @if(isset($item->selectedSize) || isset($item->size))
                                                                    <div class="detail-pill">
                                                                        <span class="label">Size</span>
                                                                        <span class="value">{{ $item->selectedSize ?? $item->size }}</span>
                                                                    </div>
                                                                @endif

                                                                @php
                                                                    $colorObj = isset($item->selectedColor) ? (is_string($item->selectedColor) ? null : $item->selectedColor) : null;
                                                                    $colorName = is_string($item->selectedColor ?? null) ? $item->selectedColor : ($colorObj->name ?? ($item->color ?? null));
                                                                    $hex = $colorObj->hex ?? ($colorObj->hex_code ?? null);
                                                                @endphp

                                                                @if($colorName)
                                                                    <div class="detail-pill">
                                                                        <span class="label">Color</span>
                                                                        <span class="value d-flex align-items-center">
                                                                            @if($hex)
                                                                                <span class="color-dot mr-1 shadow-sm" style="background-color: {{ $hex }};"></span>
                                                                            @endif
                                                                            {{ $colorName }}
                                                                        </span>
                                                                    </div>
                                                                @endif
                                                            </div>

                                                            <div class="sku-box mt-2">
                                                                @php
                                                                    $mainKey = $item->admin_product_key ?? null;
                                                                    $pKey = $colorObj->product_key ?? ($item->product_key ?? null);
                                                                    $displayKey = $pKey ?: $mainKey;
                                                                @endphp
                                                                @if($displayKey)
                                                                    <div class="sku-tag {{ $pKey ? 'is-variant' : 'is-main' }}">
                                                                        <span class="sku-label">{{ $pKey ? 'VARIANT' : 'PRODUCT SKU' }}</span>
                                                                        <span class="sku-value">{{ $displayKey }}</span>
                                                                    </div>
                                                                @endif
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-4 font-bold text-emerald-royal">৳{{ number_format($item->price ?? 0, 0) }}</td>
                                                <td class="px-4">
                                                    <span class="quantity-badge px-3 py-2 font-black h6 mb-0">{{ $item->quantity ?? 1 }}</span>
                                                </td>
                                                <td class="px-4 text-right font-black text-emerald-royal h5">৳{{ number_format(($item->price ?? 0) * ($item->quantity ?? 1), 0) }}</td>
                                            </tr>
                                        @endforeach
                                    @endif
                                </tbody>
                                <tfoot>
                                    <tr style="background: var(--muslin-cream);">
                                        <td colspan="3" class="text-right py-4 px-4 font-serif italic h5 text-muted">Collection Total</td>
                                        <td class="text-right py-4 px-4 font-black text-heritage-gold h2">৳{{ number_format($order->total, 0) }}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Patron Manifesto -->
            <div class="col-lg-4">
                <div class="card border-0 shadow-premium mb-4 overflow-hidden glass-card" style="border-radius: 24px;">
                    <div class="card-header border-0 p-4" style="background: var(--heritage-gold);">
                        <h4 class="card-title text-white font-serif italic mb-0 h4">Patron Manifesto</h4>
                    </div>
                    <div class="card-body p-4 text-center">
                        <div class="patron-avatar-container mb-4">
                            <div class="patron-avatar shadow-lg pulsate-soft">
                                <span class="text-white h1 font-serif">{{ strtoupper(substr($order->customer_name, 0, 1)) }}</span>
                            </div>
                        </div>
                        
                        <h5 class="text-emerald-royal font-serif font-black mb-1 h3">{{ $order->customer_name }}</h5>
                        <p class="text-heritage-gold font-bold small uppercase tracking-[0.2em] mb-4">{{ $order->customer_email }}</p>
                        
                        <div class="divider-gold mx-auto mb-4" style="width: 50px;"></div>

                        <div class="manifesto-list text-left px-3">
                            <div class="manifesto-item mb-4">
                                <div class="icon-circle shadow-sm"><i class="fas fa-phone"></i></div>
                                <div class="ml-3">
                                    <label class="uppercase tracking-widest text-muted font-black x-small mb-0">Communication</label>
                                    <p class="text-emerald-royal font-bold h6 mb-0">{{ $order->phone }}</p>
                                </div>
                            </div>
                            
                            <div class="manifesto-item mb-4">
                                <div class="icon-circle shadow-sm"><i class="fas fa-map-marker-alt"></i></div>
                                <div class="ml-3">
                                    <label class="uppercase tracking-widest text-muted font-black x-small mb-0">Delivery Sanctuary</label>
                                    <p class="text-emerald-royal font-bold mb-1 leading-relaxed small">{{ $order->address }}</p>
                                    <span class="city-badge uppercase font-black x-small">{{ $order->city }}</span>
                                </div>
                            </div>
                            
                            <div class="manifesto-item">
                                <div class="icon-circle shadow-sm"><i class="fas fa-credit-card"></i></div>
                                <div class="ml-3">
                                    <label class="uppercase tracking-widest text-muted font-black x-small mb-0">Payment Protocol</label>
                                    <p class="text-emerald-royal font-black mb-1 small uppercase tracking-tighter">{{ $order->payment_method }}</p>
                                    <span class="badge border-0 px-2 py-1 uppercase x-small font-black {{ $order->payment_status == 'Paid' ? 'bg-success' : 'bg-warning' }}" style="border-radius: 4px;">{{ $order->payment_status }}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="pt-5 mt-4 text-center d-flex flex-column gap-3">
                            <a href="mailto:{{ $order->customer_email }}" class="btn-royal btn-primary-royal shadow-premium mb-2">
                                <i class="fas fa-paper-plane mr-2"></i> Send Dispatch
                            </a>
                            <button class="btn-royal btn-outline-royal shadow-sm" onclick="window.print()">
                                <i class="fas fa-print mr-2"></i> Print Scroll
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Admin Notes/Actions Card if needed -->
                <div class="card border-0 shadow-premium overflow-hidden" style="border-radius: 24px;">
                     <div class="card-body p-4 bg-light text-center">
                        <p class="text-muted italic small mb-0">Preserving excellence since {{ $order->created_at->format('Y') }}</p>
                     </div>
                </div>
            </div>
        </div>
    </div>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@400;600;800;900&display=swap');
        
        :root {
            /* Light Theme Palette */
            --emerald-royal: #1A3C34;
            --heritage-gold: #C5A059;
            --muslin-cream: #F8F5F0;
            --glass-white: rgba(255, 255, 255, 0.75);
            --body-bg: #f4f7f6;
            --text-main: #1A3C34;
            --text-muted: #64748b;
            --card-bg: #ffffff;
            --card-border: rgba(26, 60, 52, 0.08);
            --shadow-premium: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        /* Dark Mode Overrides - Aligned with Standard AdminLTE */
        @media (prefers-color-scheme: dark) {
            :root {
                --emerald-royal: #40c0a0;
                --heritage-gold: #D4AF37;
                --muslin-cream: #343a40;
                --glass-white: rgba(52, 58, 64, 0.8);
                --body-bg: #454d55;
                --text-main: #ffffff;
                --text-muted: #adb5bd;
                --card-bg: #343a40;
                --card-border: #4b545c;
                --shadow-premium: 0 10px 25px rgba(0, 0, 0, 0.3);
            }
        }

        body.dark-mode {
            --emerald-royal: #40c0a0;
            --heritage-gold: #D4AF37;
            --muslin-cream: #343a40;
            --glass-white: rgba(52, 58, 64, 0.8);
            --body-bg: #454d55;
            --text-main: #ffffff;
            --text-muted: #adb5bd;
            --card-bg: #343a40;
            --card-border: #4b545c;
            --shadow-premium: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        body { font-family: 'Inter', sans-serif; background-color: var(--body-bg); color: var(--text-main); transition: all 0.3s; }
        .font-serif { font-family: 'Playfair Display', serif !important; }
        .text-emerald-royal { color: var(--emerald-royal); }
        .text-heritage-gold { color: var(--heritage-gold); }
        .bg-muslin-cream { background-color: var(--muslin-cream); }
        
        .shadow-premium { box-shadow: var(--shadow-premium); }
        .glass-card { background: var(--glass-white); backdrop-filter: blur(15px); border: 1px solid var(--card-border); border-radius: 20px; }
        
        .x-small { font-size: 10px; }
        .font-black { font-weight: 900; }
        .tracking-widest { letter-spacing: 0.2em; }
        .uppercase { text-transform: uppercase; }
        
        /* Status Timeline */
        .status-timeline-container { position: relative; padding: 20px 0; }
        .status-line { position: absolute; top: 50%; left: 0; right: 0; height: 3px; background: var(--card-border); transform: translateY(-50%); z-index: 1; border-radius: 10px; }
        .status-line-progress { position: absolute; top: 0; left: 0; height: 100%; background: linear-gradient(90deg, var(--heritage-gold), var(--emerald-royal)); border-radius: 10px; transition: width 1s ease-in-out; }
        
        .status-node { position: relative; z-index: 2; text-align: center; cursor: default; transition: transform 0.3s; }
        .status-node:hover { transform: translateY(-5px); }
        .status-icon-circle { 
            width: 50px; height: 50px; background: var(--card-bg); border: 3px solid var(--card-border); 
            border-radius: 50%; display: flex; align-items: center; justify-content: center; 
            margin: 0 auto 10px; color: var(--text-muted); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .status-node.active .status-icon-circle { border-color: var(--heritage-gold); color: var(--heritage-gold); box-shadow: 0 0 15px rgba(197, 160, 89, 0.3); }
        .status-node.current .status-icon-circle { background: var(--heritage-gold); border-color: var(--heritage-gold); color: white; animation: pulsate-gold 2s infinite; }
        .status-label { font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .status-node.active .status-label { color: var(--emerald-royal); }

        /* Order Items Table */
        .item-row { transition: all 0.3s; border-bottom: 1px solid var(--card-border) !important; }
        .item-row:hover { background: rgba(197, 160, 89, 0.03); transform: scale(1.01); }
        
        .artifact-preview-box { width: 80px; height: 110px; border-radius: 12px; overflow: hidden; position: relative; }
        .artifact-preview-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
        .item-row:hover .artifact-preview-box img { transform: scale(1.1); }
        .glass-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(26, 60, 52, 0.4)); pointer-events: none; }
        
        .detail-pill { background: var(--muslin-cream); padding: 5px 12px; border-radius: 8px; border: 1px solid var(--card-border); }
        .color-dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; box-shadow: 0 0 5px rgba(0,0,0,0.1); }
        
        .sku-box { display: flex; flex-direction: column; gap: 4px; }
        .sku-tag { 
            font-size: 9px; font-weight: 800; padding: 3px 8px; border-radius: 4px; 
            width: fit-content; border: 1px solid var(--card-border);
        }
        .sku-tag.variant { background: var(--emerald-royal); color: var(--heritage-gold); border-color: var(--heritage-gold); }
        .sku-tag.main { background: var(--muslin-cream); color: var(--emerald-royal); }
        
        .quantity-badge { 
            font-size: 16px; font-weight: 900; color: var(--emerald-royal); background: var(--muslin-cream);
            width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 12px;
        }

        /* Patron Sidebar */
        .patron-avatar-circle { 
            width: 70px; height: 70px; background: var(--emerald-royal); border: 4px solid var(--heritage-gold); 
            border-radius: 20px; display: flex; align-items: center; justify-content: center;
            font-size: 28px; color: white; margin: 0 auto 15px; animation: pulsate-soft 3s infinite;
        }
        .manifesto-item { display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--card-border); }
        .manifesto-item:last-child { border-bottom: none; }
        .manifesto-icon { width: 35px; height: 35px; border-radius: 10px; background: var(--muslin-cream); display: flex; align-items: center; justify-content: center; margin-right: 15px; color: var(--heritage-gold); }

        /* Royal Buttons */
        .btn-royal { 
            border-radius: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; 
            font-size: 11px; padding: 14px 25px; transition: all 0.3s; width: 100%; border: none;
        }
        .btn-primary-royal { background: var(--emerald-royal); color: var(--muslin-cream); }
        .btn-primary-royal:hover { background: #0D1F1A; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(26,60,52,0.2); }
        .btn-outline-royal { background: transparent; border: 2px solid var(--heritage-gold); color: var(--heritage-gold); }
        .btn-outline-royal:hover { background: var(--heritage-gold); color: var(--muslin-cream); transform: translateY(-3px); }

        @keyframes pulsate-gold {
            0% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.6); }
            70% { box-shadow: 0 0 0 15px rgba(197, 160, 89, 0); }
            100% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0); }
        }

        @keyframes pulsate-soft {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        /* Animations */
        .animate-up { animation: fadeInUp 0.8s ease-out both; }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media print {
            .btn-royal, .status-update-form, .main-footer { display: none !important; }
            .content-wrapper { background: white !important; }
            .glass-card { border: 1px solid #eee !important; box-shadow: none !important; }
        }
    </style>
@stop
