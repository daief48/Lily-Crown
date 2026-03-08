@extends('adminlte::page')

@section('title', 'Edit Size')

@section('content_header')
    <h1>Edit Size</h1>
@stop

@section('content')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card card-royal luxury-animate">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <div>
                        <span class="luxury-header-badge">Size Management</span>
                        <h3 class="card-title"><i class="fas fa-edit mr-2"></i>Edit Size</h3>
                    </div>
                </div>
                <div class="card-body">
                    <form action="{{ route('sizes.update', $size->id) }}" method="POST">
                        @csrf
                        @method('PUT')

                        <div class="form-group mb-4">
                            <label for="name" class="luxury-label">Size Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                class="form-control luxury-input @error('name') is-invalid @enderror"
                                placeholder="e.g. XS, S, M, L, XL, XXL"
                                value="{{ old('name', $size->name) }}"
                                required
                            >
                            <small class="form-text text-muted">Size names are automatically uppercased.</small>
                            @error('name')
                                <span class="invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-luxury mr-2">
                                <i class="fas fa-sync-alt mr-1"></i> Update Size
                            </button>
                            <a href="{{ route('sizes.index') }}" class="btn btn-outline-luxury">
                                Cancel
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@stop
