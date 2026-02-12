@extends('adminlte::page')

@section('title', 'Edit Setting')

@section('content_header')
    <h1>Edit Setting: {{ ucwords(str_replace('_', ' ', $setting->key)) }}</h1>
@stop

@section('content')
    <div class="card card-primary">
        <form action="{{ route('settings.update', $setting->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="card-body">
                <div class="form-group">
                    <label for="value">Value</label>
                    <textarea name="value" class="form-control" id="value" rows="3" required>{{ old('value', $setting->value) }}</textarea>
                </div>
            </div>

            <div class="card-footer">
                <button type="submit" class="btn btn-primary">Update</button>
                <a href="{{ route('settings.index') }}" class="btn btn-default">Cancel</a>
            </div>
        </form>
    </div>
@stop
