@extends('adminlte::page')

@section('title', 'Edit Testimonial')

@section('content_header')
    <h1>Edit Testimonial</h1>
@stop

@section('content')
    <div class="card card-royal">
        <form action="{{ route('testimonials.update', $testimonial->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="card-body">
                <div class="form-group">
                    <label for="author">Author Name</label>
                    <input type="text" name="author" class="form-control @error('author') is-invalid @enderror" id="author" placeholder="Enter author name" value="{{ old('author', $testimonial->author) }}" required>
                    @error('author')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="role">Role / Position</label>
                    <input type="text" name="role" class="form-control @error('role') is-invalid @enderror" id="role" placeholder="e.g. Royal Customer" value="{{ old('role', $testimonial->role) }}">
                    @error('role')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="image">Image URL</label>
                    <input type="text" name="image" class="form-control @error('image') is-invalid @enderror" id="image" placeholder="Enter image URL" value="{{ old('image', $testimonial->image) }}">
                    @error('image')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="quote">Quote</label>
                    <textarea name="quote" class="form-control @error('quote') is-invalid @enderror" id="quote" rows="4" placeholder="Enter customer quote" required>{{ old('quote', $testimonial->quote) }}</textarea>
                    @error('quote')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
            </div>
            <div class="card-footer text-right">
                <a href="{{ route('testimonials.index') }}" class="btn btn-default">Cancel</a>
                <button type="submit" class="btn btn-primary">Update Testimonial</button>
            </div>
        </form>
    </div>
@stop
