@extends('adminlte::page')

@section('title', 'Edit Category')

@section('content_header')
    <h1>Edit Category</h1>
@stop

@section('content')
<div class="container-fluid">
    <form action="{{ route('categories.update', $category->id) }}\" method=\"POST\" enctype=\"multipart/form-data\">
        @csrf
        @method('PUT')
        
        <div class="luxury-grid">
            {{-- Essential Information --}}
            <div class="card card-royal">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-edit mr-2"></i> Modify Collection
                    </h3>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="name" class="luxury-label">Name</label>
                        <input type="text" name="name" class="form-control luxury-input @error('name') is-invalid @enderror" id="name" placeholder="Enter collection name" value="{{ old('name', $category->name) }}" required>
                        @error('name')
                            <span class="error invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>
                    
                    <div class="form-group">
                        <label for="slug" class="luxury-label">Slug</label>
                        <input type="text" name="slug" class="form-control luxury-input @error('slug') is-invalid @enderror" id="slug" placeholder="automatic-slug" value="{{ old('slug', $category->slug) }}" required>
                        @error('slug')
                            <span class="error invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>
                </div>
            </div>

            {{-- Styling & Assets --}}
            <div class="card card-royal">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-image mr-2"></i> Category Image
                    </h3>
                </div>
                <div class="card-body">
                    @if($category->icon)
                    <div class="form-group">
                        <label class="luxury-label">Current Image</label>
                        <div>
                            <img src="{{ asset($category->icon) }}" alt="{{ $category->name }}" style="max-width: 200px; max-height: 200px; border-radius: 8px; border: 2px solid #d4af37;">
                        </div>
                    </div>
                    @endif
                    
                    <div class="form-group">
                        <label for="icon" class="luxury-label">Category Image {{ $category->icon ? '(Change)' : '' }}</label>
                        <div class="custom-file">
                            <input type="file" name="icon" class="custom-file-input @error('icon') is-invalid @enderror" id="icon" accept="image/*">
                            <label class="custom-file-label" for="icon">Choose image file</label>
                        </div>
                        <small class="text-muted mt-2 d-block">Upload a category icon image (PNG, JPG, SVG recommended)</small>
                        @error('icon')
                            <span class="error invalid-feedback d-block">{{ $message }}</span>
                        @enderror
                    </div>
                    
                    {{-- Image Preview --}}
                    <div class="form-group" id="imagePreview" style="display: none;">
                        <label class="luxury-label">New Preview</label>
                        <div>
                            <img id="preview" src="" alt="Category preview" style="max-width: 200px; max-height: 200px; border-radius: 8px; border: 2px solid #d4af37;">
                        </div>
                    </div>
                </div>
                
                <div class="card-footer bg-transparent border-top-0 pb-4">
                    <button type="submit" class="btn btn-luxury px-5">
                        <i class="fas fa-save mr-2"></i> Update Collection
                    </button>
                    <a href="{{ route('categories.index') }}" class="btn btn-outline-luxury ml-2">
                        Cancel
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
        // Auto-generate slug from name
        $('#name').on('keyup', function() {
            var slug = $(this).val().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            $('#slug').val(slug);
        });
        
        // Update file input label and show preview
        $('#icon').on('change', function() {
            var fileName = $(this).val().split('\\').pop();
            $(this).next('.custom-file-label').html(fileName);
            
            // Show image preview
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#preview').attr('src', e.target.result);
                    $('#imagePreview').show();
                }
                reader.readAsDataURL(this.files[0]);
            }
        });
    });
</script>
@stop
