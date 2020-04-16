import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsDriverPage } from './tabs-driver.page';

const productDetailPage = 
{
  path: 'product-detail/:id', loadChildren: () => import('../product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
};

const productsPage = {
  path: 'products/:id/:name/:type', loadChildren: () => import('../products/products.module').then(m => m.ProductsPageModule)
};

const categories = {
  path: 'categories/:parent/:name', loadChildren: () => import('../categorie-pages/categories/categories.module').then(m => m.CategoriesPageModule)
};

const routes: Routes = [
  {
    path: 'tabs-driver',
    component: TabsDriverPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '', loadChildren: () => import('../home-pages/home3/home3.module').then(m => m.Home3PageModule)
          },
          productDetailPage,
          productsPage
        ]
      },
      {
        path: 'home2',
        children: [
          {
            path: '', loadChildren: () => import('../home-pages/home2/home2.module').then(m => m.Home2PageModule)
          },
          productDetailPage,
          productsPage
        ]
      },
      {
        path: 'home3',
        children: [
          {
            path: '', loadChildren: () => import('../home-pages/home3/home3.module').then(m => m.Home3PageModule)
          },
          productDetailPage,
          productsPage
        ]
      },
      
      {
        path: 'home7',
        children: [
          {
            path: '', loadChildren: () => import('../home-pages/home7/home7.module').then(m => m.Home7PageModule)
          },
          productDetailPage,
          productsPage
        ]
      },
      {
        path: 'home8',
        children: [
          {
            path: '', loadChildren: () => import('../home-pages/home8/home8.module').then(m => m.Home8PageModule)
          },
          productDetailPage,
          productsPage
        ]
      },
    

      {
        path: 'categories',
        children: [
          {
            path: '', loadChildren: () => import('../categorie-pages/categories/categories.module').then(m => m.CategoriesPageModule)
          },
          categories, productDetailPage, productsPage
        ]
      },
      
      

      {
        path: 'cart',
        children: [
          {
            // path: '', loadChildren: () => import('../cart/cart.module').then(m => m.CartPageModule)
            path: '', loadChildren: () => import('../sale-order-line/containers/sale-order-line-cart-list/sale-order-line-cart-list.module').then(m => m.SaleOrderLineCartListModule)
          },
          {
            path: 'order', loadChildren: () => import('../order/order.module').then(m => m.OrderPageModule)
          },

          {
            path: 'shipping-method', loadChildren: () => import('../shipping-method/shipping-method.module').then(m => m.ShippingMethodPageModule)
          },
          {
            path: 'thank-you', loadChildren: () => import('../thank-you/thank-you.module').then(m => m.ThankYouPageModule)
          },
          {
            path: 'billing-address', loadChildren: () => import('../address-pages/billing-address/billing-address.module').then(m => m.BillingAddressPageModule)
          },
          {
            path: 'shipping-address', loadChildren: () => import('../address-pages/shipping-address/shipping-address.module').then(m => m.ShippingAddressPageModule)
          },
          {
            path: 'public-partner-address', loadChildren: () => import('../res-partner/containers/res-partner-public-partner/res-partner-public-partner.module').then(m => m.ResPartnerPublicPartnerModule)
          },
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '', loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)
          },
          productDetailPage,
          productsPage
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
          },
          {
            path: 'my-orders', loadChildren: () => import('../my-orders/my-orders.module').then(m => m.MyOrdersPageModule)
          },
          {
            path: 'my-account', loadChildren: () => import('../my-account/my-account.module').then(m => m.MyAccountPageModule)
          },
          {
            path: 'news', loadChildren: () => import('../news/news.module').then(m => m.NewsPageModule)
          },
          {
            path: 'news-detail', loadChildren: () => import('../news-detail/news-detail.module').then(m => m.NewsDetailPageModule)
          },
          {
            path: 'news-list/:id/:name', loadChildren: () => import('../news-list/news-list.module').then(m => m.NewsListPageModule)
          },
          {
            path: 'wish-list', loadChildren: () => import('../wish-list/wish-list.module').then(m => m.WishListPageModule)
          },
          {
            path: 'addresses', loadChildren: () => import('../address-pages/addresses/addresses.module').then(m => m.AddressesPageModule)
          },
          {
            path: 'my-order-detail', loadChildren: () => import('../my-order-detail/my-order-detail.module').then(m => m.MyOrderDetailPageModule)
          },
          {
            path: 'intro', loadChildren: () => import('../intro/intro.module').then(m => m.IntroPageModule)

          },
          {
            path: 'contact-us', loadChildren: () => import('../contact-us/contact-us.module').then(m => m.ContactUsPageModule)
          },
          {
            path: 'about-us', loadChildren: () => import('../about-us/about-us.module').then(m => m.AboutUsPageModule)
          },
          {
            path: 'manager', loadChildren: () => import('../manager/manager.module').then(m => m.ManagerPageModule)
          },
          productDetailPage
        ]
      },

      // {
      //   path: '',
      //   redirectTo: '/tabs/home',
      //   pathMatch: 'full'
      // }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/home',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})  
export class TabsDriverPageRoutingModule {
}
