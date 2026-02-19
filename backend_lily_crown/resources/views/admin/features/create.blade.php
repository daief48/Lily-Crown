@extends('adminlte::page')

@section('title', 'Add Feature')

@section('content_header')
    <h1>Add Feature</h1>
@stop

@section('content')
    <div class="card card-royal">
        <form action="{{ route('features.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group mb-4">
                            <label for="title" class="luxury-label">Title</label>
                            <input type="text" name="title" class="form-control luxury-input @error('title') is-invalid @enderror" id="title" placeholder="Enter title" value="{{ old('title') }}" required>
                            @error('title')
                                <span class="invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group mb-4">
                            <label for="icon" class="luxury-label">Icon Class (FontAwesome)</label>
                            <input type="text" name="icon" class="form-control luxury-input @error('icon') is-invalid @enderror" id="icon" placeholder="e.g. fas fa-shipping-fast" value="{{ old('icon') }}">
                            @error('icon')
                                <span class="invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                </div>

                <div class="form-group mb-4">
                    <label for="image" class="luxury-label">Brand Graphic (Optional)</label>
                    <div class="custom-file luxury-file">
                        <input type="file" name="image" class="custom-file-input @error('image') is-invalid @enderror" id="image" accept="image/*">
                        <label class="custom-file-label" for="image">Choose graphic...</label>
                    </div>
                    <small class="text-muted mt-2 d-block">If uploaded, this will take priority over the icon class.</small>
                    @error('image')
                        <span class="invalid-feedback d-block">{{ $message }}</span>
                    @enderror
                    
                    <div class="mt-3" id="imagePreview" style="display: none;">
                        <div class="royal-image-frame" style="width: 80px; height: 80px;">
                            <img id="preview" src="" alt="Preview" style="width: 100%; height: 100%; object-fit: contain;">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="description" class="luxury-label">Description</label>
                    <textarea name="description" class="form-control luxury-input @error('description') is-invalid @enderror" id="description" rows="3" placeholder="Enter feature description">{{ old('description') }}</textarea>
                    @error('description')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
            </div>
            <div class="card-footer text-right bg-transparent border-top-0 pb-4">
                <a href="{{ route('features.index') }}" class="btn btn-outline-luxury mr-2">Cancel</a>
                <button type="submit" class="btn btn-luxury px-5">Save Feature</button>
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
                $('#preview').attr('src', e.target.result);
                $('#imagePreview').show();
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
</script>
@stop
@stop
