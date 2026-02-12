@extends('adminlte::page')

@section('title', 'Site Settings')

@section('content_header')
    <h1>Site Settings</h1>
@stop

@section('content')
<div class="container-fluid">
    <div class="card card-royal">
        <div class="card-header">
            <h3 class="card-title">
                <i class="fas fa-cogs mr-2 text-gold-accent"></i> System Configurations
            </h3>
            <div class="card-tools">
                <form action="{{ route('settings.index') }}" method="GET" class="form-inline">
                    <div class="input-group input-group-sm" style="width: 250px;">
                        <input type="text" name="search" class="form-control float-right" placeholder="Search Settings..." value="{{ request('search') }}">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-default">
                                <i class="fas fa-search"></i>
                            </button>
                            <a href="{{ route('settings.index') }}" class="btn btn-default" title="Reset">
                                <i class="fas fa-undo"></i>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table luxury-table mb-0">
                    <thead>
                        <tr>
                            <th style="width: 80px">#</th>
                            <th>Configuration Key</th>
                            <th>Value</th>
                            <th style="width: 150px">Type</th>
                            <th style="width: 120px" class="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($settings as $setting)
                            <tr>
                                <td class="font-weight-bold text-muted">#{{ $setting->id }}</td>
                                <td class="font-weight-bold text-emerald-royal">
                                    {{ ucwords(str_replace('_', ' ', $setting->key)) }}
                                </td>
                                <td>
                                    <span class="text-muted italic">{{ Str::limit($setting->value, 50) }}</span>
                                </td>
                                <td>
                                    <span class="badge badge-outline-gold">{{ ucfirst($setting->type) }}</span>
                                </td>
                                <td class="text-right">
                                    <a href="{{ route('settings.edit', $setting->id) }}" class="btn btn-sm btn-outline-luxury mr-1" title="Modify Setting">
                                        <i class="fas fa-edit mr-1"></i> Edit
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@stop
