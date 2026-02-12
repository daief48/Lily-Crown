@extends('adminlte::page')

@section('title', 'Edit Blog Post')

@section('content_header')
    <h1>Edit Blog Post</h1>
@stop

@section('content')
    <div class="card card-primary">
        <form action="{{ route('blogs.update', $blog->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="card-body">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" class="form-control @error('title') is-invalid @enderror" id="title" placeholder="Enter title" value="{{ old('title', $blog->title) }}" required>
                    @error('title')
                        <span class="error invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="slug">Slug</label>
                    <input type="text" name="slug" class="form-control @error('slug') is-invalid @enderror" id="slug" placeholder="Enter slug" value="{{ old('slug', $blog->slug) }}" required>
                    @error('slug')
                        <span class="error invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="thumbnail">Thumbnail Image URL</label>
                    <input type="text" name="thumbnail" class="form-control @error('thumbnail') is-invalid @enderror" id="thumbnail" placeholder="Enter image URL" value="{{ old('thumbnail', $blog->thumbnail) }}">
                    @error('thumbnail')
                        <span class="error invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="content">Content</label>
                    <textarea name="content" class="form-control @error('content') is-invalid @enderror" id="content" rows="10">{{ old('content', $blog->content) }}</textarea>
                    @error('content')
                        <span class="error invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
            </div>

            <div class="card-footer">
                <button type="submit" class="btn btn-primary">Update</button>
                <a href="{{ route('blogs.index') }}" class="btn btn-default">Cancel</a>
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
