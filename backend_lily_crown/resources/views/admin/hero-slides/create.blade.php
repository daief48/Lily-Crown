@extends('adminlte::page')

@section('title', 'Add Hero Slide')
@section('plugins.Select2', true)

@section('content_header')
    <h1>Add Hero Slide</h1>
@stop

@section('content')
<div class="container-fluid">
    <form action="{{ route('hero-slides.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        
        <div class="luxury-grid">
            {{-- Content Information --}}
            <div class="card card-royal luxury-animate" style="animation-delay: 0.1s;">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <div>
                        <span class="luxury-header-badge">New Narrative</span>
                        <h3 class="card-title">
                            <i class="fas fa-plus-circle mr-2"></i> Creation Sanctuary
                        </h3>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group mb-4">
                                <label for="title" class="luxury-label">Title</label>
                                <input type="text" name="title" class="form-control luxury-input @error('title') is-invalid @enderror" id="title" placeholder="Enter headline title" value="{{ old('title') }}">
                                @error('title')
                                    <span class="error invalid-feedback">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-4">
                                <label for="highlight" class="luxury-label">Highlight Word</label>
                                <input type="text" name="highlight" class="form-control luxury-input @error('highlight') is-invalid @enderror" id="highlight" placeholder="e.g. Royal" value="{{ old('highlight') }}">
                                @error('highlight')
                                    <span class="error invalid-feedback">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group mb-4">
                        <label for="subtitle" class="luxury-label">Subtitle</label>
                        <input type="text" name="subtitle" class="form-control luxury-input @error('subtitle') is-invalid @enderror" id="subtitle" placeholder="Enter compelling subtitle" value="{{ old('subtitle') }}">
                        @error('subtitle')
                            <span class="error invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group mb-4">
                                <label for="button_text" class="luxury-label">CTA Text</label>
                                <input type="text" name="button_text" class="form-control luxury-input @error('button_text') is-invalid @enderror" id="button_text" placeholder="e.g. Explore Now" value="{{ old('button_text', 'Explore Now') }}">
                                @error('button_text')
                                    <span class="error invalid-feedback">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="form-group mb-4">
                                <label class="luxury-label d-flex justify-content-between">
                                    <span>Link Destination</span>
                                    <div class="custom-control custom-checkbox custom-control-inline mr-0">
                                        <input type="checkbox" class="custom-control-input" id="use_custom_link" {{ old('button_link') && !old('product_id') ? 'checked' : '' }}>
                                        <label class="custom-control-label font-weight-normal text-xs" for="use_custom_link">Use Custom URL</label>
                                    </div>
                                </label>
                                
                                <div id="product_select_wrapper">
                                    <select name="product_id" id="product_id" class="form-control luxury-input select2">
                                        <option value="">-- Search & Select Product --</option>
                                        @foreach($products as $product)
                                            <option value="{{ $product->id }}" {{ old('product_id') == $product->id ? 'selected' : '' }}>
                                                {{ $product->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                
                                <div id="custom_link_wrapper" style="display: none;">
                                    <input type="text" name="button_link" class="form-control luxury-input @error('button_link') is-invalid @enderror" id="button_link" placeholder="e.g. /shop or https://..." value="{{ old('button_link') }}">
                                </div>
                                
                                <small class="text-muted mt-1 d-block" id="link_hint">
                                    Select a product to automatically generate the link.
                                </small>
                            </div>
                        </div>
                    </div>

                    <div class="row items-center">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="order" class="luxury-label">Sequence Position</label>
                                <input type="number" name="order" class="form-control luxury-input @error('order') is-invalid @enderror" id="order" value="{{ old('order', 0) }}">
                                @error('order')
                                    <span class="error invalid-feedback">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group pt-4">
                                <div class="custom-control custom-switch luxury-switch">
                                    <input type="checkbox" name="is_active" class="custom-control-input" id="is_active" value="1" checked>
                                    <label class="custom-control-label luxury-label" for="is_active">Make Active on Creation</label>
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
                        <span class="luxury-header-badge">Master Media</span>
                        <h3 class="card-title">
                            <i class="fas fa-image mr-2"></i> Visual Composition
                        </h3>
                    </div>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="image" class="luxury-label">The Backdrop Asset</label>
                        <div class="custom-file luxury-file">
                            <input type="file" name="image" class="custom-file-input @error('image') is-invalid @enderror" id="image" accept="image/*" required>
                            <label class="custom-file-label" for="image">Choose masterpiece...</label>
                        </div>
                        <small class="text-muted mt-2 d-block">Required: 1920x1080 Landscape. High resolution suggested. Max 5MB.</small>
                        @error('image')
                            <span class="error invalid-feedback d-block">{{ $message }}</span>
                        @enderror
                    </div>
                    
                    {{-- Image Preview --}}
                    <div class="form-group mt-4" id="imagePreview" style="display: none;">
                        <label class="luxury-label font-bold text-heritage-gold">
                            <i class="fas fa-magic mr-1"></i> Visual Identity Preview
                        </label>
                        <div class="royal-image-frame d-block">
                            <img id="preview" src="" alt="Slide preview" style="width: 100%; max-height: 200px; object-fit: cover;">
                        </div>
                    </div>
                </div>
                
                <div class="card-footer bg-transparent border-top-0 pb-4 d-flex align-items-center">
                    <button type="submit" class="btn btn-luxury px-5 shadow-sm">
                        <i class="fas fa-magic mr-2"></i> Manifest Slide
                    </button>
                    <a href="{{ route('hero-slides.index') }}" class="btn btn-outline-luxury ml-3 font-weight-bold">
                        Withdraw
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
        // Initialize Select2
        $('.select2').select2({
            theme: 'bootstrap4',
            width: '100%',
            placeholder: "-- Optional: Select Product --",
            allowClear: true
        });

        // Unified Link Logic
        function toggleLinkType() {
            if ($('#use_custom_link').is(':checked')) {
                $('#product_select_wrapper').hide();
                $('#custom_link_wrapper').show();
                $('#product_id').val(null).trigger('change');
                $('#link_hint').text('Enter a manual URL or path for the button.');
            } else {
                $('#product_select_wrapper').show();
                $('#custom_link_wrapper').hide();
                $('#button_link').val('');
                $('#link_hint').text('Select a product to automatically generate the link.');
            }
        }

        $('#use_custom_link').on('change', toggleLinkType);

        // Initial state
        if ($('#use_custom_link').is(':checked')) {
            toggleLinkType();
        }

        // Auto-fill button text when product selected
        $('#product_id').on('change', function() {
            const productId = $(this).val();
            if (productId && !$('#button_text').val()) {
                $('#button_text').val('Buy Now');
            }
        });

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
