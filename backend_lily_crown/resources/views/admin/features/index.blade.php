@extends('adminlte::page')

@section('title', 'Features')

@section('content_header')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Site Features</h1>
            </div>
            <div class="col-sm-6">
                <a href="{{ route('features.create') }}" class="btn btn-primary float-right">Add Feature</a>
            </div>
        </div>
    </div>
@stop

@section('content')
    {{-- Filter Card --}}
    <div class="card card-royal mb-3">
        <div class="card-header">
            <h3 class="card-title">Filter Features</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
        <div class="card-body">
            <form method="GET" action="{{ route('features.index') }}">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Search Feature</label>
                            <input type="text" name="search" class="form-control" placeholder="Title, Description..." value="{{ request('search') }}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>&nbsp;</label>
                            <div class="d-flex">
                                <button type="submit" class="btn btn-primary mr-2">
                                    <i class="fas fa-filter mr-1"></i> Filter
                                </button>
                                <a href="{{ route('features.index') }}" class="btn btn-default">
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
                        <th>Visuals</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th style="width: 150px">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($features as $feature)
                        <tr>
                            <td>{{ $feature->id }}</td>
                            <td>
                                @if($feature->image)
                                    <img src="{{ Str::startsWith($feature->image, 'http') ? $feature->image : asset($feature->image) }}" 
                                         alt="{{ $feature->title }}" 
                                         class="img-thumbnail" 
                                         style="width: 50px; height: 50px; object-fit: contain;">
                                @else
                                    <i class="{{ $feature->icon }} fa-2x text-heritage-gold"></i>
                                @endif
                            </td>
                            <td>{{ $feature->title }}</td>
                            <td>{{ Str::limit($feature->description, 100) }}</td>
                            <td>
                                <a href="{{ route('features.edit', $feature->id) }}" class="btn btn-xs btn-default text-primary mx-1 shadow" title="Edit">
                                    <i class="fa fa-lg fa-fw fa-pen"></i>
                                </a>
                                <form action="{{ route('features.destroy', $feature->id) }}" method="POST" style="display:inline">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn btn-xs btn-default text-danger mx-1 shadow" title="Delete" onclick="return confirm('Are you sure?')">
                                        <i class="fa fa-lg fa-fw fa-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="text-center py-4">No features found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        <div class="card-footer clearfix">
            {{ $features->links('pagination::bootstrap-4') }}
        </div>
    </div>
@stop
