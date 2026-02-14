@extends('adminlte::page')

@section('title', 'Add Lookbook Item')

@section('content_header')
    <h1>Add Lookbook Item</h1>
@stop

@section('content')
    <div class="card card-royal">
        <form action="{{ route('lookbook.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="card-body">
                <div class="form-group">
                    <label for="image">Lookbook Image</label>
                    <div class="input-group">
                        <div class="custom-file">
                            <input type="file" name="image" class="custom-file-input @error('image') is-invalid @enderror" id="image" onchange="previewImage(this)" required>
                            <label class="custom-file-label" for="image">Choose royal image...</label>
                        </div>
                    </div>
                    @error('image')
                        <span class="text-danger small">{{ $message }}</span>
                    @enderror
                </div>

                <div id="imagePreviewContainer" class="mb-4 d-none">
                    <label>Image Preview</label>
                    <div class="nakshi-border p-1 d-inline-block bg-white shadow-sm" style="border-radius: 12px; overflow: hidden;">
                        <img id="image-preview" src="#" alt="Preview" 
                             style="max-width: 200px; max-height: 250px; object-fit: cover; border-radius: 8px;" 
                             class="d-block">
                    </div>
                </div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" class="form-control @error('title') is-invalid @enderror" id="title" placeholder="Enter title" value="{{ old('title') }}">
                    @error('title')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="row">
                    <div class="col-md-9">
                        <div class="form-group">
                            <label for="product_id">Linked Product (Optional)</label>
                            <select name="product_id" id="product_id" class="form-control select2 @error('product_id') is-invalid @enderror">
                                <option value="">-- No Product (Link will be inactive) --</option>
                                @foreach($products as $product)
                                    <option value="{{ $product->id }}" {{ old('product_id') == $product->id ? 'selected' : '' }}>
                                        {{ $product->name }} (Price: {{ $product->price }})
                                    </option>
                                @endforeach
                            </select>
                            @error('product_id')
                                <span class="invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="product_id_text">Product ID</label>
                            <input type="text" id="product_id_text" class="form-control" placeholder="ID" value="{{ old('product_id') }}">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="category_name">Category Name</label>
                    <input type="text" name="category_name" class="form-control @error('category_name') is-invalid @enderror" id="category_name" placeholder="e.g. Winter Collection" value="{{ old('category_name') }}">
                    @error('category_name')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="order">Order</label>
                    <input type="number" name="order" class="form-control @error('order') is-invalid @enderror" id="order" value="{{ old('order', 0) }}">
                    @error('order')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>
            </div>
            <div class="card-footer text-right">
                <a href="{{ route('lookbook.index') }}" class="btn btn-default">Cancel</a>
                <button type="submit" class="btn btn-primary">Save Item</button>
            </div>
        </form>
    </div>
@stop

@section('js')
<script>
    $(document).ready(function() {
        $('#product_id').select2({
            theme: 'bootstrap4',
            placeholder: 'Search for a royal product...',
            allowClear: true
        });

        // Sync Dropdown to Text Input
        $('#product_id').on('change', function() {
            var selectedId = $(this).val();
            $('#product_id_text').val(selectedId);
        });

        // Sync Text Input to Dropdown
        $('#product_id_text').on('input', function() {
            var inputId = $(this).val();
            if ($('#product_id option[value="' + inputId + '"]').length > 0) {
                $('#product_id').val(inputId).trigger('change.select2');
            } else if (inputId === '') {
                $('#product_id').val('').trigger('change.select2');
            }
        });
    });

    function previewImage(input) {
        const preview = document.getElementById('image-preview');
        const container = document.getElementById('imagePreviewContainer');
        const label = input.nextElementSibling;
        
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                preview.src = e.target.result;
                container.classList.remove('d-none');
            }
            
            reader.readAsDataURL(input.files[0]);
            label.innerText = input.files[0].name;
        }
    }
</script>
@stop
