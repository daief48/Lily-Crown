@extends('adminlte::page')

@section('title', 'Add Instagram Post')

@section('content_header')
    <h1>Add Instagram Post</h1>
@stop

@section('content')
    <div class="card card-royal">
        <form action="{{ route('instagram-posts.store') }}" method="POST">
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
                    <label for="link">Instagram Link</label>
                    <input type="text" name="link" class="form-control @error('link') is-invalid @enderror" id="link" placeholder="Enter Instagram post link" value="{{ old('link') }}">
                    @error('link')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="caption">Caption</label>
                    <textarea name="caption" class="form-control @error('caption') is-invalid @enderror" id="caption" rows="3" placeholder="Enter post caption">{{ old('caption') }}</textarea>
                    @error('caption')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
            </div>
            <div class="card-footer text-right">
                <a href="{{ route('instagram-posts.index') }}" class="btn btn-default">Cancel</a>
                <button type="submit" class="btn btn-primary">Save Post</button>
            </div>
        </form>
    </div>
@stop
