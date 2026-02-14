# Lily Crown - Luxury E-commerce Platform

## 👑 Introduction
Lily Crown is a premium e-commerce platform designed to offer a "Royal" shopping experience. It features a sophisticated backend management system and a high-performance frontend application, tailored for luxury products.

---

## 🛠 Tech Stack

### Backend (`backend_lily_crown1`)
- **Framework**: [Laravel 12](https://laravel.com)
- **Language**: PHP 8.2+
- **API**: RESTful API with Sanctum Authentication
- **Admin Panel**: Custom Admin Dashboard (Blade & Controllers)
- **Database**: MySQL (Production) / SQLite (Development)

### Frontend (`frontend_lily_crown`)
- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: TypeScript, React 19
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Icons**: Lucide React, Font Awesome

---

## ✨ Features

- **Public Storefront**:
  - Luxurious "Royal" Design Theme.
  - Home Page with Hero Slides and Featured Collections.
  - Product Catalog with Lookbook and Categories.
  - Blog Section for lifestyle content.
  - Contact Form and Newsletter Subscription.
  - Responsive Design for all devices.

- **Admin Dashboard**:
  - Secure Authentication for Administrators.
  - **Product Management**: Create, update, and manage products.
  - **Category Management**: Organize products into collections.
  - **Order Management**: View and process customer orders.
  - **Content Management**: Manage Blogs, Hero Slides, Testimonials, and Features.
  - **Site Settings**: Configure global site options.
  - **Subscriber List**: View newsletter subscribers.

---

## 🚀 Installation & Setup

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js >= 20.x
- MySQL Database

### 1. 🔙 Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend_lily_crown1
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Configure Environment:
   ```bash
   cp .env.example .env
   ```
   *Update `.env` with your database credentials.*

4. Generate Application Key:
   ```bash
   php artisan key:generate
   ```

5. Run Migrations & Seed Database:
   ```bash
   php artisan migrate --seed
   ```

6. Start the Development Server:
   ```bash
   php artisan serve
   ```
   *The backend will be available at `http://localhost:8000`.*

### 2. 🎨 Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend_lily_crown
   ```

2. Install Node dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Configure Environment:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. Start the Development Server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:3000`.*

---

## 📂 Project Structure

```
Lily Crown/
├── backend_lily_crown1/       # Laravel API & Admin Panel
│   ├── app/                   # Controllers, Models
│   ├── routes/                # Web & API Routes
│   └── database/              # Migrations & Seeders
│
└── frontend_lily_crown/       # Next.js Application
    ├── src/
    │   ├── app/               # App Router Pages
    │   ├── components/        # Reusable UI Components
    │   └── lib/               # Utilities & API helpers
    └── public/                # Static Assets
```

## 🔗 API Documentation
The backend exposes a RESTful API for the frontend to consume. Key endpoints include:
- `GET /api/products` - List all products
- `GET /api/categories` - List all categories
- `POST /api/orders` - Create a new order
- `POST /api/subscribe` - Newsletter subscription

---

## 📝 License
This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
