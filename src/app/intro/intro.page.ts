import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {


  public slides = [
    { image: "assets/intro/1.gif", title: "HOME_PAGE", icon: "home", description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus." },

    { image: "assets/intro/2.gif", title: "CATEGORY_PAGE", icon: "cart", description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus." },
    { image: "assets/intro/3.gif", title: "SHOP_PAGE", icon: "share", description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus." },
    { image: "assets/intro/4.gif", title: "CART_PAGE", icon: "list-outline-box", description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus." },
    { image: "assets/intro/5.gif", title: "ORDER_PAGE", icon: "calendar", description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus." }
  ];

  constructor(
    public navCtrl: NavController,
    public shared: SharedDataService,
    public config: ConfigService,
    private router:Router
    // public events: Events
     ) {
  }
  openHomePage() {
    // this.events.publish("openHomePage");
    // this.config.checkingNewSettingsFromServer();
      this.router.navigateByUrl(this.config.currentRoute );
  }
  ionViewDidEnter() {
    this.shared.hideSplashScreen();
  }
  ngOnInit() {
  }

}
