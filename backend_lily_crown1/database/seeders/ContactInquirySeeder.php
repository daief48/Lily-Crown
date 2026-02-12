<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactInquiry;

class ContactInquirySeeder extends Seeder
{
    public function run()
    {
        $inquiries = [
            [
                'name' => 'Sarah Ahmed',
                'email' => 'sarah.ahmed@example.com',
                'subject' => 'Product Inquiry',
                'message' => 'I am interested in the Royal Silk Evening Gown. Can you provide more details about the fabric and sizing?',
                'status' => 'pending',
            ],
            [
                'name' => 'Fatima Khan',
                'email' => 'fatima.khan@example.com',
                'subject' => 'Custom Order',
                'message' => 'I would like to place a custom order for a bridal lehenga. Can we schedule a consultation?',
                'status' => 'pending',
            ],
            [
                'name' => 'Nadia Islam',
                'email' => 'nadia.islam@example.com',
                'subject' => 'Shipping Question',
                'message' => 'Do you ship internationally? I am located in the United States.',
                'status' => 'responded',
            ],
            [
                'name' => 'Zara Hassan',
                'email' => 'zara.hassan@example.com',
                'subject' => 'Return Request',
                'message' => 'I received my order but the size is not right. How can I initiate a return?',
                'status' => 'responded',
            ],
            [
                'name' => 'Maria Chowdhury',
                'email' => 'maria.chowdhury@example.com',
                'subject' => 'Bulk Order',
                'message' => 'I am planning a wedding and need to order multiple outfits. Do you offer bulk discounts?',
                'status' => 'pending',
            ],
            [
                'name' => 'Sadia Malik',
                'email' => 'sadia.malik@example.com',
                'subject' => 'Product Availability',
                'message' => 'Is the Monarch Dhaka Jamdani still available? I would like to purchase it.',
                'status' => 'pending',
            ],
            [
                'name' => 'Hina Sultana',
                'email' => 'hina.sultana@example.com',
                'subject' => 'Collaboration',
                'message' => 'I am a fashion blogger and would love to collaborate with Lily Crown. Please let me know if you are interested.',
                'status' => 'responded',
            ],
            [
                'name' => 'Amina Begum',
                'email' => 'amina.begum@example.com',
                'subject' => 'Payment Issue',
                'message' => 'I am having trouble completing my payment. Can you assist me?',
                'status' => 'responded',
            ],
            [
                'name' => 'Laila Ahmed',
                'email' => 'laila.ahmed@example.com',
                'subject' => 'Gift Wrapping',
                'message' => 'Can I add gift wrapping to my order? It is a gift for my sister.',
                'status' => 'pending',
            ],
            [
                'name' => 'Rania Khan',
                'email' => 'rania.khan@example.com',
                'subject' => 'Jewelry Care',
                'message' => 'I purchased a diamond necklace. What is the best way to care for it?',
                'status' => 'responded',
            ],
            [
                'name' => 'Samira Hossain',
                'email' => 'samira.hossain@example.com',
                'subject' => 'Store Location',
                'message' => 'Do you have a physical store where I can try on outfits before purchasing?',
                'status' => 'pending',
            ],
            [
                'name' => 'Yasmin Ali',
                'email' => 'yasmin.ali@example.com',
                'subject' => 'Alteration Services',
                'message' => 'Do you offer alteration services for purchased items?',
                'status' => 'pending',
            ],
        ];

        foreach ($inquiries as $inquiry) {
            ContactInquiry::create($inquiry);
        }
    }
}
