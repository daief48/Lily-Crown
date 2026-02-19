@extends('adminlte::page')

@section('title', 'Add Testimonial')

@section('content_header')
    <h1>Add Testimonial</h1>
@stop

@section('content')
    <div class="card card-royal">
        <form action="{{ route('testimonials.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group mb-4">
                            <label for="author" class="luxury-label">Author Name</label>
                            <input type="text" name="author" class="form-control luxury-input @error('author') is-invalid @enderror" id="author" placeholder="Enter author name" value="{{ old('author') }}" required>
                            @error('author')
                                <span class="invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group mb-4">
                            <label for="role" class="luxury-label">Role / Position</label>
                            <input type="text" name="role" class="form-control luxury-input @error('role') is-invalid @enderror" id="role" placeholder="e.g. Royal Customer" value="{{ old('role') }}">
                            @error('role')
                                <span class="invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                </div>

                <div class="form-group mb-4">
                    <label for="image" class="luxury-label">Author Portrait</label>
                    <div class="custom-file luxury-file">
                        <input type="file" name="image" class="custom-file-input @error('image') is-invalid @enderror" id="image" accept="image/*">
                        <label class="custom-file-label" for="image">Choose portrait...</label>
                    </div>
                    @error('image')
                        <span class="invalid-feedback d-block">{{ $message }}</span>
                    @enderror
                    
                    <div class="mt-3" id="imagePreview" style="display: none;">
                        <div class="royal-image-frame" style="width: 100px; height: 100px;">
                            <img id="preview" src="" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="quote" class="luxury-label">The Testimony</label>
                    <textarea name="quote" class="form-control luxury-input @error('quote') is-invalid @enderror" id="quote" rows="4" placeholder="Enter customer quote" required>{{ old('quote') }}</textarea>
                    @error('quote')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
            </div>
            <div class="card-footer text-right bg-transparent border-top-0 pb-4">
                <a href="{{ route('testimonials.index') }}" class="btn btn-outline-luxury mr-2">Cancel</a>
                <button type="submit" class="btn btn-luxury px-5">Save Testimonial</button>
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
