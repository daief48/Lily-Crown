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

                <div class="card card-royal mt-4 luxury-animate" style="animation-delay: 0.45s;">
                    <div class="card-body">
                        <h3 class="section-title"><i class="fas fa-ruler mr-2"></i>Available Sizes</h3>
                        @if($sizes->isEmpty())
                            <p class="text-muted small">No sizes yet. <a href="{{ route('sizes.create') }}" target="_blank">Add sizes</a> first.</p>
                        @else
                            <div class="d-flex flex-wrap" style="gap: 10px;">
                                @foreach($sizes as $size)
                                    <label class="size-checkbox-label" style="cursor:pointer; margin-bottom:0;">
                                        <input
                                            type="checkbox"
                                            name="sizes[]"
                                            value="{{ $size->id }}"
                                            class="d-none size-checkbox"
                                            {{ in_array($size->id, old('sizes', [])) ? 'checked' : '' }}
                                        >
                                        <span class="size-badge {{ in_array($size->id, old('sizes', [])) ? 'size-badge-active' : '' }}">
                                            {{ $size->name }}
                                        </span>
                                    </label>
                                @endforeach
                            </div>
                        @endif
                    </div>
                </div>

                <div class="card card-royal mt-4 luxury-animate" style="animation-delay: 0.48s;">
                    <div class="card-body">
                        <h3 class="section-title"><i class="fas fa-palette mr-2"></i>Available Colors</h3>
                        @if($colors->isEmpty())
                            <p class="text-muted small">No colors yet. <a href="{{ route('colors.create') }}" target="_blank">Add colors</a> first.</p>
                        @else
                            <div class="d-flex flex-wrap" style="gap: 12px;">
                                @foreach($colors as $color)
                                    <label class="color-checkbox-label" style="cursor:pointer; margin-bottom:0;" title="{{ $color->name }}">
                                        <input
                                            type="checkbox"
                                            name="colors[]"
                                            value="{{ $color->id }}"
                                            class="d-none color-checkbox"
                                            {{ in_array($color->id, old('colors', [])) ? 'checked' : '' }}
                                        >
                                        <span class="color-swatch-admin {{ in_array($color->id, old('colors', [])) ? 'active' : '' }}" style="background-color: {{ $color->hex_code }};">
                                            <i class="fas fa-check"></i>
                                        </span>
                                    </label>
                                @endforeach
                            </div>
                        @endif
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

        // Size checkbox toggle
        $(document).on('change', '.size-checkbox', function() {
            var badge = $(this).siblings('.size-badge');
            if ($(this).is(':checked')) {
                badge.addClass('size-badge-active');
            } else {
                badge.removeClass('size-badge-active');
            }
        });

        // Color checkbox toggle
        $(document).on('change', '.color-checkbox', function() {
            var swatch = $(this).siblings('.color-swatch-admin');
            if ($(this).is(':checked')) {
                swatch.addClass('active');
            } else {
                swatch.removeClass('active');
            }
        });
    });
</script>
<style>
    .size-badge {
        display: inline-block;
        padding: 6px 16px;
        border: 2px solid #adb5bd;
        border-radius: 4px;
        font-weight: 700;
        font-size: 0.8rem;
        letter-spacing: 0.1em;
        color: #6c757d;
        background: #fff;
        transition: all 0.2s ease;
        user-select: none;
    }
    .size-badge-active {
        border-color: #1a5c3a;
        color: #fff;
        background: #1a5c3a;
    }
    .size-checkbox-label:hover .size-badge:not(.size-badge-active) {
        border-color: #1a5c3a;
        color: #1a5c3a;
    }

    /* Color Swatch Admin Style */
    .color-swatch-admin {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 3px solid #fff;
        box-shadow: 0 0 0 1px #ddd;
        color: transparent;
        transition: all 0.2s ease;
    }
    .color-swatch-admin.active {
        box-shadow: 0 0 0 2px #1a5c3a;
        color: #fff;
        transform: scale(1.1);
    }
    .color-swatch-admin i {
        font-size: 14px;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }
</style>
@stop
