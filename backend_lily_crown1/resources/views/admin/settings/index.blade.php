@extends('adminlte::page')

@section('title', 'Site Settings')

@section('content_header')
    <h1>Site Settings</h1>
@stop

@section('content')
    <div class="card">
        <div class="card-body p-0">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th style="width: 10px">#</th>
                        <th>Key</th>
                        <th>Value</th>
                        <th>Type</th>
                        <th style="width: 100px">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($settings as $setting)
                        <tr>
                            <td>{{ $setting->id }}</td>
                            <td>{{ ucwords(str_replace('_', ' ', $setting->key)) }}</td>
                            <td>{{ Str::limit($setting->value, 50) }}</td>
                            <td>{{ ucfirst($setting->type) }}</td>
                            <td>
                                <a href="{{ route('settings.edit', $setting->id) }}" class="btn btn-xs btn-default text-primary mx-1 shadow" title="Edit">
                                    <i class="fa fa-lg fa-fw fa-pen"></i>
                                </a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@stop
