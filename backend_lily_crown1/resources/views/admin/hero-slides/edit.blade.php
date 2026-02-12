@extends('adminlte::page')

@section('title', 'Edit Hero Slide')

@section('content_header')
    <h1>Edit Hero Slide</h1>
@stop

@section('content')
    <div class="card card-royal">
        <form action="{{ route('hero-slides.update', $heroSlide->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="card-body">
                <div class="form-group">
                    <label for="image">Image URL</label>
                    <input type="text" name="image" class="form-control @error('image') is-invalid @enderror" id="image" placeholder="Enter image URL" value="{{ old('image', $heroSlide->image) }}" required>
                    @error('image')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <!-- Current Image Preview -->
                <div class="mb-3">
                    <img src="{{ Str::startsWith($heroSlide->image, 'http') ? $heroSlide->image : asset($heroSlide->image) }}" 
                         alt="Preview" 
                         style="max-width: 200px; max-height: 100px; object-fit: cover;" 
                         class="img-thumbnail">
                </div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" class="form-control @error('title') is-invalid @enderror" id="title" placeholder="Enter title" value="{{ old('title', $heroSlide->title) }}">
                    @error('title')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="subtitle">Subtitle</label>
                    <input type="text" name="subtitle" class="form-control @error('subtitle') is-invalid @enderror" id="subtitle" placeholder="Enter subtitle" value="{{ old('subtitle', $heroSlide->subtitle) }}">
                    @error('subtitle')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="button_text">Button Text</label>
                    <input type="text" name="button_text" class="form-control @error('button_text') is-invalid @enderror" id="button_text" placeholder="Enter button text" value="{{ old('button_text', $heroSlide->button_text) }}">
                    @error('button_text')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="button_link">Button Link</label>
                    <input type="text" name="button_link" class="form-control @error('button_link') is-invalid @enderror" id="button_link" placeholder="Enter button link" value="{{ old('button_link', $heroSlide->button_link) }}">
                    @error('button_link')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="order">Order</label>
                    <input type="number" name="order" class="form-control @error('order') is-invalid @enderror" id="order" value="{{ old('order', $heroSlide->order) }}">
                    @error('order')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <div class="custom-control custom-switch">
                        <input type="checkbox" name="is_active" class="custom-control-input" id="is_active" value="1" {{ $heroSlide->is_active ? 'checked' : '' }}>
                        <label class="custom-control-label" for="is_active">Active</label>
                    </div>
                </div>
            </div>
            <div class="card-footer text-right">
                <a href="{{ route('hero-slides.index') }}" class="btn btn-default">Cancel</a>
                <button type="submit" class="btn btn-primary">Update Slide</button>
            </div>
        </form>
    </div>
@stop
