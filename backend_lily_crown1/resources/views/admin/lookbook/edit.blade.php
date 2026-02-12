@extends('adminlte::page')

@section('title', 'Edit Lookbook Item')

@section('content_header')
    <h1>Edit Lookbook Item</h1>
@stop

@section('content')
    <div class="card card-royal">
        <form action="{{ route('lookbook.update', $lookbook->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="card-body">
                <div class="form-group">
                    <label for="image">Image URL</label>
                    <input type="text" name="image" class="form-control @error('image') is-invalid @enderror" id="image" placeholder="Enter image URL" value="{{ old('image', $lookbook->image) }}" required>
                    @error('image')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="mb-3">
                    <img src="{{ Str::startsWith($lookbook->image, 'http') ? $lookbook->image : asset($lookbook->image) }}" 
                         alt="Preview" 
                         style="max-width: 150px; max-height: 200px; object-fit: cover;" 
                         class="img-thumbnail">
                </div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" class="form-control @error('title') is-invalid @enderror" id="title" placeholder="Enter title" value="{{ old('title', $lookbook->title) }}">
                    @error('title')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="category_name">Category Name</label>
                    <input type="text" name="category_name" class="form-control @error('category_name') is-invalid @enderror" id="category_name" placeholder="e.g. Winter Collection" value="{{ old('category_name', $lookbook->category_name) }}">
                    @error('category_name')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="order">Order</label>
                    <input type="number" name="order" class="form-control @error('order') is-invalid @enderror" id="order" value="{{ old('order', $lookbook->order) }}">
                    @error('order')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
            </div>
            <div class="card-footer text-right">
                <a href="{{ route('lookbook.index') }}" class="btn btn-default">Cancel</a>
                <button type="submit" class="btn btn-primary">Update Item</button>
            </div>
        </form>
    </div>
@stop
