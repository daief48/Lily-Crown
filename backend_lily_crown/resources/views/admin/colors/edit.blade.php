@extends('adminlte::page')

@section('title', 'Edit Color')

@section('content_header')
    <h1>Edit Color</h1>
@stop

@section('content')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card card-royal luxury-animate">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <div>
                        <span class="luxury-header-badge">Color Palette</span>
                        <h3 class="card-title"><i class="fas fa-edit mr-2"></i>Edit Color</h3>
                    </div>
                </div>
                <div class="card-body">
                    <form action="{{ route('colors.update', $color->id) }}" method="POST">
                        @csrf
                        @method('PUT')

                        <div class="form-group mb-4">
                            <label for="name" class="luxury-label">Color Name</label>
                            <input type="text" name="name" id="name" class="form-control luxury-input @error('name') is-invalid @enderror" value="{{ old('name', $color->name) }}" required>
                            @error('name')
                                <span class="invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group mb-4">
                            <label for="hex_code" class="luxury-label">HEX Code</label>
                            <div class="input-group">
                                <input type="text" name="hex_code" id="hex_code" class="form-control luxury-input @error('hex_code') is-invalid @enderror" value="{{ old('hex_code', $color->hex_code) }}" required>
                                <div class="input-group-append">
                                    <input type="color" id="color_picker" class="form-control" style="width: 50px; padding: 0; border-radius: 0 4px 4px 0;" value="{{ old('hex_code', $color->hex_code) }}">
                                </div>
                            </div>
                            @error('hex_code')
                                <span class="invalid-feedback">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-luxury mr-2">
                                <i class="fas fa-sync-alt mr-1"></i> Update Color
                            </button>
                            <a href="{{ route('colors.index') }}" class="btn btn-outline-luxury">
                                Cancel
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@stop

@section('js')
<script>
    $(function() {
        $('#color_picker').on('input', function() {
            $('#hex_code').val($(this).val().toUpperCase());
        });
        $('#hex_code').on('input', function() {
            let val = $(this).val();
            if(/^#[0-9A-F]{6}$/i.test(val)) {
                $('#color_picker').val(val);
            }
        });
    });
</script>
@stop
