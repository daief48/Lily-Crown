@extends('layouts.app')

@section('content')
<div class="container">
    <div class="d-flex justify-content-between mb-3">
        <h3>Permissions</h3>
        <a href="{{ route('permissions.create') }}" class="btn btn-primary">Create Permission</a>
    </div>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Routes</th>
                <th>Users</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($permissions as $permission)
                <tr>
                    <td>{{ $permission->name }}</td>
                    <td>
                        @php $r = json_decode($permission->routes ?? '[]', true) ?? []; @endphp
                        @if(!empty($r))
                            <ul class="mb-0">
                                @foreach($r as $route)
                                    <li>{{ $route }}</li>
                                @endforeach
                            </ul>
                        @else
                            <small class="text-muted">—</small>
                        @endif
                    </td>
                    <td>
                        @if($permission->users->isNotEmpty())
                            {{ $permission->users->pluck('name')->join(', ') }}
                        @else
                            <small class="text-muted">—</small>
                        @endif
                    </td>
                    <td>
                        <a href="{{ route('permissions.edit', $permission) }}" class="btn btn-sm btn-secondary">Edit</a>
                        <form action="{{ route('permissions.destroy', $permission) }}" method="POST" style="display:inline-block;" onsubmit="return confirm('Delete permission?')">
                            @csrf
                            @method('DELETE')
                            <button class="btn btn-sm btn-danger">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{ $permissions->links() }}
</div>
@endsection
