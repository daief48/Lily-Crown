@extends('adminlte::page')

@section('title', 'Edit Hero Slide')

@section('content_header')
    <h1>Edit Hero Slide</h1>
@stop

@section('content')
<div class="container-fluid">
    <form action="{{ route('hero-slides.update', $heroSlide->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        
        <div class="luxury-grid">
            {{-- Content Information --}}
            <div class="card card-royal luxury-animate" style="animation-delay: 0.1s;">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <div>
                        <span class="luxury-header-badge">Content</span>
                        <h3 class="card-title">
                            <i class="fas fa-edit mr-2"></i> Narrative & Order
                        </h3>
                    </div>
                </div>
                <div class="card-body">
                    <div class="form-group mb-4">
                        <label for="title" class="luxury-label">Title</label>
                        <input type="text" name="title" class="form-control luxury-input @error('title') is-invalid @enderror" id="title" placeholder="Enter title" value="{{ old('title', $heroSlide->title) }}">
                        @error('title')
                            <span class="invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>
                    
                    <div class="form-group mb-4">
                        <label for="subtitle" class="luxury-label">Subtitle</label>
                        <input type="text" name="subtitle" class="form-control luxury-input @error('subtitle') is-invalid @enderror" id="subtitle" placeholder="Enter subtitle" value="{{ old('subtitle', $heroSlide->subtitle) }}">
                        @error('subtitle')
                            <span class="invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="button_text" class="luxury-label">Button Text</label>
                                <input type="text" name="button_text" class="form-control luxury-input @error('button_text') is-invalid @enderror" id="button_text" placeholder="Enter button text" value="{{ old('button_text', $heroSlide->button_text) }}">
                                @error('button_text')
                                    <span class="invalid-feedback">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="button_link" class="luxury-label">Button Link</label>
                                <input type="text" name="button_link" class="form-control luxury-input @error('button_link') is-invalid @enderror" id="button_link" placeholder="Enter button link" value="{{ old('button_link', $heroSlide->button_link) }}">
                                @error('button_link')
                                    <span class="invalid-feedback">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div class="row items-center">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="order" class="luxury-label">Display Order</label>
                                <input type="number" name="order" class="form-control luxury-input @error('order') is-invalid @enderror" id="order" value="{{ old('order', $heroSlide->order) }}">
                                @error('order')
                                    <span class="invalid-feedback">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group pt-4">
                                <div class="custom-control custom-switch luxury-switch">
                                    <input type="checkbox" name="is_active" class="custom-control-input" id="is_active" value="1" {{ $heroSlide->is_active ? 'checked' : '' }}>
                                    <label class="custom-control-label luxury-label" for="is_active">Publish Slide</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Media & Visuals --}}
            <div class="card card-royal luxury-animate" style="animation-delay: 0.2s;">
                <div class="card-header">
                    <div>
                        <span class="luxury-header-badge">Visuals</span>
                        <h3 class="card-title">
                            <i class="fas fa-image mr-2"></i> Master Background
                        </h3>
                    </div>
                </div>
                <div class="card-body">
                    {{-- Current Image Preview --}}
                    @if($heroSlide->image)
                    <div class="form-group mb-4">
                        <label class="luxury-label">Representative Backdrop</label>
                        <div class="royal-image-frame d-block">
                            <img src="{{ Str::startsWith($heroSlide->image, 'http') ? $heroSlide->image : asset($heroSlide->image) }}" 
                                 alt="Current slide backdrop" 
                                 style="width: 100%; max-height: 200px; object-fit: cover;">
                        </div>
                    </div>
                    @endif
                    
                    <div class="form-group">
                        <label for="image" class="luxury-label">Update Asset</label>
                        <div class="custom-file luxury-file">
                            <input type="file" name="image" class="custom-file-input @error('image') is-invalid @enderror" id="image" accept="image/*">
                            <label class="custom-file-label" for="image">Upload new masterpiece...</label>
                        </div>
                        <small class="text-muted mt-2 d-block">Recommended: 1920x1080 (Landscape) for full clarity. Max 5MB.</small>
                        @error('image')
                            <span class="error invalid-feedback d-block">{{ $message }}</span>
                        @enderror
                    </div>
                    
                    {{-- Live Image Preview --}}
                    <div class="form-group mt-4" id="imagePreview" style="display: none;">
                        <label class="luxury-label font-bold text-heritage-gold">
                            <i class="fas fa-magic mr-1"></i> New Visual Signature
                        </label>
                        <div class="royal-image-frame d-block">
                            <img id="preview" src="" alt="New slide preview" style="width: 100%; max-height: 200px; object-fit: cover;">
                        </div>
                    </div>
                </div>
                
                <div class="card-footer bg-transparent border-top-0 pb-4 d-flex align-items-center">
                    <button type="submit" class="btn btn-luxury px-5 shadow-sm">
                        <i class="fas fa-save mr-2"></i> Commemorate Slide
                    </button>
                    <a href="{{ route('hero-slides.index') }}" class="btn btn-outline-luxury ml-3 font-weight-bold">
                        Abandon
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
        // Update file input label and show preview
        $('#image').on('change', function() {
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
