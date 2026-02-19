@extends('adminlte::page')

@section('title', 'Dashboard')

@section('content_header')
    <h1>Dashboard</h1>
@stop

@section('content')
    <div class="row">
        <div class="col-md-3 col-sm-6">
            <a href="{{ url('admin/orders') }}" class="text-reset">
                <div class="info-box bg-light mb-3">
                    <span class="info-box-icon bg-success elevation-1"><i class="fas fa-shopping-bag"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">Orders</span>
                        <span class="info-box-number">{{ $totalOrders }}</span>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-md-3 col-sm-6">
            <a href="{{ url('admin/users') }}" class="text-reset">
                <div class="info-box bg-light mb-3">
                    <span class="info-box-icon bg-info elevation-1"><i class="fas fa-users"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">Customers</span>
                        <span class="info-box-number">{{ $totalCustomers }}</span>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-md-3 col-sm-6">
            <a href="{{ url('admin/products') }}" class="text-reset">
                <div class="info-box bg-light mb-3">
                    <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-box-open"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">Products</span>
                        <span class="info-box-number">{{ $totalProducts }}</span>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-md-3 col-sm-6">
            <div class="info-box bg-light mb-3">
                <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-dollar-sign"></i></span>
                <div class="info-box-content">
                    <span class="info-box-text">Revenue</span>
                    <span class="info-box-number">${{ number_format($totalRevenue, 2) }}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header">Orders by Status</div>
                <div class="card-body">
                    <canvas id="ordersPie" style="height:300px"></canvas>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header">Monthly Revenue (Last 6 months)</div>
                <div class="card-body">
                    <canvas id="revenueBar" style="height:300px"></canvas>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">Recent Orders</div>
                <div class="card-body table-responsive p-0">
                    <table class="table table-hover text-nowrap">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($recentOrders as $order)
                                <tr>
                                    <td>{{ $order->id }}</td>
                                    <td>{{ $order->customer_name }}<br/><small>{{ $order->customer_email }}</small></td>
                                    <td>${{ number_format($order->total, 2) }}</td>
                                    <td>{{ $order->status }}</td>
                                    <td>{{ $order->payment_status ?? 'N/A' }}</td>
                                    <td>{{ $order->created_at->format('Y-m-d') }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    {{-- Charts scripts --}}
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Pie chart - orders by status
            const ordersData = @json($ordersByStatus);
            const pieCtx = document.getElementById('ordersPie').getContext('2d');
            new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: Object.keys(ordersData),
                    datasets: [{
                        data: Object.values(ordersData),
                        backgroundColor: ['#16a34a', '#0ea5a9', '#f59e0b', '#ef4444', '#6366f1'],
                    }]
                }
            });

            // Bar chart - monthly revenue
            const months = @json($months);
            const revenueData = @json($revenueData);
            const barCtx = document.getElementById('revenueBar').getContext('2d');
            new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: months,
                    datasets: [{
                        label: 'Revenue',
                        data: revenueData,
                        backgroundColor: '#16a34a'
                    }]
                },
                options: {
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        });
    </script>
@stop
