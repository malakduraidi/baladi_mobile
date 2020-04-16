import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

import { takeUntil, debounceTime, skip } from "rxjs/operators";
import { Subject } from "rxjs";

import { IConfig} from "../../models/config";

@Component({
  selector: "config-form",
  templateUrl: "config-form.html",
  styleUrls: ['./config-form.scss']
})
export class ConfigFormComponent implements OnChanges, OnDestroy {

  @Input() config: IConfig;
  @Output()configChange = new EventEmitter < { valid: boolean;config: IConfig}> ();
  @Output()
  onSubmitChange = new EventEmitter < { valid: boolean;config: IConfig}> ();
  formGroup: FormGroup;
  private destroyed$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["config"] && changes["config"].currentValue) {
      this.formGroup.patchValue(this.config);
    }
  }

  submitForm() {
    this.onSubmitChange.emit({
      config: this.formGroup.value,
      valid: this.formGroup.valid
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
     
      id: ["",[]],
     
      facebook_app_id: ["",[]],
     
      address: ["",[]],
     
      state: ["",[]],
     
      country: ["",[]],
     
      contact_us_email: ["",[]],
     
      latitude: ["",[]],
     
      longitude: ["",[]],
     
      phone_no: ["",[]],
     
      fcm_android_sender_id: ["",[]],
     
      lazzy_loading_effect: ["",[]],
     
      new_product_duration: ["",[]],
     
      notification_text: ["",[]],
     
      notification_title: ["",[]],
     
      notification_duration: ["",[]],
     
      currency_symbol: ["",[]],
     
      cart_button: ["",[]],
     
      footer_button: ["",[]],
     
      app_name: ["",[]],
     
      home_style: ["",[]],
     
      category_style: ["",[]],
     
      site_url: ["",[]],
     
      intro_page: ["",[]],
     
      my_orders_page: ["",[]],

      manager_page: ["",[]],
     
      news_page: ["",[]],
     
      wish_list_page: ["",[]],
     
      shipping_address_page: ["",[]],
     
      about_us_page: ["",[]],
     
      contact_us_page: ["",[]],
     
      edit_profile_page: ["",[]],
     
      package_name: ["",[]],
     
      setting_page: ["",[]],
     
      admob: ["",[]],
     
      ad_unit_id_banner: ["",[]],
     
      ad_unit_id_interstitial: ["",[]],
     
      google_analytic_id: ["",[]],
     
      rate_app: ["",[]],
     
      share_app: ["",[]],
     
      facebook_login: ["",[]],
     
      google_login: ["",[]],
     
      default_notification: ["",[]],
     
      onesignal_app_id: ["",[]],
     
      onesignal_sender_id: ["",[]],
     
      ios_admob: ["",[]],
     
      ios_ad_unit_id_banner: ["",[]],
     
      ios_ad_unit_id_interstitial: ["",[]],
     
      app_icon_image: ["",[]],
     
    });


    this.formGroup.valueChanges
    .pipe(takeUntil(this.destroyed$), skip(1), debounceTime(500))
    .subscribe((config: IConfig) => {
      this.configChange.emit({
        config:config,
        valid: this.formGroup.valid
      });
    });
  }

}
