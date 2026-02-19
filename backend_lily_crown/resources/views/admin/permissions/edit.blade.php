@extends('layouts.app')

@section('content')
<div class="container">
    <h3>Edit Permission</h3>

    @if($errors->any())
        <div class="alert alert-danger">
            <ul class="mb-0">
                @foreach($errors->all() as $e)
                    <li>{{ $e }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('permissions.update', $permission) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" name="name" class="form-control" value="{{ old('name', $permission->name) }}" required>
        </div>

        @php $selectedRoutes = json_decode($permission->routes ?? '[]', true) ?? []; @endphp

        <div class="mb-3">
            <label class="form-label">Admin Routes (select to include in this permission)</label>
            <div class="border p-2" style="max-height:300px; overflow:auto;">
                @foreach($adminRoutes as $key => $label)
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="routes[]" value="{{ $key }}" id="route_{{ md5($key) }}" {{ in_array($key, $selectedRoutes) ? 'checked' : '' }}>
                        <label class="form-check-label" for="route_{{ md5($key) }}">{{ $label }}</label>
                    </div>
                @endforeach
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label">Assign to Users (optional)</label>
            <select name="users[]" class="form-select" multiple>
                @foreach($users as $u)
                    <option value="{{ $u->id }}" {{ $permission->users->contains('id', $u->id) ? 'selected' : '' }}>{{ $u->name }} ({{ $u->email }})</option>
                @endforeach
            </select>
        </div>

        <button class="btn btn-primary">Save</button>
        <a href="{{ route('permissions.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div>
@endsection
