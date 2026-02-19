@extends('adminlte::page')

@section('title', 'Edit Feature')

@section('content_header')
    <h1>Edit Feature</h1>
@stop

@section('content')
    <div class="card card-royal">
        <form action="{{ route('features.update', $feature->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group mb-4">
                            <label for="title" class="luxury-label">Title</label>
                            <input type="text" name="title" class="form-control luxury-input @error('title') is-invalid @enderror" id="title" placeholder="Enter title" value="{{ old('title', $feature->title) }}" required>
                            @error('title')
                                <span class="invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group mb-4">
                            <label for="icon" class="luxury-label">Icon Class (FontAwesome)</label>
                            <input type="text" name="icon" class="form-control luxury-input @error('icon') is-invalid @enderror" id="icon" placeholder="e.g. fas fa-shipping-fast" value="{{ old('icon', $feature->icon) }}">
                            @error('icon')
                                <span class="invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                </div>

                <div class="form-group mb-4">
                    <label for="image" class="luxury-label">Brand Graphic (Optional Update)</label>
                    <div class="custom-file luxury-file">
                        <input type="file" name="image" class="custom-file-input @error('image') is-invalid @enderror" id="image" accept="image/*">
                        <label class="custom-file-label" for="image">Choose new graphic...</label>
                    </div>
                    <small class="text-muted mt-2 d-block">Uploaded images take priority over icon classes.</small>
                    @error('image')
                        <span class="invalid-feedback d-block">{{ $message }}</span>
                    @enderror
                    
                    <div class="mt-3">
                        <label class="luxury-label text-sm text-muted">Current / New Graphic:</label>
                        <div class="royal-image-frame" style="width: 80px; height: 80px;">
                            <img id="preview" src="{{ $feature->image ? (Str::startsWith($feature->image, 'http') ? $feature->image : asset($feature->image)) : '' }}" 
                                 alt="Preview" 
                                 style="width: 100%; height: 100%; object-fit: contain; {{ $feature->image ? '' : 'display: none;' }}">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="description" class="luxury-label">Description</label>
                    <textarea name="description" class="form-control luxury-input @error('description') is-invalid @enderror" id="description" rows="3" placeholder="Enter feature description">{{ old('description', $feature->description) }}</textarea>
                    @error('description')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
            </div>
            <div class="card-footer text-right bg-transparent border-top-0 pb-4">
                <a href="{{ route('features.index') }}" class="btn btn-outline-luxury mr-2">Cancel</a>
                <button type="submit" class="btn btn-luxury px-5">Update Feature</button>
            </div>
        </form>
    </div>
</div>

@section('js')
<script>
    $('#image').on('change', function() {
        var fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').html(fileName);
        
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#preview').attr('src', e.target.result).show();
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
</script>
@stop
@stop
