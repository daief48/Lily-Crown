@extends('adminlte::page')

@section('title', 'Lily Crown • Royal Order Sanctuary')

@section('content_header')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 class="text-emerald-royal font-serif display-4 mb-1" style="font-weight: 900; letter-spacing: -1px;">Order Sanctuary</h1>
            <p class="text-heritage-gold uppercase tracking-[0.3em] font-bold small mb-0">Managing Bespoke Selection #{{ str_pad($order->id, 5, '0', STR_PAD_LEFT) }}</p>
        </div>
        <div class="d-none d-md-block text-right">
            <span class="badge shadow-sm px-4 py-2" style="background: rgba(197, 160, 89, 0.1); border: 1px solid rgba(197, 160, 89, 0.3); border-radius: 30px; color: #1A3C34; font-size: 10px; font-weight: 900; letter-spacing: 2px;">SECURE VAULT ACCESS</span>
        </div>
    </div>
@stop

@section('content')
    <div class="container-fluid">
        <!-- Interactive Status Timeline -->
        <div class="card border-0 shadow-lg mb-5 overflow-hidden" style="border-radius: 20px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px);">
            <div class="card-body p-5">
                <h5 class="text-emerald-royal font-serif italic mb-5 text-center">Bespoke Journey Progression</h5>
                @php
                    $statuses = [
                        ['id' => 'Pending', 'icon' => 'fa-hourglass-start', 'label' => 'Awaiting Approval'],
                        ['id' => 'Processing', 'icon' => 'fa-cogs', 'label' => 'Under Creation'],
                        ['id' => 'Shipped', 'icon' => 'fa-shuttle-van', 'label' => 'In Royal Transit'],
                        ['id' => 'Delivered', 'icon' => 'fa-check-double', 'label' => 'Graciously Received'],
                        ['id' => 'Cancelled', 'icon' => 'fa-times-circle', 'label' => 'Retracted']
                    ];
                    $currentIndex = array_search($order->status, array_column($statuses, 'id'));
                @endphp

                <div class="position-all-relative px-5">
                    <div class="progress position-absolute w-100" style="height: 2px; top: 25px; left: 0; background: #eee; z-index: 0;">
                        <div class="progress-bar" role="progressbar" style="width: {{ $currentIndex * 25 }}%; background: #C5A059;" aria-valuenow="{{ $currentIndex * 25 }}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center position-relative" style="z-index: 1;">
                        @foreach($statuses as $index => $status)
                            <div class="text-center group-hover-gold">
                                <form action="{{ route('orders.update', $order->id) }}" method="POST">
                                    @csrf
                                    @method('PUT')
                                    <input type="hidden" name="status" value="{{ $status['id'] }}">
                                    <button type="submit" class="btn status-btn p-0 border-0 bg-transparent" title="{{ $status['label'] }}">
                                        <div class="status-circle mb-3 {{ $index <= $currentIndex ? 'status-active' : '' }} {{ $order->status == $status['id'] ? 'status-current pulsate' : '' }}">
                                            <i class="fas {{ $status['icon'] }}"></i>
                                        </div>
                                        <p class="status-label uppercase tracking-widest font-black {{ $index <= $currentIndex ? 'text-emerald-royal' : 'text-muted opacity-50' }}">{{ $status['id'] }}</p>
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
                <div class="card border-0 shadow-lg mb-4" style="border-radius: 20px; overflow: hidden;">
                    <div class="card-header border-0 p-4" style="background: linear-gradient(90deg, #1A3C34 0%, #0D1F1A 100%);">
                        <h4 class="card-title text-heritage-gold font-serif italic mb-0">The Royal Collection</h4>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="bg-light">
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
                                            <tr>
                                                <td class="px-4 py-4">
                                                    <div class="d-flex align-items-center">
                                                        <div class="artifact-image-container mr-4 shadow-sm">
                                                            <img src="{{ $item->image ?? '' }}" alt="{{ $item->name ?? '' }}">
                                                        </div>
                                                        <div>
                                                            <h6 class="font-serif font-bold text-emerald-royal mb-0">{{ $item->name ?? 'Untitled Treasure' }}</h6>
                                                            @if(isset($item->selectedSize) || isset($item->selectedColor))
                                                                <small class="text-heritage-gold tracking-widest uppercase x-small font-bold">
                                                                    @if(isset($item->selectedSize)) Size: {{ $item->selectedSize }} @endif
                                                                    @if(isset($item->selectedColor)) 
                                                                        @if(isset($item->selectedSize)) | @endif
                                                                        Color: {{ is_string($item->selectedColor) ? $item->selectedColor : ($item->selectedColor->name ?? '') }}
                                                                    @endif
                                                                </small>
                                                            @else
                                                                <small class="text-muted tracking-widest uppercase x-small">Original Piece</small>
                                                            @endif
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-4 font-bold text-emerald-royal">৳{{ number_format($item->price ?? 0, 0) }}</td>
                                                <td class="px-4">
                                                    <span class="badge bg-muslin-cream text-emerald-royal border shadow-sm px-3 py-2" style="border-radius: 10px;">{{ $item->quantity ?? 1 }}</span>
                                                </td>
                                                <td class="px-4 text-right font-black text-emerald-royal h5">৳{{ number_format(($item->price ?? 0) * ($item->quantity ?? 1), 0) }}</td>
                                            </tr>
                                        @endforeach
                                    @endif
                                </tbody>
                                <tfoot>
                                    <tr class="bg-light">
                                        <td colspan="3" class="text-right py-4 px-4 font-serif italic h5 text-muted">Collection Total</td>
                                        <td class="text-right py-4 px-4 font-black text-heritage-gold h3">৳{{ number_format($order->total, 0) }}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Patron Manifesto & Settings -->
            <div class="col-lg-4">
                <div class="card border-0 shadow-lg mb-4" style="border-radius: 20px; overflow: hidden; background: #fff url('https://www.transparenttextures.com/patterns/cubes.png');">
                    <div class="card-header border-0 p-4" style="background: #C5A059;">
                        <h4 class="card-title text-white font-serif italic mb-0">Patron Manifesto</h4>
                    </div>
                    <div class="card-body p-4">
                        <div class="text-center mb-4">
                            <div class="avatar-royal border-4 border-heritage-gold shadow-lg mb-3">
                                <span class="text-white h2 font-serif">{{ strtoupper(substr($order->customer_name, 0, 1)) }}</span>
                            </div>
                            <h5 class="text-emerald-royal font-serif font-bold mb-1">{{ $order->customer_name }}</h5>
                            <p class="text-muted small uppercase tracking-tighter mb-0">{{ $order->customer_email }}</p>
                        </div>
                        
                        <div class="manifesto-details mt-5">
                            <div class="d-flex align-items-start mb-4">
                                <i class="fas fa-phone mt-1 text-heritage-gold mr-3"></i>
                                <div>
                                    <label class="x-small uppercase tracking-widest text-muted font-black mb-0">Communication</label>
                                    <p class="text-emerald-royal font-bold mb-0">{{ $order->phone }}</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-start mb-4">
                                <i class="fas fa-map-marker-alt mt-1 text-heritage-gold mr-3"></i>
                                <div>
                                    <label class="x-small uppercase tracking-widest text-muted font-black mb-0">Delivery Sanctuary</label>
                                    <p class="text-emerald-royal font-bold mb-1 leading-relaxed">{{ $order->address }}</p>
                                    <span class="badge border border-heritage-gold text-heritage-gold px-2 py-1 x-small uppercase font-bold">{{ $order->city }}</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-start">
                                <i class="fas fa-credit-card mt-1 text-heritage-gold mr-3"></i>
                                <div>
                                    <label class="x-small uppercase tracking-widest text-muted font-black mb-0">Payment Protocol</label>
                                    <p class="text-emerald-royal font-bold mb-0 uppercase">{{ $order->payment_method }}</p>
                                    <small class="badge badge-success px-2 py-1 x-small uppercase">{{ $order->payment_status }}</small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="pt-5 mt-5 border-top border-light text-center">
                            <a href="mailto:{{ $order->customer_email }}" class="btn btn-emerald-outline mr-2">
                                <i class="fas fa-paper-plane mr-1"></i> Send Dispatch
                            </a>
                            <button class="btn btn-gold-outline" onclick="window.print()">
                                <i class="fas fa-print mr-1"></i> Print Scroll
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
        
        :root {
            --emerald-royal: #1A3C34;
            --heritage-gold: #C5A059;
            --muslin-cream: #F8F5F0;
        }

        .font-serif { font-family: 'Playfair Display', serif !important; }
        .text-emerald-royal { color: var(--emerald-royal); }
        .text-heritage-gold { color: var(--heritage-gold); }
        .bg-muslin-cream { background-color: var(--muslin-cream); }
        .tracking-widest { letter-spacing: 0.15em; }
        .x-small { font-size: 9px; }
        .font-black { font-weight: 900; }
        
        .status-circle {
            width: 50px;
            height: 50px;
            background: #fff;
            border: 2px solid #eee;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #ccc;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            margin: 0 auto;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        
        .status-active { border-color: var(--heritage-gold); color: var(--heritage-gold); background: #fff; }
        .status-current { background: var(--heritage-gold); color: #fff; border-color: var(--heritage-gold); transform: scale(1.3); box-shadow: 0 0 20px rgba(197,160,89,0.4); }
        
        .status-label { font-size: 9px; margin-top: 10px; }
        
        .pulsate { animation: pulser 2s infinite; }
        @keyframes pulser {
            0% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(197, 160, 89, 0); }
            100% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0); }
        }

        .artifact-image-container {
            width: 80px;
            height: 100px;
            overflow: hidden;
            border-radius: 10px;
            border: 1px solid rgba(197, 160, 89, 0.2);
            transition: transform 0.3s ease;
        }
        
        .artifact-image-container img { width: 100%; height: 100%; object-fit: cover; }
        tr:hover .artifact-image-container { transform: scale(1.05) rotate(2deg); }
        
        .avatar-royal {
            width: 100px;
            height: 100px;
            background: var(--emerald-royal);
            margin: 0 auto;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .btn-gold-outline {
            border: 1px solid var(--heritage-gold);
            color: var(--heritage-gold);
            border-radius: 30px;
            padding: 8px 20px;
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            background: transparent;
            transition: all 0.3s;
        }
        
        .btn-gold-outline:hover { background: var(--heritage-gold); color: #fff; transform: translateY(-3px); }

        .btn-emerald-outline {
            border: 1px solid var(--emerald-royal);
            color: var(--emerald-royal);
            border-radius: 30px;
            padding: 8px 20px;
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            background: transparent;
            transition: all 0.3s;
        }
        
        .btn-emerald-outline:hover { background: var(--emerald-royal); color: #fff; transform: translateY(-3px); }

        .status-btn { cursor: pointer; outline: none !important; }
        .status-btn:hover .status-circle:not(.status-current) { transform: translateY(-5px); border-color: var(--heritage-gold); color: var(--heritage-gold); }

        @media print {
            .navbar, .sidebar, .btn, .status-timeline { display: none !important; }
            .content-wrapper { margin-left: 0 !important; }
            .card { box-shadow: none !important; border: 1px solid #eee !important; }
        }
    </style>
@stop
