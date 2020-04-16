import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';
import { LoadingService } from 'src/providers/loading/loading.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';


@Component({
  selector: 'app-account',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  featuredPosts = new Array;
  segments = 'opening';

  //WordPress intergation
  categories = new Array;
  //page varible
  page = 0;

  //WordPress intergation
  posts = new Array;
  //page varible
  page2 = 0;
  httpRunning = true;
  openingBalance:any ;
  constructor(
    public navCtrl: NavController,
    public config: ConfigService,
    public loading: LoadingService,
    public shared: SharedDataService,
    // public events: Events
    ) {


    var dat: { [k: string]: any } = {};
    dat.language_id = this.config.langId;
    dat.currency_code = this.config.currecnyCode;
    dat.is_feature = 1;
    this.config.postHttp('getallaccount', dat).then((data: any) => {
      this.featuredPosts = data.account_data;
    });

    this.getOpeningBalance();
    this.getCategories();

  }
  //========================================= tab newest categories ===============================================================================

  getCategories = function () {

    var dat: { [k: string]: any } = {};
    dat.language_id = this.config.langId;
    dat.currency_code = this.config.currecnyCode;
    dat.page_number = this.page2;
    this.config.postHttp('allaccountcategories', dat).then((data: any) => {

      if (this.page2 == 0) { this.categories = []; }
      if (data.success == 1) {
        this.page2++;
        data.data.forEach((value, index) => {
          this.categories.push(value);
        });
        // console.log(data.data.length);
        this.getCategories();
      }
      if (data.data.length < 9) {// if we get less than 10 products then infinite scroll will de disabled

        if (this.categories.length != 0) {
          //this.shared.toast('All Categories Loaded!');
        }
      }
    }, function (response) {
      // console.log("Error while loading categories from the server");
      // console.log(response);
    });
  };

  //============================================================================================  
  //getting list of posts
  getOpeningBalance() {
    this.openingBalance=[
     {
      'price':300,
      'product_name':'Bazilla',
      'product_image':'https://baladi.grefoot.com/web/image/product.template/8/image',
      'quantity':'15 ',
      'status':'waiting_money',
      'received_date':'01/02/2020'
    },
    {
      'price':200,
      'product_name':'Grapes',
      'product_image':'https://baladi.grefoot.com/web/image/product.product/13/image?unique=11ef1c9',
      'quantity':'50',
      'status':'waiting_money',
      'received_date':'01/04/2020'
    },
    {
      'price':450,
      'product_name':'Honey',
      'product_image':'https://baladi.grefoot.com/web/image/product.template/4/image?unique=28cfbda',
      'quantity':'500',
      'status':'waiting_money',
      'received_date':'01/03/2020'
    },
  
    // {
    //   'price':100,
    //   'product_name':'Honey',
    //   'product_image':'https://baladi.grefoot.com/web/image/product.template/4/image?unique=28cfbda',
    //   'quantity':'500 KG',
    //   'status':'waiting_money',
    // },
  
  ]
  };

  //============================================================================================  
  //getting list of sub categories from the server
  showPostDetail(post) {

    this.shared.singlePostData = post;
    console.log(this.shared.singlePostData);
    this.navCtrl.navigateForward(this.config.currentRoute + "/account-detail");
  };
  openPostsPage(name, id) {
    this.navCtrl.navigateForward(this.config.currentRoute + "/account-list/" + id + "/" + name);
  }

  ngOnInit() {
  }

}
