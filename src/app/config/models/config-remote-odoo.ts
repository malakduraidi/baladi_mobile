import { Injectable } from "@angular/core";
import * as fromConfigState from "../store/state";
import * as fromConfigActions from "../store/actions";
import * as fromConfigSelectors from "../store/selectors";
import { Store } from "@ngrx/store";
import { OdooAPI } from 'src/providers/odoo/services/odooAPI';

// This class is used by the effects module as well ass modelSync service

@Injectable()
export class ConfigRemoteOdoo {
  constructor(
    public store: Store<fromConfigState.ConfigState>,
    public odooAPI: OdooAPI,
  ) {

    // super(store,odooAPI,odooSync,fromConfigSelectors,fromConfigActions)
  }

  public getRemoteModelName() {
    return "grefoot.config";
  }

  public getMetaDomain() {
    return [];
  }

  public getRelationalField() {
    var me = this;
    let rel_fields = {};
    return rel_fields;
  }

  public getBinaryField(): any {
    let bin_fields = {};

    return bin_fields;
  }

  public remoteFields() {

    return {

      onCreate() {

        return [
             
          "facebook_app_id",
          
          "address",
          
          "state",
          
          "country",
          
          "contact_us_email",
          
          "latitude",
          
          "longitude",
          
          "phone_no",
          
          "fcm_android_sender_id",
          
          "lazzy_loading_effect",
          
          "new_product_duration",
          
          "notification_text",
          
          "notification_title",
          
          "notification_duration",
          
          "currency_symbol",
          
          "cart_button",
          
          "footer_button",
          
          "app_name",
          
          "home_style",
          
          "category_style",
          
          "site_url",
          
          "intro_page",
          
          "my_orders_page",
          
          "manager_page",
          
          "news_page",
          
          "wish_list_page",
          
          "shipping_address_page",
          
          "about_us_page",
          
          "contact_us_page",
          
          "edit_profile_page",
          
          "package_name",
          
          "setting_page",
          
          "admob",
          
          "ad_unit_id_banner",
          
          "ad_unit_id_interstitial",
          
          "google_analytic_id",
          
          "rate_app",
          
          "share_app",
          
          "facebook_login",
          
          "google_login",
          
          "default_notification",
          
          "onesignal_app_id",
          
          "onesignal_sender_id",
          
          "ios_admob",
          
          "ios_ad_unit_id_banner",
          
          "ios_ad_unit_id_interstitial",
          
          "app_icon_image",
          
          "client_id"
          
        ];
      
      },

      onUpdate() {

        return [
          
          "facebook_app_id",
          
          "address",
                 
          "state",
                 
          "country",
                 
          "contact_us_email",
                 
          "latitude",
                 
          "longitude",
                 
          "phone_no",
                 
          "fcm_android_sender_id",
                 
          "lazzy_loading_effect",
                 
          "new_product_duration",
                 
          "notification_text",
                 
          "notification_title",
                 
          "notification_duration",
                 
          "currency_symbol",
                 
          "cart_button",
                 
          "footer_button",
                 
          "app_name",
                 
          "home_style",
                 
          "category_style",
                 
          "site_url",
                 
          "intro_page",
                 
          "my_orders_page",
          
          "manager_page",
                 
          "news_page",
          
          "wish_list_page",
          
          "shipping_address_page",
          
          "about_us_page",
          
          "contact_us_page",
                 
          "edit_profile_page",
                 
          "package_name",
                 
          "setting_page",
                 
          "admob",
                 
          "ad_unit_id_banner",
                 
          "ad_unit_id_interstitial",
                 
          "google_analytic_id",
          
          "rate_app",
                 
          "share_app",
                 
          "facebook_login",
                 
          "google_login",
          
          "default_notification",
          
          "onesignal_app_id",
          
          "onesignal_sender_id",
          
          "ios_admob",
          
          "ios_ad_unit_id_banner",
          
          "ios_ad_unit_id_interstitial",
          
          "app_icon_image",
          
          "client_id"

        ];
      },

      onRead() {

        return [
          
          "facebook_app_id",
          
          "address",
                 
          "state",
                 
          "country",
                 
          "contact_us_email",
                 
          "latitude",
                 
          "longitude",
                 
          "phone_no",
                 
          "fcm_android_sender_id",
                 
          "lazzy_loading_effect",
                 
          "new_product_duration",
                 
          "notification_text",
                 
          "notification_title",
                 
          "notification_duration",
                 
          "currency_symbol",
                 
          "cart_button",
                 
          "footer_button",
                 
          "app_name",
                 
          "home_style",
                 
          "category_style",
                 
          "site_url",
                 
          "intro_page",
                 
          "my_orders_page",
          
          "manager_page",
                 
          "news_page",
          
          "wish_list_page",
          
          "shipping_address_page",
          
          "about_us_page",
          
          "contact_us_page",
                 
          "edit_profile_page",
                 
          "package_name",
                 
          "setting_page",
                 
          "admob",
                 
          "ad_unit_id_banner",
                 
          "ad_unit_id_interstitial",
                 
          "google_analytic_id",
          
          "rate_app",
                 
          "share_app",
                 
          "facebook_login",
                 
          "google_login",
          
          "default_notification",
          
          "onesignal_app_id",
          
          "onesignal_sender_id",
          
          "ios_admob",
          
          "ios_ad_unit_id_banner",
          
          "ios_ad_unit_id_interstitial",
          
          "app_icon_image",
          
          "client_id"

        ];

      }

    };

  }

  public getRemoteFields() {
    
    return [
          
      "facebook_app_id",
      
      "address",
             
      "state",
             
      "country",
             
      "contact_us_email",
             
      "latitude",
             
      "longitude",
             
      "phone_no",
             
      "fcm_android_sender_id",
             
      "lazzy_loading_effect",
             
      "new_product_duration",
             
      "notification_text",
             
      "notification_title",
             
      "notification_duration",
             
      "currency_symbol",
             
      "cart_button",
             
      "footer_button",
             
      "app_name",
             
      "home_style",
             
      "category_style",
             
      "site_url",
             
      "intro_page",
             
      "my_orders_page",
      
      "manager_page",
             
      "news_page",
      
      "wish_list_page",
      
      "shipping_address_page",
      
      "about_us_page",
      
      "contact_us_page",
             
      "edit_profile_page",
             
      "package_name",
             
      "setting_page",
             
      "admob",
             
      "ad_unit_id_banner",
             
      "ad_unit_id_interstitial",
             
      "google_analytic_id",
      
      "rate_app",
             
      "share_app",
             
      "facebook_login",
             
      "google_login",
      
      "default_notification",
      
      "onesignal_app_id",
      
      "onesignal_sender_id",
      
      "ios_admob",
      
      "ios_ad_unit_id_banner",
      
      "ios_ad_unit_id_interstitial",
      
      "app_icon_image",
      
      "client_id"

    ];
  
  }

}