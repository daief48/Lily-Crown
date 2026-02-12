@extends('adminlte::page')

@section('title', 'View Inquiry')

@section('content_header')
    <h1>Inquiry Details</h1>
@stop

@section('content')
    <div class="card card-royal">
        <div class="card-header">
            <h3 class="card-title">From: {{ $contactInquiry->name }} ({{ $contactInquiry->email }})</h3>
            <div class="card-tools">
                <span class="badge {{ $contactInquiry->status === 'unread' ? 'badge-primary' : 'badge-secondary' }}">
                    {{ ucfirst($contactInquiry->status) }}
                </span>
            </div>
        </div>
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-sm-3 font-weight-bold">Subject:</div>
                <div class="col-sm-9">{{ $contactInquiry->subject }}</div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3 font-weight-bold">Received At:</div>
                <div class="col-sm-9">{{ $contactInquiry->created_at->format('F j, Y, g:i a') }}</div>
            </div>
            <div class="row">
                <div class="col-sm-12 font-weight-bold mb-2">Message:</div>
                <div class="col-sm-12 p-3 bg-light rounded">
                    {!! nl2br(e($contactInquiry->message)) !!}
                </div>
            </div>
        </div>
        <div class="card-footer">
            <a href="{{ route('contact-inquiries.index') }}" class="btn btn-default">Back to List</a>
            <a href="mailto:{{ $contactInquiry->email }}?subject=Re: {{ $contactInquiry->subject }}" class="btn btn-primary float-right">Reply via Email</a>
        </div>
    </div>
@stop
