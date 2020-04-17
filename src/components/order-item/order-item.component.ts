import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, ActionSheetController, Platform, ToastController } from '@ionic/angular';

// import { IOrder } from 'src/app/stores/order/model';
// import { ModalController, AlertController, ActionSheetController, Platform, ToastController } from '@ionic/angular';
// import { OrderViewDetailComponent } from '../order-view-detail/order-view-detail.component';
// import { UserPickerComponent } from '../user-picker/user-picker.component';
// import { Store } from '@ngrx/store';
// import { OrderState } from 'src/app/stores/order/store/state';
// import * as fromOrderActions from 'src/app/stores/order/store/actions';
// import { IUser } from 'src/app/stores/user/model';
// import { UserState } from 'src/app/stores/user/store/state';
// import * as fromUserSelectors from 'src/app/stores/user/store/selectors';
// import { TranslateService } from '@ngx-translate/core';
// import { PrinterProvider } from 'src/app/services/printer-provider';
// import { PrintingMaterial } from 'src/app/services/printing-material';
// import { EscPosEncoder } from 'src/app/services/escpos-encoder';
// import { SettingState } from 'src/app/app-setting/reducers/app-setting.reducer';
// import { getSettings } from 'src/app/app-setting';
// import { take, filter } from 'rxjs/operators';
// import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
// import { SignaturePage } from '../signature/signature';
// import { OrderDetailPage } from 'src/app/components/order-detail/order-detail.page';
// import { OdooAPI } from 'src/app/services/odoo/services/odooAPI';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {

  
  @Input() order: any
  workflows: any[] =[
    'waiting',
    'in_receiving',
    'pickedup',
    'in_delivery',
    'completed'
    
  ]

  // by default
  constructor(
    // private modalCtrl: ModalController,

    // private orderStore: Store<OrderState>,
    // private userStore: Store<UserState>,
    // private appSettingStore: Store<SettingState>,
    // private translate: TranslateService,
    // private platform: Platform,
    // private alertCtrl: AlertController,
    // private printerService: PrinterProvider,
    // private printingMaterial: PrintingMaterial,
    // private encoder: EscPosEncoder,
    // private printService: PrinterProvider,
    // private actionSheetCtrl: ActionSheetController,
    // private printer: Printer,
    // private odooAPI: OdooAPI,
    // private toastCtrl: ToastController
  ) { }

  ngOnInit(){
    this.workflows = this.workflows.filter(x=>x!=this.order.state)
  }
  ionViewDidEnter() {



  }


  


} 