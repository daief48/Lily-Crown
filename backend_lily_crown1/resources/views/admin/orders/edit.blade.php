@extends('adminlte::page')

@section('title', 'Edit Order Status')

@section('content_header')
    <h1>Edit Order #{{ $order->id }}</h1>
@stop

@section('content')
    <div class="card card-primary">
        <div class="card-header">
            <h3 class="card-title">Customer: {{ $order->customer_name }}</h3>
        </div>
        <form action="{{ route('orders.update', $order->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="card-body">
                <div class="form-group">
                    <label for="status">Order Status</label>
                    <select name="status" id="status" class="form-control">
                        @foreach(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as $status)
                            <option value="{{ $status }}" {{ $order->status == $status ? 'selected' : '' }}>{{ $status }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group">
                    <label>Order Items</label>
                    <pre class="bg-light p-3">{{ json_encode(json_decode($order->items), JSON_PRETTY_PRINT) }}</pre>
                </div>
            </div>

            <div class="card-footer">
                <button type="submit" class="btn btn-primary">Update Status</button>
                <a href="{{ route('orders.index') }}" class="btn btn-default">Cancel</a>
            </div>
        </form>
    </div>
@stop
