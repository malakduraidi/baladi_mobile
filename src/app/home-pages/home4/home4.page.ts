import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/providers/config/config.service';
import { NavController } from '@ionic/angular';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ProductTemplateState } from 'src/app/product-template/store/state';
import * as fromProductTemplateSelectors  from 'src/app/product-template/store/selectors';
import * as fromProductTemplateActions  from 'src/app/product-template/store/actions';

import { ProductTemplateOdooFields, IProductTemplate, ProductTemplate } from 'src/app/product-template/models/product-template';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-home4',
  templateUrl: './home4.page.html',
  styleUrls: ['./home4.page.scss'],
})
export class Home4Page implements OnInit {
  sliderConfig = {
    slidesPerView: this.config.productSlidesPerPage,
    spaceBetween: 0
  }
  orders: any[] = [
   
   
    
  ];

  waiting_list : any[] = [
    {
      customer_name:'obada',
      address:'Ramallah - Masyon - near asal w basal',
      customer_mobile:'0599 111 222',
      customer_phone:'29644444',
      product_name: 'Tomato',
      price: ' 30 nis',
      quantity:'4 Kg',
      remaining_time:'1 day 22:40:30',
      state:'waiting'
    },
    {
      customer_name:'Ram',
      address:'Ramallah - Masyon - near asal w basal',
      customer_mobile:'0599 111 222',
      customer_phone:'29644444',
      product_name: 'Tomato',
      price: ' 30 nis',
      quantity:'4 Kg',
      remaining_time:'1 day 22:40:30',
      state:'waiting'
    },
    {
      customer_name:'malak',
      address:'Ramallah - Masyon - near asal w basal',
      customer_mobile:'0599 111 222',
      customer_phone:'29644444',
      product_name: 'Tomato',
      price: ' 30 nis',
      quantity:'4 Kg',
      remaining_time:'1 day 22:40:30',
      state:'waiting'
    },
    {
      customer_name:'Maher',
      address:'Ramallah - Masyon - near asal w basal',
      customer_mobile:'0599 111 222',
      customer_phone:'29644444',
      product_name: 'Annanas',
      price: ' 30 nis',
      quantity:'4 Kg',
      remaining_time:'1 day 22:40:30',
      state:'waiting'
    },
    {
      customer_name:'Sajed',
      address:'Ramallah - Masyon - near asal w basal',
      customer_mobile:'0599 111 222',
      customer_phone:'29644444',
      product_name: 'cheese',
      price: ' 30 nis',
      quantity:'4 Kg',
      remaining_time:'1 day 22:40:30',
      state:'waiting'
    },
    {
      customer_name:'sabrin',
      address:'Ramallah - Masyon - near asal w basal',
      customer_mobile:'0599 111 222',
      customer_phone:'29644444',
      product_name: 'Tomato',
      price: ' 30 nis',
      quantity:'4 Kg',
      remaining_time:'1 day 22:40:30',
      state:'waiting'
    },
    {
      customer_name:'noor',
      address:'Ramallah - Masyon - near asal w basal',
      customer_mobile:'0599 111 222',
      customer_phone:'29644444',
      product_name: 'Tomato',
      price: ' 30 nis',
      quantity:'4 Kg',
      remaining_time:'1 day 22:40:30',
      state:'waiting'
    },
    {
      customer_name:'khalid',
      address:'Ramallah - Masyon - near asal w basal',
      customer_mobile:'0599 111 222',
      customer_phone:'29644444',
      product_name: 'Tomato',
      price: ' 30 nis',
      quantity:'4 Kg',
      remaining_time:'1 day 22:40:30',
      state:'waiting'
    }
  ]

  receiving_list : any[] = [
    {
      customer_name:'khaled',
      address:'Nablus - Rafidia - near kan ya ma kan resturant',
      customer_mobile:'0599 111 333',
      customer_phone:'29600000',
      product_name: 'Milk',
      price: ' 20 nis',
      quantity:'2 gallon',
      remaining_time:'0 day 22:40:30',
      state:'in_receiving'
    },
    {
      customer_name:'kareem',
      address:'Nablus - Rafidia - near kan ya ma kan resturant',
      customer_mobile:'0599 111 333',
      customer_phone:'29600000',
      product_name: 'Milk',
      price: ' 20 nis',
      quantity:'2 gallon',
      remaining_time:'0 day 22:40:30',
      state:'in_receiving'
    }
  ]

  completed_list:any[] = [
    {
      customer_name:'obada',
      address:'Qalqilia - Baqa Al hatab village',
      customer_mobile:'0599 111 444',
      customer_phone:'296011111',
      product_name: 'Olive',
      price: ' 600 nis',
      quantity: '4 gallon',
      remaining_time:'2 day 22:40:30',
      state:'completed'
    }
  ]

  delivery_list=[
    {
    customer_name:'Mohammad',
    address:'Qalqilia - Baqa Al hatab village',
    customer_mobile:'0599 111 444',
    customer_phone:'296011111',
    product_name: 'Olive',
    price: ' 600 nis',
    quantity: '4 gallon',
    remaining_time:'2 day 22:40:30',
    state:'in_delivery'
  },
  {
    customer_name:'Mohammad',
    address:'Qalqilia - Baqa Al hatab village',
    customer_mobile:'0599 111 444',
    customer_phone:'296011111',
    product_name: 'Olive',
    price: ' 600 nis',
    quantity: '4 gallon',
    remaining_time:'2 day 22:40:30',
    state:'in_delivery'
  }
]

  pickedup_list:any[]=[
    {
      customer_name:'Ahmad',
      address:'Tulkarem - irtah - near kan ya ma kan resturant',
      customer_mobile:'0599 111 333',
      customer_phone:'29600000',
      product_name: 'Dates',
      price: ' 20 nis',
      quantity:'2 Kg',
      remaining_time:'0 day 22:40:30',
      state:'pickedup'
    },
    {
      customer_name:'khaled',
      address:'Tubas - far3a - near Ain sakot',
      customer_mobile:'0599 111 333',
      customer_phone:'29600000',
      product_name: 'Cucumber',
      price: ' 20 nis',
      quantity:'10 Kg',
      remaining_time:'0 day 22:40:30',
      state:'pickedup'
    },
    {
      customer_name:'kareem',
      address:'Nablus - Rafidia - near kan ya ma kan resturant',
      customer_mobile:'0599 111 333',
      customer_phone:'29600000',
      product_name: 'Milk',
      price: ' 20 nis',
      quantity:'2 gallon',
      remaining_time:'0 day 22:40:30',
      state:'pickedup'
    }
  ]

  constructor(
    public nav: NavController,
    public config: ConfigService,
    // public events: Events,
    public shared: SharedDataService,
  ) { }
  openProducts(value) {
    this.nav.navigateForward(this.config.currentRoute + "/products/0/0/" + value);
  }
  segmentChanged(event) {
    // let searchFilter = null;
    // get the role incase of internet loss connection
    if (event && event.detail && event.detail.value) {

      const value = event.detail.value;
      if (value === 'waiting'){
        this.orders = this.waiting_list
      }else if (value === 'in_receiving')
        this.orders = this.receiving_list
      else if (value === 'pickedup')
        this.orders = this.pickedup_list
      else if (value === 'in_delivery')
        this.orders = this.delivery_list
      else if (value === 'completed')
        this.orders = this.completed_list
    
    }
   
  }
  ngOnInit() {
    this.orders = this.waiting_list
  }
  ionViewDidEnter() {
    this.shared.hideSplashScreen();
  }

}
