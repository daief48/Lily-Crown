@extends('adminlte::page')

@section('title', 'Lily Crown • Order Vault')

@section('content_header')
    <div class="d-flex justify-content-between align-items-center mb-4 luxury-animate">
        <div>
            <h1 class="text-emerald-royal font-serif display-4 mb-1" style="font-weight: 900; letter-spacing: -2px;">Order Vault</h1>
            <p class="text-heritage-gold uppercase tracking-[0.4em] font-bold small mb-0 opacity-80">Overseeing the Royal Ledger</p>
        </div>
        <div class="d-none d-md-block text-right">
            <div class="glass-badge px-4 py-2">
                <i class="fas fa-crown mr-2 text-heritage-gold"></i>
                <span class="font-black small tracking-widest text-emerald-royal">SUPREME ARCHIVE ACCESS</span>
            </div>
        </div>
    </div>
@stop

@section('content')
    <div class="container-fluid pb-5">
        {{-- Modern Filter Section --}}
        <div class="card border-0 shadow-premium mb-5 overflow-hidden glass-card luxury-animate" style="border-radius: 24px; animation-delay: 0.1s;">
            <div class="card-header border-0 bg-transparent pt-4 px-4">
                <h3 class="card-title text-emerald-royal font-serif italic h5">Refine Archive</h3>
            </div>
            <div class="card-body p-4">
                <form method="GET" action="{{ route('orders.index') }}">
                    <div class="row align-items-end">
                        <div class="col-md-2 mb-3">
                            <label class="x-small uppercase tracking-widest text-muted font-black mb-2">Search Order</label>
                            <div class="input-royal-group">
                                <i class="fas fa-search icon"></i>
                                <input type="text" name="search" class="form-control-royal" placeholder="ID or Name..." value="{{ request('search') }}">
                            </div>
                        </div>
                        <div class="col-md-2 mb-3">
                            <label class="x-small uppercase tracking-widest text-muted font-black mb-2">Product</label>
                            <div class="input-royal-group">
                                <i class="fas fa-tag icon"></i>
                                <input type="text" name="product_name" class="form-control-royal" placeholder="Name..." value="{{ request('product_name') }}">
                            </div>
                        </div>
                        <div class="col-md-2 mb-3">
                            <label class="x-small uppercase tracking-widest text-muted font-black mb-2">Variant Key</label>
                            <div class="input-royal-group">
                                <i class="fas fa-key icon"></i>
                                <input type="text" name="product_key" class="form-control-royal" placeholder="Key..." value="{{ request('product_key') }}">
                            </div>
                        </div>
                        <div class="col-md-2 mb-3">
                            <label class="x-small uppercase tracking-widest text-muted font-black mb-2">Status</label>
                            <div class="input-royal-group">
                                <i class="fas fa-stream icon"></i>
                                <select name="status" class="form-control-royal custom-select">
                                    <option value="">All Statuses</option>
                                    @foreach(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as $s)
                                        <option value="{{ $s }}" {{ request('status') == $s ? 'selected' : '' }}>{{ $s }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2 mb-3">
                            <label class="x-small uppercase tracking-widest text-muted font-black mb-2">Start Date</label>
                            <div class="input-royal-group">
                                <i class="fas fa-calendar icon"></i>
                                <input type="date" name="start_date" class="form-control-royal" value="{{ request('start_date') }}">
                            </div>
                        </div>
                        <div class="col-md-2 mb-3">
                            <label class="x-small uppercase tracking-widest text-muted font-black mb-2">End Date</label>
                            <div class="input-royal-group">
                                <i class="fas fa-calendar icon"></i>
                                <input type="date" name="end_date" class="form-control-royal" value="{{ request('end_date') }}">
                            </div>
                        </div>
                        <div class="col-12 text-right">
                            <div class="d-flex justify-content-end gap-2">
                                <a href="{{ route('orders.index') }}" class="btn-royal btn-outline-royal mr-2" style="width: auto; padding: 10px 25px;">
                                    <i class="fas fa-undo mr-1"></i> Reset
                                </a>
                                <button type="submit" class="btn-royal btn-primary-royal" style="width: auto; padding: 12px 40px;">
                                    <i class="fas fa-filter mr-1"></i> Filter
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        {{-- Orders Table --}}
        <div class="card border-0 shadow-premium overflow-hidden luxury-animate" style="border-radius: 24px; animation-delay: 0.2s;">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead style="background: var(--emerald-royal);">
                            <tr>
                                <th class="border-0 px-4 py-3 uppercase tracking-widest font-black x-small text-heritage-gold">Vault ID</th>
                                <th class="border-0 px-4 py-3 uppercase tracking-widest font-black x-small text-heritage-gold">Patron</th>
                                <th class="border-0 px-4 py-3 uppercase tracking-widest font-black x-small text-heritage-gold" style="width: 35%">Artifact Details</th>
                                <th class="border-0 px-4 py-3 uppercase tracking-widest font-black x-small text-heritage-gold">Summation</th>
                                <th class="border-0 px-4 py-3 uppercase tracking-widest font-black x-small text-heritage-gold">Progress</th>
                                <th class="border-0 px-4 py-3 uppercase tracking-widest font-black x-small text-heritage-gold">Chronology</th>
                                <th class="border-0 px-4 py-3 uppercase tracking-widest font-black x-small text-heritage-gold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody style="background: white;">
                            @forelse($orders as $order)
                                <tr class="item-row">
                                    <td class="px-4 font-black text-emerald-royal">#{{ str_pad($order->id, 5, '0', STR_PAD_LEFT) }}</td>
                                    <td class="px-4">
                                        <div class="d-flex align-items-center">
                                            <div class="patron-circle mr-3 shadow-sm">
                                                {{ strtoupper(substr($order->customer_name, 0, 1)) }}
                                            </div>
                                            <div>
                                                <h6 class="font-bold text-emerald-royal mb-0">{{ $order->customer_name }}</h6>
                                                <small class="text-muted tracking-tighter">{{ $order->customer_email }}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4">
                                        @php
                                            $items = is_string($order->items) ? json_decode($order->items, true) : $order->items;
                                        @endphp
                                        <div class="artifact-list">
                                            @forelse(collect($items)->take(3) as $item)
                                                <div class="artifact-mini-row d-flex align-items-center py-2 border-bottom-faint">
                                                    <div class="artifact-thumb mr-3">
                                                        @php
                                                            $imgUrl = $item['image'] ?? null;
                                                            if ($imgUrl && !str_starts_with($imgUrl, 'http')) {
                                                                $imgUrl = asset($imgUrl);
                                                            }
                                                        @endphp
                                                        <img src="{{ $imgUrl ?? asset('images/placeholder.png') }}" class="shadow-sm">
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <div class="d-flex justify-content-between align-items-center mb-1">
                                                            <span class="font-bold text-dark x-small-plus">{{ Str::limit($item['name'] ?? 'Product', 25) }}</span>
                                                            <span class="badge bg-muslin-cream text-emerald-royal font-black x-small">x{{ $item['quantity'] ?? 1 }}</span>
                                                        </div>
                                                        <div class="d-flex align-items-center flex-wrap gap-2">
                                                            @if(!empty($item['size']))
                                                                <span class="x-tiny-badge">SZ: {{ $item['size'] }}</span>
                                                            @endif
                                                            @php
                                                                $pKey = $item['selectedColor']['product_key'] ?? ($item['product_key'] ?? null);
                                                                $mainKey = $item['admin_product_key'] ?? null;
                                                                $displayKey = $pKey ?: $mainKey;
                                                            @endphp
                                                            @if($displayKey)
                                                                <span class="x-tiny-badge {{ $pKey ? 'bg-variant' : 'bg-main' }}">
                                                                    {{ $displayKey }}
                                                                </span>
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div>
                                            @empty
                                                <span class="text-muted small">No items tracked</span>
                                            @endforelse
                                            @if(count($items) > 3)
                                                <div class="text-center pt-2">
                                                    <span class="text-heritage-gold font-bold x-small uppercase tracking-widest">+ {{ count($items) - 3 }} More Treasures</span>
                                                </div>
                                            @endif
                                        </div>
                                    </td>
                                    <td class="px-4 font-black text-emerald-royal h6">৳{{ number_format($order->total, 0) }}</td>
                                    <td class="px-4">
                                        <form action="{{ route('orders.update', $order->id) }}" method="POST" class="status-update-form">
                                            @csrf
                                            @method('PUT')
                                            <select name="status" onchange="this.form.submit()" class="status-selector-royal @php
                                                echo 'status-' . strtolower($order->status);
                                            @endphp">
                                                @foreach(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as $status)
                                                    <option value="{{ $status }}" {{ $order->status == $status ? 'selected' : '' }}>{{ $status }}</option>
                                                @endforeach
                                            </select>
                                        </form>
                                    </td>
                                    <td class="px-4">
                                        <div class="d-flex flex-column">
                                            <span class="font-bold text-emerald-royal small">{{ $order->created_at->format('M d, Y') }}</span>
                                            <span class="text-muted x-small uppercase tracking-tighter">{{ $order->created_at->diffForHumans() }}</span>
                                        </div>
                                    </td>
                                    <td class="px-4 text-right">
                                        <a href="{{ route('orders.edit', $order->id) }}" class="btn-action shadow-sm" title="Enter Sanctuary">
                                            <i class="fas fa-external-link-alt"></i>
                                        </a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="7" class="text-center py-5">
                                        <div class="py-5">
                                            <i class="fas fa-ghost fa-3x text-light mb-3"></i>
                                            <h5 class="font-serif italic text-muted">The Vault is currently empty</h5>
                                            <p class="text-muted small">No bespoke selections match your criteria.</p>
                                        </div>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer bg-white border-0 py-4 px-4 d-flex justify-content-between align-items-center">
                <div class="text-muted small italic">
                    Showing {{ $orders->firstItem() ?? 0 }} to {{ $orders->lastItem() ?? 0 }} of {{ $orders->total() }} Royal Decrees
                </div>
                <div class="pagination-royal">
                    {{ $orders->links('pagination::bootstrap-4') }}
                </div>
            </div>
        </div>
    </div>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@400;600;800;900&family=JetBrains+Mono:wght@500&display=swap');
        
        :root {
            /* Light Theme Palette */
            --emerald-royal: #1A3C34;
            --emerald-soft: rgba(26, 60, 52, 0.05);
            --heritage-gold: #C5A059;
            --muslin-cream: #F8F5F0;
            --glass-card-bg: rgba(255, 255, 255, 0.75);
            --glass-blur: 15px;
            --body-bg: #f8fafc;
            --text-main: #1A3C34;
            --text-muted: #64748b;
            --card-border: rgba(26, 60, 52, 0.06);
            --input-bg: #ffffff;
            --input-border: #e2e8f0;
            --shadow-premium: 0 15px 35px rgba(0, 0, 0, 0.05);
            --row-hover: rgba(197, 160, 89, 0.04);
            --table-header-bg: #1A3C34;
            --table-header-text: #C5A059;
        }

        /* Dark Mode Overrides - Aligned with Standard AdminLTE */
        @media (prefers-color-scheme: dark) {
            :root {
                --emerald-royal: #40c0a0; /* Vibrant emerald for dark contrast */
                --emerald-soft: rgba(64, 192, 160, 0.1);
                --heritage-gold: #D4AF37;
                --muslin-cream: #343a40; /* AdminLTE dark card bg */
                --glass-card-bg: rgba(52, 58, 64, 0.8);
                --glass-blur: 15px;
                --body-bg: #454d55; /* AdminLTE dark body bg */
                --text-main: #ffffff;
                --text-muted: #adb5bd;
                --card-border: #4b545c;
                --input-bg: #343a40;
                --input-border: #6c757d;
                --shadow-premium: 0 10px 25px rgba(0, 0, 0, 0.3);
                --row-hover: #4b545c;
                --table-header-bg: #343a40;
                --table-header-text: #D4AF37;
            }
        }

        /* Specific support for AdminLTE's .dark-mode class */
        body.dark-mode {
            --emerald-royal: #40c0a0;
            --emerald-soft: rgba(64, 192, 160, 0.1);
            --heritage-gold: #D4AF37;
            --muslin-cream: #343a40;
            --glass-card-bg: rgba(52, 58, 64, 0.8);
            --body-bg: #454d55;
            --text-main: #ffffff;
            --text-muted: #adb5bd;
            --card-border: #4b545c;
            --input-bg: #343a40;
            --input-border: #6c757d;
            --shadow-premium: 0 10px 25px rgba(0, 0, 0, 0.3);
            --row-hover: #4b545c;
            --table-header-bg: #343a40;
            --table-header-text: #D4AF37;
        }

        body { font-family: 'Inter', sans-serif; background-color: var(--body-bg); color: var(--text-main); transition: background-color 0.3s, color 0.3s; }
        .font-serif { font-family: 'Playfair Display', serif !important; }
        .text-emerald-royal { color: var(--emerald-royal); transition: color 0.3s; }
        .text-heritage-gold { color: var(--heritage-gold); transition: color 0.3s; }
        .bg-muslin-cream { background-color: var(--muslin-cream); }
        .text-muted { color: var(--text-muted) !important; }
        
        .card { background-color: var(--input-bg); border: 1px solid var(--card-border); }
        .shadow-premium { box-shadow: var(--shadow-premium); }
        .glass-card { background: var(--glass-card-bg); backdrop-filter: blur(var(--glass-blur)); border: 1px solid var(--card-border); }
        
        .x-small { font-size: 9px; }
        .x-small-plus { font-size: 11px; }
        .font-black { font-weight: 900; }
        .tracking-widest { letter-spacing: 0.15em; }
        
        /* Header & Badges */
        .glass-badge { background: var(--glass-card-bg); backdrop-filter: blur(10px); border: 1px solid rgba(197, 160, 89, 0.3); border-radius: 40px; }
        .luxury-animate { animation: fadeInUp 0.8s ease-out both; }
        
        /* Input Styling */
        .input-royal-group { position: relative; display: flex; align-items: center; }
        .input-royal-group .icon { position: absolute; left: 15px; color: var(--heritage-gold); font-size: 12px; pointer-events: none; }
        .form-control-royal { 
            width: 100%; border: 1px solid var(--input-border); border-radius: 12px; padding: 10px 15px 10px 40px;
            font-size: 12px; font-weight: 600; color: var(--text-main); background: var(--input-bg); transition: all 0.3s;
        }
        .form-control-royal:focus { border-color: var(--heritage-gold); box-shadow: 0 0 0 4px rgba(197, 160, 89, 0.1); outline: none; }
        .custom-select { color: var(--text-main); }
        
        /* Table & Rows */
        .table { color: var(--text-main); }
        .table thead th { border-bottom: none !important; }
        .item-row { transition: all 0.3s; border-bottom: 1px solid var(--card-border) !important; }
        .item-row:hover { background: var(--row-hover); transform: translateX(5px); }
        
        .patron-circle { 
            width: 40px; height: 40px; background: var(--emerald-royal); color: var(--muslin-cream); border-radius: 12px;
            display: flex; align-items: center; justify-content: center; font-weight: 900; font-family: 'Playfair Display';
        }
        
        .artifact-thumb { width: 45px; height: 60px; border-radius: 8px; overflow: hidden; flex-shrink: 0; background: var(--emerald-soft); }
        .artifact-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; opacity: 0.95; }
        .item-row:hover .artifact-thumb img { transform: scale(1.15); opacity: 1; }
        
        .border-bottom-faint { border-bottom: 1px solid var(--card-border); }
        .artifact-mini-row:last-child { border-bottom: none; }
        
        .x-tiny-badge { 
            font-size: 8px; font-weight: 900; color: var(--text-muted); background: var(--emerald-soft); padding: 2px 6px; 
            border-radius: 4px; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;
        }
        .x-tiny-badge.bg-variant { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
        .x-tiny-badge.bg-main { background: rgba(34, 197, 94, 0.15); color: #166534; }
        
        .text-dark { color: var(--text-main) !important; }

        /* Status Selector */
        .status-selector-royal {
            border: none; border-radius: 30px; font-weight: 900; font-size: 9px; text-transform: uppercase;
            padding: 6px 15px; height: auto; cursor: pointer; transition: all 0.3s; color: white; appearance: none;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 100%; max-width: 120px; text-align: center;
        }
        .status-pending { background: #ed8936; }
        .status-processing { background: #4299e1; }
        .status-shipped { background: #667eea; }
        .status-delivered { background: #48bb78; }
        .status-cancelled { background: #f56565; }
        
        /* Action Button */
        .btn-action { 
            width: 35px; height: 35px; background: var(--input-bg); color: var(--heritage-gold); border-radius: 10px;
            display: inline-flex; align-items: center; justify-content: center; transition: all 0.3s; box-shadow: 0 4px 6px -1px var(--card-border);
        }
        .btn-action:hover { background: var(--heritage-gold); color: white; transform: translateY(-3px) rotate(8deg); }
        
        /* General Buttons */
        .btn-royal { 
            border-radius: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; 
            font-size: 11px; transition: all 0.3s; border: none; display: inline-flex; align-items: center; justify-content: center;
        }
        .btn-primary-royal { background: var(--emerald-royal); color: var(--muslin-cream); }
        .btn-primary-royal:hover { background: #0D1F1A; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(26,60,52,0.2); }
        .btn-outline-royal { background: transparent; border: 1px solid var(--heritage-gold); color: var(--heritage-gold); }
        .btn-outline-royal:hover { background: var(--heritage-gold); color: var(--muslin-cream); transform: translateY(-2px); }

        /* Pagination Override */
        .pagination-royal .page-item.active .page-link { background-color: var(--emerald-royal); border-color: var(--emerald-royal); color: var(--muslin-cream); }
        .pagination-royal .page-link { border-radius: 8px !important; margin: 0 3px; color: var(--emerald-royal); font-weight: 700; border: 1px solid var(--card-border); background: var(--input-bg); }

        .card-footer { background-color: var(--input-bg); border-top: 1px solid var(--card-border); }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
            .divider-gold { display: none; }
        }
    </style>
@stop
