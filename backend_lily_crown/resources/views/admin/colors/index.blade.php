@extends('adminlte::page')

@section('title', 'Colors')

@section('content_header')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Product Colors</h1>
            </div>
            <div class="col-sm-6">
                <a href="{{ route('colors.create') }}" class="btn btn-primary float-right">
                    <i class="fas fa-plus mr-1"></i> Add Color
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
                        <th>Color Preview</th>
                        <th>Name</th>
                        <th>HEX Code</th>
                        <th style="width: 150px">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($colors as $color)
                        <tr>
                            <td>{{ $color->id }}</td>
                            <td>
                                <div style="width: 30px; height: 30px; border-radius: 50%; background-color: {{ $color->hex_code }}; border: 1px solid #ddd;"></div>
                            </td>
                            <td>{{ $color->name }}</td>
                            <td><code>{{ $color->hex_code }}</code></td>
                            <td>
                                <a href="{{ route('colors.edit', $color->id) }}" class="btn btn-xs btn-default text-primary mx-1 shadow" title="Edit">
                                    <i class="fa fa-lg fa-fw fa-pen"></i>
                                </a>
                                <form action="{{ route('colors.destroy', $color->id) }}" method="POST" style="display:inline">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn btn-xs btn-default text-danger mx-1 shadow" title="Delete" onclick="return confirm('Delete this color?')">
                                        <i class="fa fa-lg fa-fw fa-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="text-center py-4">No colors found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        <div class="card-footer clearfix">
            {{ $colors->links('pagination::bootstrap-4') }}
        </div>
    </div>
@stop
