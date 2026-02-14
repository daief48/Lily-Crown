@extends('adminlte::page')

@section('title', 'Add Product')

@section('content_header')
    <h1>Add Product</h1>
@stop

@section('content')
@section('content')
<div class="container-fluid">
    <form action="{{ route('products.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        
        <div class="luxury-grid">
            <!-- Main Column -->
            <div class="luxury-main">
                <div class="card card-royal luxury-animate" style="animation-delay: 0.1s;">
                    <div class="card-header d-flex align-items-center justify-content-between">
                        <div>
                            <span class="luxury-header-badge">Collection Addition</span>
                            <h3 class="card-title"><i class="fas fa-plus-circle mr-2"></i>Product Definition</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="form-group mb-4">
                            <label for="name" class="luxury-label">Product Name</label>
                            <input type="text" name="name" class="form-control luxury-input @error('name') is-invalid @enderror" id="name" placeholder="Enter product name" value="{{ old('name') }}" required>
                            @error('name')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group mb-4">
                            <label for="slug" class="luxury-label">URL Slug (Permalink)</label>
                            <input type="text" name="slug" class="form-control luxury-input @error('slug') is-invalid @enderror" id="slug" placeholder="product-url-slug" value="{{ old('slug') }}" required>
                            @error('slug')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="category_id" class="luxury-label">Parent Collection</label>
                            <select name="category_id" id="category_id" class="form-control luxury-input @error('category_id') is-invalid @enderror" required>
                                <option value="">Select Category</option>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                                @endforeach
                            </select>
                            @error('category_id')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <h3 class="section-title mt-5"><i class="fas fa-align-left mr-2"></i>Content & Context</h3>
                        
                        <div class="form-group mb-4">
                            <label for="description" class="luxury-label">Narrative Description</label>
                            <textarea name="description" class="form-control luxury-input @error('description') is-invalid @enderror" id="description" rows="4" placeholder="Briefly describe the product...">{{ old('description') }}</textarea>
                            @error('description')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="details" class="luxury-label">Heritage Details (One per line)</label>
                            <textarea name="details" class="form-control luxury-input @error('details') is-invalid @enderror" id="details" rows="4" placeholder="e.g. 100% Pure Silk&#10;Hand-crafted in Dhaka">{{ old('details') }}</textarea>
                            @error('details')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                </div>

                <div class="card card-royal mt-4 luxury-animate" style="animation-delay: 0.2s;">
                    <div class="card-header">
                        <div>
                            <span class="luxury-header-badge">Visual Showcase</span>
                            <h3 class="card-title"><i class="fas fa-images mr-2"></i>Media Gallery</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="gallery" class="luxury-label">Upload Gallery Images</label>
                            <div class="custom-file luxury-file">
                                <input type="file" name="gallery[]" class="custom-file-input @error('gallery.*') is-invalid @enderror" id="gallery" multiple accept="image/*">
                                <label class="custom-file-label" for="gallery">Curate gallery collection...</label>
                            </div>
                            @error('gallery.*')
                                <span class="error invalid-feedback" style="display:block">{{ $message }}</span>
                            @enderror
                            <div id="gallery-preview" class="mt-4 d-flex flex-wrap"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar Column -->
            <div class="luxury-sidebar">
                <div class="card card-royal luxury-animate" style="animation-delay: 0.3s;">
                    <div class="card-body">
                        <h3 class="section-title"><i class="fas fa-tag mr-2"></i>Commerce</h3>
                        
                        <div class="form-group mb-4">
                            <label for="price" class="luxury-label">Valuation ($)</label>
                            <input type="number" step="0.01" name="price" class="form-control luxury-input @error('price') is-invalid @enderror" id="price" placeholder="0.00" value="{{ old('price') }}" required>
                            @error('price')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="badge" class="luxury-label">Status Insignia</label>
                            <input type="text" name="badge" class="form-control luxury-input @error('badge') is-invalid @enderror" id="badge" placeholder="e.g. New Arrival" value="{{ old('badge') }}">
                            @error('badge')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                </div>

                <div class="card card-royal mt-4 luxury-animate" style="animation-delay: 0.4s;">
                    <div class="card-body">
                        <h3 class="section-title"><i class="fas fa-image mr-2"></i>Primary Visual</h3>
                        <div class="form-group">
                            <div class="custom-file luxury-file mb-4">
                                <input type="file" name="image" class="custom-file-input @error('image') is-invalid @enderror" id="image" accept="image/*">
                                <label class="custom-file-label" for="image">Upload Master Image...</label>
                            </div>
                            @error('image')
                                <span class="error invalid-feedback" style="display:block">{{ $message }}</span>
                            @enderror
                            <div id="image-preview" class="mt-3 text-center" style="display:none">
                                <div class="royal-image-frame w-100">
                                    <img src="" alt="Preview" style="max-width: 100%; height: auto;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-4 luxury-animate" style="animation-delay: 0.5s;">
                    <button type="submit" class="btn btn-luxury btn-lg btn-block shadow-sm mb-3">
                        <i class="fas fa-save mr-2"></i>Publish Product
                    </button>
                    <a href="{{ route('products.index') }}" class="btn btn-outline-luxury btn-block">
                        Discard & Return
                    </a>
                </div>
            </div>
        </div>
    </form>
</div>
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
                    $('#image-preview img').attr('src', e.target.result);
                    $('#image-preview').show();
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
                        $('#gallery-preview').append('<div class="mr-3 mb-3"><div class="royal-image-frame"><img src="' + e.target.result + '" style="height: 100px; width: 100px; object-fit: cover;"></div></div>');
                    }
                    reader.readAsDataURL(file);
                });
                $(this).next('.custom-file-label').html(files.length + ' files selected');
            }
        });
    });
</script>
@stop
