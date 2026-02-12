@extends('adminlte::page')

@section('title', 'Add Hero Slide')

@section('content_header')
    <h1>Add Hero Slide</h1>
@stop

@section('content')
    <div class="card card-royal">
        <form action="{{ route('hero-slides.store') }}" method="POST">
            @csrf
            <div class="card-body">
                <div class="form-group">
                    <label for="image">Image URL</label>
                    <input type="text" name="image" class="form-control @error('image') is-invalid @enderror" id="image" placeholder="Enter image URL" value="{{ old('image') }}" required>
                    @error('image')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" class="form-control @error('title') is-invalid @enderror" id="title" placeholder="Enter title" value="{{ old('title') }}">
                    @error('title')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="subtitle">Subtitle</label>
                    <input type="text" name="subtitle" class="form-control @error('subtitle') is-invalid @enderror" id="subtitle" placeholder="Enter subtitle" value="{{ old('subtitle') }}">
                    @error('subtitle')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="button_text">Button Text</label>
                    <input type="text" name="button_text" class="form-control @error('button_text') is-invalid @enderror" id="button_text" placeholder="Enter button text" value="{{ old('button_text') }}">
                    @error('button_text')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="button_link">Button Link</label>
                    <input type="text" name="button_link" class="form-control @error('button_link') is-invalid @enderror" id="button_link" placeholder="Enter button link" value="{{ old('button_link') }}">
                    @error('button_link')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="order">Order</label>
                    <input type="number" name="order" class="form-control @error('order') is-invalid @enderror" id="order" value="{{ old('order', 0) }}">
                    @error('order')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <div class="custom-control custom-switch">
                        <input type="checkbox" name="is_active" class="custom-control-input" id="is_active" value="1" checked>
                        <label class="custom-control-label" for="is_active">Active</label>
                    </div>
                </div>
            </div>
            <div class="card-footer text-right">
                <a href="{{ route('hero-slides.index') }}" class="btn btn-default">Cancel</a>
                <button type="submit" class="btn btn-primary">Save Slide</button>
            </div>
        </form>
    </div>
@stop
