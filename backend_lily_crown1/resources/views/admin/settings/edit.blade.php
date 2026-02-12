@extends('adminlte::page')

@section('title', 'Edit Setting')

@section('content_header')
    <h1>Edit Setting: {{ ucwords(str_replace('_', ' ', $setting->key)) }}</h1>
@stop

@section('content')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card card-royal">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-cog mr-2"></i> Update Global Setting
                    </h3>
                </div>
                <form action="{{ route('settings.update', $setting->id) }}" method="POST">
                    @csrf
                    @method('PUT')
                    <div class="card-body">
                        <div class="form-group">
                            <label for="value" class="luxury-label">
                                {{ ucwords(str_replace('_', ' ', $setting->key)) }}
                            </label>
                            <textarea name="value" class="form-control luxury-input" id="value" rows="4" placeholder="Enter configuration value" required>{{ old('value', $setting->value) }}</textarea>
                            <small class="text-muted mt-2 d-block">Type: <span class="badge badge-outline-gold">{{ ucfirst($setting->type) }}</span></small>
                        </div>
                    </div>

                    <div class="card-footer bg-transparent border-top-0 pb-4">
                        <button type="submit" class="btn btn-luxury px-5">
                            <i class="fas fa-save mr-2"></i> Update Configuration
                        </button>
                        <a href="{{ route('settings.index') }}" class="btn btn-outline-luxury ml-2">
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@stop
