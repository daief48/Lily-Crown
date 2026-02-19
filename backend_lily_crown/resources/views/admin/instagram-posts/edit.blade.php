@extends('adminlte::page')

@section('title', 'Edit Instagram Post')

@section('content_header')
    <h1>Edit Instagram Post</h1>
@stop

@section('content')
    <div class="card card-royal">
        <form action="{{ route('instagram-posts.update', $instagramPost->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="card-body">
                <div class="form-group">
                    <label for="image_file">Upload Image (leave empty to keep existing)</label>
                    <input type="file" name="image_file" class="form-control @error('image_file') is-invalid @enderror" id="image_file" accept="image/*">
                    @error('image_file')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="mb-3">
                    <img id="preview-image-edit" src="{{ Str::startsWith($instagramPost->image, 'http') ? $instagramPost->image : asset($instagramPost->image) }}" 
                         alt="Preview" 
                         style="max-width: 150px; max-height: 150px; object-fit: cover;" 
                         class="img-thumbnail">
                </div>
                <div class="form-group">
                    <label for="link">Instagram Link</label>
                    <input type="text" name="link" class="form-control @error('link') is-invalid @enderror" id="link" placeholder="Enter Instagram post link" value="{{ old('link', $instagramPost->link) }}">
                    @error('link')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="caption">Caption</label>
                    <textarea name="caption" class="form-control @error('caption') is-invalid @enderror" id="caption" rows="3" placeholder="Enter post caption">{{ old('caption', $instagramPost->caption) }}</textarea>
                    @error('caption')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
            </div>
            <div class="card-footer text-right">
                <a href="{{ route('instagram-posts.index') }}" class="btn btn-default">Cancel</a>
                <button type="submit" class="btn btn-primary">Update Post</button>
            </div>
        </form>
    </div>
    <script>
        (function () {
            const input = document.getElementById('image_file');
            const preview = document.getElementById('preview-image-edit');
            if (!input) return;

            input.addEventListener('change', function () {
                const file = this.files && this.files[0];
                if (!file) {
                    return; // keep existing preview
                }

                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            });
        })();
    </script>
@stop
