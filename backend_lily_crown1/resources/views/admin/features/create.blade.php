@extends('adminlte::page')

@section('title', 'Add Feature')

@section('content_header')
    <h1>Add Feature</h1>
@stop

@section('content')
    <div class="card card-royal">
        <form action="{{ route('features.store') }}" method="POST">
            @csrf
            <div class="card-body">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" class="form-control @error('title') is-invalid @enderror" id="title" placeholder="Enter title" value="{{ old('title') }}" required>
                    @error('title')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="icon">Icon Class (FontAwesome)</label>
                    <input type="text" name="icon" class="form-control @error('icon') is-invalid @enderror" id="icon" placeholder="e.g. fas fa-shipping-fast" value="{{ old('icon') }}">
                    @error('icon')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea name="description" class="form-control @error('description') is-invalid @enderror" id="description" rows="3" placeholder="Enter feature description">{{ old('description') }}</textarea>
                    @error('description')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
            </div>
            <div class="card-footer text-right">
                <a href="{{ route('features.index') }}" class="btn btn-default">Cancel</a>
                <button type="submit" class="btn btn-primary">Save Feature</button>
            </div>
        </form>
    </div>
@stop
