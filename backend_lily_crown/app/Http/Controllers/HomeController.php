<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // Summary metrics
        $totalOrders = Order::count();
        $totalCustomers = User::count();
        $totalProducts = Product::count();
        $totalRevenue = Order::sum('total');

        // Orders by status for pie chart
        $ordersByStatus = Order::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        // Monthly revenue (last 6 months) for bar chart
        $months = [];
        $revenueData = [];
        for ($i = 5; $i >= 0; $i--) {
            $dt = Carbon::now()->subMonths($i);
            $months[] = $dt->format('M Y');
            $start = $dt->copy()->startOfMonth()->toDateString();
            $end = $dt->copy()->endOfMonth()->toDateString();
            $revenue = Order::whereBetween('created_at', [$start, $end])->sum('total');
            $revenueData[] = (float) $revenue;
        }

        // Recent orders
        $recentOrders = Order::latest()->take(8)->get();

        return view('home', compact(
            'totalOrders', 'totalCustomers', 'totalProducts', 'totalRevenue',
            'ordersByStatus', 'months', 'revenueData', 'recentOrders'
        ));
    }
}
