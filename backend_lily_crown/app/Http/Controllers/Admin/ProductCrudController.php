<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ProductRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class ProductCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class ProductCrudController extends CrudController
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
        CRUD::setModel(\App\Models\Product::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/product');
        CRUD::setEntityNameStrings('product', 'products');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::column('name');
        CRUD::column('category_id')->type('select')->entity('category')->attribute('name')->model("App\Models\Category");
        CRUD::field('price')->type('number')->prefix('$');
        CRUD::column('badge');
        CRUD::column('created_at');
    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(ProductRequest::class);

        CRUD::field('name')->type('text');
        CRUD::field('slug')->type('text')->hint('Will be automatically generated if left empty');
        CRUD::field('category_id')->type('select')->entity('category')->attribute('name')->model("App\Models\Category");
        CRUD::field('description')->type('textarea');
        CRUD::field('price')->type('number')->prefix('$');
        CRUD::field('badge')->type('text');
        CRUD::field('image')->type('text')->hint('Main product image URL');
        
        CRUD::field('gallery')->type('repeatable')->fields([
            ['name' => 'url', 'type' => 'text', 'label' => 'Image URL']
        ])->new_item_label('Add Image');

        CRUD::field('details')->type('repeatable')->fields([
            ['name' => 'info', 'type' => 'text', 'label' => 'Detail Info']
        ])->new_item_label('Add Detail');
    }

    /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
