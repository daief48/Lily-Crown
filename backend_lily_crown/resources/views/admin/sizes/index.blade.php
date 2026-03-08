@extends('adminlte::page')

@section('title', 'Sizes')

@section('content_header')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Sizes</h1>
            </div>
            <div class="col-sm-6">
                <a href="{{ route('sizes.create') }}" class="btn btn-primary float-right">
                    <i class="fas fa-plus mr-1"></i> Add Size
                </a>
            </div>
        </div>
    </div>
@stop

@section('content')
    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            {{ session('success') }}
        </div>
    @endif

    <div class="card card-royal">
        <div class="card-body p-0">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th style="width: 60px">#</th>
                        <th>Size Name</th>
                        <th>Created At</th>
                        <th style="width: 150px">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($sizes as $size)
                        <tr>
                            <td>{{ $size->id }}</td>
                            <td>
                                <span class="badge badge-secondary" style="font-size: 0.9rem; letter-spacing: 0.1em;">
                                    {{ $size->name }}
                                </span>
                            </td>
                            <td>{{ $size->created_at->format('d M Y') }}</td>
                            <td>
                                <a href="{{ route('sizes.edit', $size->id) }}" class="btn btn-xs btn-default text-primary mx-1 shadow" title="Edit">
                                    <i class="fa fa-lg fa-fw fa-pen"></i>
                                </a>
                                <form action="{{ route('sizes.destroy', $size->id) }}" method="POST" style="display:inline">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn btn-xs btn-default text-danger mx-1 shadow" title="Delete" onclick="return confirm('Delete this size? It will be removed from all products.')">
                                        <i class="fa fa-lg fa-fw fa-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="text-center py-4 text-muted">
                                No sizes found. <a href="{{ route('sizes.create') }}">Add your first size</a>.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        <div class="card-footer clearfix">
            {{ $sizes->links('pagination::bootstrap-4') }}
        </div>
    </div>
@stop
