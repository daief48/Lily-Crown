@extends('adminlte::page')

@section('title', 'Contact Inquiries')

@section('content_header')
    <h1>Contact Inquiries</h1>
@stop

@section('content')
    {{-- Filter Card --}}
    <div class="card card-royal mb-3">
        <div class="card-header">
            <h3 class="card-title">Filter Inquiries</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
        <div class="card-body">
            <form method="GET" action="{{ route('contact-inquiries.index') }}">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Search Inquiry</label>
                            <input type="text" name="search" class="form-control" placeholder="Name, Email, or Subject..." value="{{ request('search') }}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Status</label>
                            <select name="status" class="form-control">
                                <option value="">All Statuses</option>
                                <option value="unread" {{ request('status') == 'unread' ? 'selected' : '' }}>Unread</option>
                                <option value="read" {{ request('status') == 'read' ? 'selected' : '' }}>Read</option>
                                <option value="replied" {{ request('status') == 'replied' ? 'selected' : '' }}>Replied</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>&nbsp;</label>
                            <div class="d-flex">
                                <button type="submit" class="btn btn-primary mr-2">
                                    <i class="fas fa-filter mr-1"></i> Filter
                                </button>
                                <a href="{{ route('contact-inquiries.index') }}" class="btn btn-default">
                                    <i class="fas fa-undo mr-1"></i> Reset
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="card card-royal">
        <div class="card-body p-0">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th style="width: 10px">#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Received At</th>
                        <th style="width: 150px">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($inquiries as $inquiry)
                        <tr class="{{ $inquiry->status === 'unread' ? 'font-weight-bold' : '' }}">
                            <td>{{ $inquiry->id }}</td>
                            <td>{{ $inquiry->name }}</td>
                            <td>{{ $inquiry->email }}</td>
                            <td>{{ $inquiry->subject }}</td>
                            <td>
                                <span class="badge {{ $inquiry->status === 'unread' ? 'badge-primary' : ($inquiry->status === 'read' ? 'badge-secondary' : 'badge-success') }}">
                                    {{ ucfirst($inquiry->status) }}
                                </span>
                            </td>
                            <td>{{ $inquiry->created_at->format('Y-m-d H:i') }}</td>
                            <td>
                                <a href="{{ route('contact-inquiries.show', $inquiry->id) }}" class="btn btn-xs btn-default text-primary mx-1 shadow" title="View">
                                    <i class="fa fa-lg fa-fw fa-eye"></i>
                                </a>
                                <form action="{{ route('contact-inquiries.destroy', $inquiry->id) }}" method="POST" style="display:inline">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn btn-xs btn-default text-danger mx-1 shadow" title="Delete" onclick="return confirm('Are you sure?')">
                                        <i class="fa fa-lg fa-fw fa-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="text-center py-4">No inquiries found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        <div class="card-footer clearfix">
            {{ $inquiries->links('pagination::bootstrap-4') }}
        </div>
    </div>
@stop
