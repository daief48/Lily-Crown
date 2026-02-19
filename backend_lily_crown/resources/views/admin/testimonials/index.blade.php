@extends('adminlte::page')

@section('title', 'Testimonials')

@section('content_header')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Testimonials</h1>
            </div>
            <div class="col-sm-6">
                <a href="{{ route('testimonials.create') }}" class="btn btn-primary float-right">Add Testimonial</a>
            </div>
        </div>
    </div>
@stop

@section('content')
    {{-- Filter Card --}}
    <div class="card card-royal mb-3">
        <div class="card-header">
            <h3 class="card-title">Filter Testimonials</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
        <div class="card-body">
            <form method="GET" action="{{ route('testimonials.index') }}">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Search Testimonial</label>
                            <input type="text" name="search" class="form-control" placeholder="Author, Role, Quote..." value="{{ request('search') }}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>&nbsp;</label>
                            <div class="d-flex">
                                <button type="submit" class="btn btn-primary mr-2">
                                    <i class="fas fa-filter mr-1"></i> Filter
                                </button>
                                <a href="{{ route('testimonials.index') }}" class="btn btn-default">
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
                        <th>Portrait</th>
                        <th>Author</th>
                        <th>Role</th>
                        <th>Quote</th>
                        <th style="width: 150px">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($testimonials as $testimonial)
                        <tr>
                            <td>{{ $testimonial->id }}</td>
                            <td>
                                @if($testimonial->image)
                                    <img src="{{ Str::startsWith($testimonial->image, 'http') ? $testimonial->image : asset($testimonial->image) }}" 
                                         alt="{{ $testimonial->author }}" 
                                         class="img-thumbnail rounded-circle" 
                                         style="width: 50px; height: 50px; object-fit: cover;">
                                @else
                                    <span class="text-muted text-xs">No Portrait</span>
                                @endif
                            </td>
                            <td>{{ $testimonial->author }}</td>
                            <td>{{ $testimonial->role }}</td>
                            <td>{{ Str::limit($testimonial->quote, 50) }}</td>
                            <td>
                                <a href="{{ route('testimonials.edit', $testimonial->id) }}" class="btn btn-xs btn-default text-primary mx-1 shadow" title="Edit">
                                    <i class="fa fa-lg fa-fw fa-pen"></i>
                                </a>
                                <form action="{{ route('testimonials.destroy', $testimonial->id) }}" method="POST" style="display:inline">
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
                            <td colspan="5" class="text-center py-4">No testimonials found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        <div class="card-footer clearfix">
            {{ $testimonials->links('pagination::bootstrap-4') }}
        </div>
    </div>
@stop
