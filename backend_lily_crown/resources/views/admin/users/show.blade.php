@extends('adminlte::page')

@section('title', 'User Details')

@section('content_header')
    <h1>User Details</h1>
@stop

@section('content')
    <div class="card">
        <div class="card-body">
            <h3>{{ $user->name }}</h3>
            <p><strong>Email:</strong> {{ $user->email }}</p>
            <p><strong>Joined:</strong> {{ $user->created_at->format('Y-m-d') }}</p>
            <div class="mt-4">
                <a href="{{ route('users.edit', $user->id) }}" class="btn btn-primary">Edit User</a>
                <a href="{{ route('users.index') }}" class="btn btn-default">Back to list</a>
            </div>
        </div>
    </div>
@stop
