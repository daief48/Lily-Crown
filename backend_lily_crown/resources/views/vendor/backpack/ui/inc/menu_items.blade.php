{{-- This file is used for menu items by any Backpack v7 theme --}}
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>

<x-backpack::menu-item title="Categories" icon="la la-question" :link="backpack_url('category')" />
<x-backpack::menu-item title="Products" icon="la la-question" :link="backpack_url('product')" />
<x-backpack::menu-item title="Blogs" icon="la la-question" :link="backpack_url('blog')" />
<x-backpack::menu-item title="Site settings" icon="la la-question" :link="backpack_url('site-setting')" />
<x-backpack::menu-item title="Subscribers" icon="la la-question" :link="backpack_url('subscriber')" />
<x-backpack::menu-item title="Orders" icon="la la-question" :link="backpack_url('order')" />