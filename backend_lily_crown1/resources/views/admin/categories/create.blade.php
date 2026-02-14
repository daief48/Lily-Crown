@extends('adminlte::page')

@section('title', 'Add Category')

@section('content_header')
    <h1>Add Category</h1>
@stop

@section('content')
<div class="container-fluid">
    <form action="{{ route('categories.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        
        <div class="luxury-grid">
            {{-- Essential Information --}}
            <div class="card card-royal luxury-animate" style="animation-delay: 0.1s;">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <div>
                        <span class="luxury-header-badge">New Entry</span>
                        <h3 class="card-title">
                            <i class="fas fa-tag mr-2"></i> Collection Definition
                        </h3>
                    </div>
                </div>
                <div class="card-body">
                    <div class="form-group mb-4">
                        <label for="name" class="luxury-label">Display Name</label>
                        <input type="text" name="name" class="form-control luxury-input @error('name') is-invalid @enderror" id="name" placeholder="Enter collection name" value="{{ old('name') }}" required>
                        @error('name')
                            <span class="error invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>
                    
                    <div class="form-group">
                        <label for="slug" class="luxury-label">Permalinks (Slug)</label>
                        <input type="text" name="slug" class="form-control luxury-input @error('slug') is-invalid @enderror" id="slug" placeholder="automatic-slug" value="{{ old('slug') }}" required>
                        @error('slug')
                            <span class="error invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>
                </div>
            </div>

            {{-- Styling & Assets --}}
            <div class="card card-royal luxury-animate" style="animation-delay: 0.2s;">
                <div class="card-header">
                    <div>
                        <span class="luxury-header-badge">Visuals</span>
                        <h3 class="card-title">
                            <i class="fas fa-image mr-2"></i> Category Signature
                        </h3>
                    </div>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="icon" class="luxury-label">Primary Asset</label>
                        <div class="custom-file luxury-file">
                            <input type="file" name="icon" class="custom-file-input @error('icon') is-invalid @enderror" id="icon" accept="image/*">
                            <label class="custom-file-label" for="icon">Select premium icon...</label>
                        </div>
                        <small class="text-muted mt-2 d-block">Recommended: Transparent PNG or high-res JPG (Max 2MB)</small>
                        @error('icon')
                            <span class="error invalid-feedback d-block">{{ $message }}</span>
                        @enderror
                    </div>
                    
                    {{-- Image Preview --}}
                    <div class="form-group mt-4" id="imagePreview" style="display: none;">
                        <label class="luxury-label">Visual Preview</label>
                        <div class="royal-image-frame">
                            <img id="preview" src="" alt="Category preview" style="max-width: 150px; max-height: 150px;">
                        </div>
                    </div>
                </div>
                
                <div class="card-footer bg-transparent border-top-0 pb-4 d-flex align-items-center">
                    <button type="submit" class="btn btn-luxury px-5 shadow-sm">
                        <i class="fas fa-crown mr-2"></i> Create Collection
                    </button>
                    <a href="{{ route('categories.index') }}" class="btn btn-outline-luxury ml-3">
                        Discard
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
        
        // Update file input label
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
