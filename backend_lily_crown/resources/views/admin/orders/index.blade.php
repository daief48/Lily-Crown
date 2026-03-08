@extends('adminlte::page')

@section('title', 'Orders')

@section('content_header')
    <h1>Orders</h1>
@stop

@section('content')
    {{-- Filter Card --}}
    <div class="card card-royal mb-3">
        <div class="card-header">
            <h3 class="card-title">Filter Orders</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
        <div class="card-body">
            <form method="GET" action="{{ route('orders.index') }}">
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Search Order</label>
                            <input type="text" name="search" class="form-control" placeholder="ID or Name..." value="{{ request('search') }}">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Product Key</label>
                            <input type="text" name="product_key" class="form-control" placeholder="Key..." value="{{ request('product_key') }}">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Status</label>
                            <select name="status" class="form-control">
                                <option value="">All Statuses</option>
                                <option value="Pending" {{ request('status') == 'Pending' ? 'selected' : '' }}>Pending</option>
                                <option value="Processing" {{ request('status') == 'Processing' ? 'selected' : '' }}>Processing</option>
                                <option value="Shipped" {{ request('status') == 'Shipped' ? 'selected' : '' }}>Shipped</option>
                                <option value="Delivered" {{ request('status') == 'Delivered' ? 'selected' : '' }}>Delivered</option>
                                <option value="Cancelled" {{ request('status') == 'Cancelled' ? 'selected' : '' }}>Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>&nbsp;</label>
                            <div class="d-flex">
                                <button type="submit" class="btn btn-primary mr-2">
                                    <i class="fas fa-filter mr-1"></i> Filter
                                </button>
                                <a href="{{ route('orders.index') }}" class="btn btn-default">
                                    <i class="fas fa-undo mr-1"></i> Reset
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="card card-royal">
        <div class="card-body p-0">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th style="width: 10px">#</th>
                        <th>Customer</th>
                        <th>Product Keys</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th style="width: 100px">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($orders as $order)
                        <tr>
                            <td>{{ $order->id }}</td>
                            <td>
                                <b>{{ $order->customer_name }}</b><br>
                                <small>{{ $order->customer_email }}</small>
                            </td>
                            <td>
                                @php
                                    $items = is_string($order->items) ? json_decode($order->items, true) : $order->items;
                                    $keys = collect($items)->pluck('admin_product_key')->filter()->unique();
                                @endphp
                                @foreach($keys as $key)
                                    <span class="badge badge-secondary" style="font-family: monospace;">{{ $key }}</span>
                                @endforeach
                            </td>
                            <td>${{ number_format($order->total, 2) }}</td>
                            <td>
                                <form action="{{ route('orders.update', $order->id) }}" method="POST" class="status-update-form">
                                    @csrf
                                    @method('PUT')
                                    <select name="status" onchange="this.form.submit()" class="form-control form-control-sm @php
                                        echo match($order->status) {
                                            'Pending' => 'bg-warning',
                                            'Processing' => 'bg-info',
                                            'Shipped' => 'bg-primary',
                                            'Delivered' => 'bg-success',
                                            'Cancelled' => 'bg-danger',
                                            default => 'bg-secondary'
                                        };
                                    @endphp" style="border-radius: 20px; font-weight: bold; font-size: 10px; text-transform: uppercase; padding: 0 10px; height: 25px; border: none; color: white; cursor: pointer;">
                                        @foreach(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as $status)
                                            <option value="{{ $status }}" {{ $order->status == $status ? 'selected' : '' }}>{{ $status }}</option>
                                        @endforeach
                                    </select>
                                </form>
                            </td>
                            <td>{{ $order->created_at->format('Y-m-d') }}</td>
                            <td>
                                <a href="{{ route('orders.edit', $order->id) }}" class="btn btn-xs btn-default text-primary mx-1 shadow" title="Edit status">
                                    <i class="fa fa-lg fa-fw fa-pen"></i>
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="text-center py-4">No orders found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        <div class="card-footer clearfix">
            {{ $orders->links('pagination::bootstrap-4') }}
        </div>
    </div>
@stop
