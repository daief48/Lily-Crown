<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\OrderRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class OrderCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class OrderCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     * 
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Order::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/order');
        CRUD::setEntityNameStrings('order', 'orders');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::column('customer_name');
        CRUD::column('customer_email');
        CRUD::column('total')->type('number')->prefix('$');
        CRUD::column('status')->type('select_from_array')->options([
            'pending' => 'Pending',
            'paid' => 'Paid',
            'shipped' => 'Shipped',
            'delivered' => 'Delivered',
            'cancelled' => 'Cancelled',
        ]);
        CRUD::column('created_at');
    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(OrderRequest::class);

        CRUD::field('customer_name')->type('text');
        CRUD::field('customer_email')->type('email');
        CRUD::field('total')->type('number')->prefix('$');
        CRUD::field('status')->type('select_from_array')->options([
            'pending' => 'Pending',
            'paid' => 'Paid',
            'shipped' => 'Shipped',
            'delivered' => 'Delivered',
            'cancelled' => 'Cancelled',
        ]);
        CRUD::field('items')->type('textarea')->hint('JSON representation of items');
    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
        CRUD::field('customer_name')->attributes(['readonly' => 'readonly']);
        CRUD::field('customer_email')->attributes(['readonly' => 'readonly']);
        CRUD::field('total')->attributes(['readonly' => 'readonly']);
        CRUD::field('items')->attributes(['readonly' => 'readonly']);
    }

}
