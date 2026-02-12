@extends('adminlte::page')

@section('title', 'Edit Product')

@section('content_header')
    <h1>Edit Product</h1>
@stop

@section('content')
    <div class="card card-primary">
        <form action="{{ route('products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="card-body">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" class="form-control @error('name') is-invalid @enderror" id="name" placeholder="Enter name" value="{{ old('name', $product->name) }}" required>
                    @error('name')
                        <span class="error invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="slug">Slug</label>
                    <input type="text" name="slug" class="form-control @error('slug') is-invalid @enderror" id="slug" placeholder="Enter slug" value="{{ old('slug', $product->slug) }}" required>
                    @error('slug')
                        <span class="error invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="category_id">Category</label>
                    <select name="category_id" id="category_id" class="form-control @error('category_id') is-invalid @enderror" required>
                        <option value="">Select Category</option>
                        @foreach($categories as $category)
                            <option value="{{ $category->id }}" {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                        @endforeach
                    </select>
                    @error('category_id')
                        <span class="error invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input type="number" step="0.01" name="price" class="form-control @error('price') is-invalid @enderror" id="price" placeholder="Enter price" value="{{ old('price', $product->price) }}" required>
                    @error('price')
                        <span class="error invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="badge">Badge (optional)</label>
                    <input type="text" name="badge" class="form-control @error('badge') is-invalid @enderror" id="badge" placeholder="e.g. New, Sale" value="{{ old('badge', $product->badge) }}">
                    @error('badge')
                        <span class="error invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="image">Main Image</label>
                    <div class="input-group">
                        <div class="custom-file">
                            <input type="file" name="image" class="custom-file-input @error('image') is-invalid @enderror" id="image" accept="image/*">
                            <label class="custom-file-label" for="image">Choose file</label>
                        </div>
                    </div>
                    @error('image')
                        <span class="error invalid-feedback" style="display:block">{{ $message }}</span>
                    @enderror
                    <div id="image-preview" class="mt-2">
                        @if($product->image)
                            <img src="{{ Str::startsWith($product->image, 'http') ? $product->image : asset($product->image) }}" alt="Preview" class="img-thumbnail" style="max-height: 200px;">
                        @else
                            <img src="" alt="Preview" class="img-thumbnail" style="max-height: 200px; display:none">
                        @endif
                    </div>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea name="description" class="form-control @error('description') is-invalid @enderror" id="description" rows="3">{{ old('description', $product->description) }}</textarea>
                    @error('description')
                        <span class="error invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="gallery">Gallery Images (Uploading new files will replace existing ones)</label>
                    <div class="input-group">
                        <div class="custom-file">
                            <input type="file" name="gallery[]" class="custom-file-input @error('gallery.*') is-invalid @enderror" id="gallery" multiple accept="image/*">
                            <label class="custom-file-label" for="gallery">Choose files</label>
                        </div>
                    </div>
                    @error('gallery.*')
                        <span class="error invalid-feedback" style="display:block">{{ $message }}</span>
                    @enderror
                    <div id="gallery-preview" class="mt-2 d-flex flex-wrap">
                        @if($product->getRawOriginal('gallery'))
                            @php
                                $gallery = is_string($product->getRawOriginal('gallery')) ? json_decode($product->getRawOriginal('gallery'), true) : $product->getRawOriginal('gallery');
                            @endphp
                            @if(is_array($gallery))
                                @foreach($gallery as $img)
                                    <div class="mr-2 mb-2">
                                        <img src="{{ Str::startsWith($img['url'], 'http') ? $img['url'] : asset($img['url']) }}" class="img-thumbnail" style="height: 100px; width: 100px; object-fit: cover;">
                                    </div>
                                @endforeach
                            @endif
                        @endif
                    </div>
                </div>
                <div class="form-group">
                    <label for="details">Details (Strings separated by newline)</label>
                    <textarea name="details" class="form-control @error('details') is-invalid @enderror" id="details" rows="3" placeholder="e.g. Hand-woven&#10;Pure Cotton">{{ old('details', $product->details) }}</textarea>
                    @error('details')
                        <span class="error invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
            </div>

            <div class="card-footer">
                <button type="submit" class="btn btn-primary">Update</button>
                <a href="{{ route('products.index') }}" class="btn btn-default">Cancel</a>
            </div>
        </form>
    </div>
@stop

@section('js')
<script>
    $(function() {
        // Slug generation
        $('#name').on('keyup', function() {
            var slug = $(this).val().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            $('#slug').val(slug);
        });

        // Main image preview
        $('#image').on('change', function() {
            var file = this.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#image-preview img').attr('src', e.target.result).show();
                }
                reader.readAsDataURL(file);
                $(this).next('.custom-file-label').html(file.name);
            }
        });

        // Gallery preview
        $('#gallery').on('change', function() {
            $('#gallery-preview').html('');
            var files = this.files;
            if (files.length > 0) {
                $.each(files, function(i, file) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $('#gallery-preview').append('<div class="mr-2 mb-2"><img src="' + e.target.result + '" class="img-thumbnail" style="height: 100px; width: 100px; object-fit: cover;"></div>');
                    }
                    reader.readAsDataURL(file);
                });
                $(this).next('.custom-file-label').html(files.length + ' files selected');
            }
        });
    });
</script>
@stop
