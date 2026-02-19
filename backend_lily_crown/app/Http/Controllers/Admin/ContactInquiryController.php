<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use Illuminate\Http\Request;

class ContactInquiryController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactInquiry::query();

        // Search Filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        // Status Filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $inquiries = $query->latest()->paginate(10)->appends($request->all());
        return view('admin.contact-inquiries.index', compact('inquiries'));
    }

    public function show(ContactInquiry $contactInquiry)
    {
        if ($contactInquiry->status === 'unread') {
            $contactInquiry->update(['status' => 'read']);
        }
        return view('admin.contact-inquiries.show', compact('contactInquiry'));
    }

    public function destroy(ContactInquiry $contactInquiry)
    {
        $contactInquiry->delete();
        return redirect()->route('contact-inquiries.index')->with('success', 'Inquiry deleted successfully');
    }
}
