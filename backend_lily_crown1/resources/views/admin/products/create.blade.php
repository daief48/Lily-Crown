@extends('adminlte::page')

@section('title', 'Add Product')

@section('content_header')
    <h1>Add Product</h1>
@stop

@section('content')
    <form action="{{ route('products.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        
        <div class="luxury-grid">
            <!-- Main Column -->
            <div class="luxury-main">
                <div class="card card-outline card-primary card-royal">
                    <div class="card-body">
                        <h3 class="section-title"><i class="fas fa-info-circle mr-2"></i>Basic Information</h3>
                        
                        <div class="form-group">
                            <label for="name">Product Name</label>
                            <input type="text" name="name" class="form-control @error('name') is-invalid @enderror" id="name" placeholder="Enter product name" value="{{ old('name') }}" required>
                            @error('name')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="slug">URL Slug</label>
                            <input type="text" name="slug" class="form-control @error('slug') is-invalid @enderror" id="slug" placeholder="product-url-slug" value="{{ old('slug') }}" required>
                            @error('slug')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="category_id">Category</label>
                            <select name="category_id" id="category_id" class="form-control @error('category_id') is-invalid @enderror" required>
                                <option value="">Select Category</option>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                                @endforeach
                            </select>
                            @error('category_id')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <h3 class="section-title mt-4"><i class="fas fa-align-left mr-2"></i>Product Details</h3>
                        
                        <div class="form-group">
                            <label for="description">Short Description</label>
                            <textarea name="description" class="form-control @error('description') is-invalid @enderror" id="description" rows="4" placeholder="Briefly describe the product...">{{ old('description') }}</textarea>
                            @error('description')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="details">Key Details (One per line)</label>
                            <textarea name="details" class="form-control @error('details') is-invalid @enderror" id="details" rows="4" placeholder="e.g. 100% Pure Silk&#10;Hand-crafted in Dhaka">{{ old('details') }}</textarea>
                            @error('details')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                </div>

                <div class="card card-outline card-primary mt-4">
                    <div class="card-body">
                        <h3 class="section-title"><i class="fas fa-images mr-2"></i>Product Media Gallery</h3>
                        <div class="form-group">
                            <label for="gallery">Upload Gallery Images</label>
                            <div class="custom-file">
                                <input type="file" name="gallery[]" class="custom-file-input @error('gallery.*') is-invalid @enderror" id="gallery" multiple accept="image/*">
                                <label class="custom-file-label" for="gallery">Select multiple images</label>
                            </div>
                            @error('gallery.*')
                                <span class="error invalid-feedback" style="display:block">{{ $message }}</span>
                            @enderror
                            <div id="gallery-preview" class="mt-3 d-flex flex-wrap"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar Column -->
            <div class="luxury-sidebar">
                <div class="card card-outline card-primary card-royal">
                    <div class="card-body">
                        <h3 class="section-title"><i class="fas fa-tag mr-2"></i>Pricing & Status</h3>
                        
                        <div class="form-group">
                            <label for="price">Regular Price ($)</label>
                            <input type="number" step="0.01" name="price" class="form-control @error('price') is-invalid @enderror" id="price" placeholder="0.00" value="{{ old('price') }}" required>
                            @error('price')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="badge">Sale Badge</label>
                            <input type="text" name="badge" class="form-control @error('badge') is-invalid @enderror" id="badge" placeholder="e.g. New Arrival" value="{{ old('badge') }}">
                            @error('badge')
                                <span class="error invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                </div>

                <div class="card card-outline card-primary mt-4">
                    <div class="card-body">
                        <h3 class="section-title"><i class="fas fa-image mr-2"></i>Main Image</h3>
                        <div class="form-group">
                            <div class="custom-file">
                                <input type="file" name="image" class="custom-file-input @error('image') is-invalid @enderror" id="image" accept="image/*">
                                <label class="custom-file-label" for="image">Upload main image</label>
                            </div>
                            @error('image')
                                <span class="error invalid-feedback" style="display:block">{{ $message }}</span>
                            @enderror
                            <div id="image-preview" class="mt-3 text-center" style="display:none">
                                <img src="" alt="Preview" class="img-thumbnail shadow-sm" style="max-width: 100%; height: auto;">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-4">
                    <button type="submit" class="btn btn-primary btn-lg btn-block">
                        <i class="fas fa-save mr-2"></i>Publish Product
                    </button>
                    <a href="{{ route('products.index') }}" class="btn btn-default btn-block mt-2">
                        Cancel & Return
                    </a>
                </div>
            </div>
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
