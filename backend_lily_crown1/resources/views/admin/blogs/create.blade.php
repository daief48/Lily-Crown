@extends('adminlte::page')

@section('title', 'Add Blog Post')

@section('content_header')
    <h1>Add Blog Post</h1>
@stop

@section('content')
<div class="container-fluid">
    <form action="{{ route('blogs.store') }}" method="POST">
        @csrf
        
        <div class="luxury-grid">
            {{-- Main Content Section --}}
            <div class="card card-royal">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-feather-alt mr-2"></i> Story Content
                    </h3>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="title" class="luxury-label">Post Title</label>
                        <input type="text" name="title" class="form-control luxury-input @error('title') is-invalid @enderror" id="title" placeholder="Enter post title" value="{{ old('title') }}" required>
                        @error('title')
                            <span class="error invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>
                    
                    <div class="form-group">
                        <label for="content" class="luxury-label">Narrative</label>
                        <textarea name="content" class="form-control luxury-input @error('content') is-invalid @enderror" id="content" rows="12" placeholder="Write your royal story...">{{ old('content') }}</textarea>
                        @error('content')
                            <span class="error invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>
                </div>
            </div>

            {{-- Metadata & Visuals --}}
            <div class="card card-royal">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-cog mr-2"></i> Settings & Visuals
                    </h3>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="slug" class="luxury-label">Slug</label>
                        <input type="text" name="slug" class="form-control luxury-input @error('slug') is-invalid @enderror" id="slug" placeholder="automatic-slug" value="{{ old('slug') }}" required>
                        @error('slug')
                            <span class="error invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="thumbnail" class="luxury-label">Cover Image URL</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-transparent border-right-0">
                                    <i class="fas fa-image text-gold-accent"></i>
                                </span>
                            </div>
                            <input type="text" name="thumbnail" class="form-control luxury-input border-left-0 @error('thumbnail') is-invalid @enderror" id="thumbnail" placeholder="Enter image URL" value="{{ old('thumbnail') }}">
                        </div>
                        <div id="thumbnail-preview" class="mt-3 text-center d-none">
                            <img src="" alt="Thumbnail Preview" class="img-fluid rounded-lg shadow-sm border border-gold-accent/20" style="max-height: 200px;">
                        </div>
                        @error('thumbnail')
                            <span class="error invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>
                </div>
                
                <div class="card-footer bg-transparent border-top-0 pb-4 mt-auto">
                    <button type="submit" class="btn btn-luxury px-5 btn-block">
                        <i class="fas fa-paper-plane mr-2"></i> Publish Post
                    </button>
                    <a href="{{ route('blogs.index') }}" class="btn btn-outline-luxury btn-block mt-2">
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
        $('#title').on('keyup', function() {
            var slug = $(this).val().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            $('#slug').val(slug);
        });
    });
</script>
@stop
