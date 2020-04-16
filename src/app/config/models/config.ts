import { Injectable } from '@angular/core'

export interface IConfigRemote{

  id:number
  
  facebook_app_id:string
  
  address:string
  
  state:string
    
  country:string
     
  contact_us_email:string
     
  latitude:string
     
  longitude:string
     
  phone_no:string   
     
  fcm_android_sender_id:string
     
  lazzy_loading_effect:string
     
  new_product_duration:string
     
  notification_text:string
       
  notification_title:string
       
  notification_duration:string

  currency_symbol:string

  cart_button:string

  footer_button:string

  app_name:string
     
  home_style:string
         
  category_style:string
  
  site_url:string

  intro_page:string

  my_orders_page:string

  manager_page: string

  news_page:string

  wish_list_page:string

  shipping_address_page:string

  about_us_page:string

  contact_us_page:string
     
  edit_profile_page:string
   
  package_name:string
     
  setting_page:string
     
  admob:string
     
  ad_unit_id_banner:string
     
  ad_unit_id_interstitial:string
     
  google_analytic_id:string
     
  rate_app:string
     
  share_app:string

  facebook_login:string
       
  google_login:string
       
  default_notification:string
       
  onesignal_app_id:string
     
  onesignal_sender_id:string
  
  ios_admob:string
  
  ios_ad_unit_id_banner:string
     
  ios_ad_unit_id_interstitial:string
     
  app_icon_image:string
       
}

export interface IConfig{
     
  id:number
   
  facebook_app_id:string
   
  address:string
   
  state:string
   
  country:string
   
  contact_us_email:string
   
  latitude:string
   
  longitude:string
   
  phone_no:string
   
  fcm_android_sender_id:string
   
  lazzy_loading_effect:string
   
  new_product_duration:string
   
  notification_text:string
   
  notification_title:string
   
  notification_duration:string
   
  currency_symbol:string
   
  cart_button:string
   
  footer_button:string
   
  app_name:string
   
  home_style:string
   
  category_style:string
   
  site_url:string
   
  intro_page:string
   
  my_orders_page:string

  manager_page: string
   
  news_page:string
   
  wish_list_page:string
   
  shipping_address_page:string
   
  about_us_page:string
   
  contact_us_page:string
   
  edit_profile_page:string
   
  package_name:string
   
  setting_page:string
   
  admob:string
   
  ad_unit_id_banner:string
   
  ad_unit_id_interstitial:string
   
  google_analytic_id:string
   
  rate_app:string
   
  share_app:string
   
  facebook_login:string
   
  google_login:string
   
  default_notification:string
   
  onesignal_app_id:string
   
  onesignal_sender_id:string
   
  ios_admob:string
   
  ios_ad_unit_id_banner:string
   
  ios_ad_unit_id_interstitial:string
   
  app_icon_image:string

  client_id:number
   
}

export const ConfigOdooFields =[ 'id' ,'facebook_app_id', 'address', 'state', 'country', 'contact_us_email', 'latitude', 'longitude', 'phone_no', 'fcm_android_sender_id', 'lazzy_loading_effect', 'new_product_duration', 'notification_text', 'notification_title', 'notification_duration', 'currency_symbol', 'cart_button', 'footer_button', 'app_name', 'home_style', 'category_style', 'site_url', 'intro_page', 'my_orders_page', 'manager_page', 'news_page', 'wish_list_page', 'shipping_address_page', 'about_us_page', 'contact_us_page', 'edit_profile_page', 'package_name', 'setting_page', 'admob', 'ad_unit_id_banner', 'ad_unit_id_interstitial', 'google_analytic_id', 'rate_app', 'share_app', 'facebook_login', 'google_login', 'default_notification', 'onesignal_app_id', 'onesignal_sender_id', 'ios_admob', 'ios_ad_unit_id_banner', 'ios_ad_unit_id_interstitial', 'app_icon_image' ]

@Injectable()
export class Config implements IConfig
  {
    
    public id:number
   
    public facebook_app_id:string
   
    public address:string
   
    public state:string
   
    public country:string
   
    public contact_us_email:string
   
    public latitude:string
   
    public longitude:string
   
    public phone_no:string
   
    public fcm_android_sender_id:string
   
    public lazzy_loading_effect:string
   
    public new_product_duration:string
   
    public notification_text:string
   
    public notification_title:string
   
    public notification_duration:string
   
    public currency_symbol:string
   
    public cart_button:string
   
    public footer_button:string
   
    public app_name:string
   
    public home_style:string
   
    public category_style:string
   
    public site_url:string
   
    public intro_page:string
   
    public my_orders_page:string

    public manager_page:string
   
    public news_page:string
   
    public wish_list_page:string
   
    public shipping_address_page:string
   
    public about_us_page:string
   
    public contact_us_page:string
   
    public edit_profile_page:string
   
    public package_name:string
   
    public setting_page:string
   
    public admob:string
   
    public ad_unit_id_banner:string
   
    public ad_unit_id_interstitial:string
   
    public google_analytic_id:string
   
    public rate_app:string
   
    public share_app:string
   
    public facebook_login:string
   
    public google_login:string
   
    public default_notification:string
   
    public onesignal_app_id:string
   
    public onesignal_sender_id:string
   
    public ios_admob:string
   
    public ios_ad_unit_id_banner:string
   
    public ios_ad_unit_id_interstitial:string
   
    public app_icon_image:string
   
    public client_id:number
  
    constructor() { }

    public static init(){

      let config: IConfig= {

        id: null,
               
        facebook_app_id: null,

        address: null,
               
        state: null,

        country: null,
 
        contact_us_email: null,
  
        latitude: null,
               
        longitude: null,

        phone_no: null,

        fcm_android_sender_id: null,

        lazzy_loading_effect: null,

        new_product_duration: null,

        notification_text: null,

        notification_title: null,

        notification_duration: null,

        currency_symbol: null,
                   
        cart_button: null,
 
        footer_button: null,

        app_name: null,

        home_style: null,

        category_style: null,

        site_url: null,
               
        intro_page: null,

        my_orders_page: null,

        manager_page: null,

        news_page: null,

        wish_list_page: null,

        shipping_address_page: null,
   
        about_us_page: null,
  
        contact_us_page: null,
  
        edit_profile_page: null,

        package_name: null,

        setting_page: null,
 
        admob: null,
 
        ad_unit_id_banner: null,

        ad_unit_id_interstitial: null,

        google_analytic_id: null,

        rate_app: null,

        share_app: null,

        facebook_login: null,

        google_login: null,

        default_notification: null,

        onesignal_app_id: null,

        onesignal_sender_id: null,

        ios_admob: null,

        ios_ad_unit_id_banner: null,

        ios_ad_unit_id_interstitial: null,

        app_icon_image: null,

        client_id: null,
                   
    }

    return config

  }
  
  public static getTableStructure()
  {

    let structure: any = [
   
      { 'name': 'client_id', 'type': 'INTEGER PRIMARY KEY' },

      { 'name': 'id' , 'type':'INTEGER' },
     
      { 'name': 'facebook_app_id', 'type': 'TEXT' },
     
      { 'name': 'address', 'type': 'TEXT' },
     
      { 'name': 'state', 'type': 'TEXT' },
     
      { 'name': 'country', 'type': 'TEXT' },
     
      { 'name': 'contact_us_email', 'type': 'TEXT' },
     
      { 'name': 'latitude', 'type': 'TEXT' },
     
      { 'name': 'longitude', 'type': 'TEXT' },
     
      { 'name': 'phone_no', 'type': 'TEXT' },
     
      { 'name': 'fcm_android_sender_id', 'type': 'TEXT' },
     
      { 'name': 'lazzy_loading_effect', 'type': 'TEXT' },
     
      { 'name': 'new_product_duration', 'type': 'TEXT' },
     
      { 'name': 'notification_text', 'type': 'TEXT' },
     
      { 'name': 'notification_title', 'type': 'TEXT' },
     
      { 'name': 'notification_duration', 'type': 'TEXT' },
     
      { 'name': 'currency_symbol', 'type': 'TEXT' },
     
      { 'name': 'cart_button', 'type': 'TEXT' },
     
      { 'name': 'footer_button', 'type': 'TEXT' },
     
      { 'name': 'app_name', 'type': 'TEXT' },
     
      { 'name': 'home_style', 'type': 'TEXT' },
     
      { 'name': 'category_style', 'type': 'TEXT' },
     
      { 'name': 'site_url', 'type': 'TEXT' },
     
      { 'name': 'intro_page', 'type': 'TEXT' },
     
      { 'name': 'my_orders_page', 'type': 'TEXT' },

      { 'name': 'manager_page', 'type': 'TEXT' },
     
      { 'name': 'news_page', 'type': 'TEXT' },
     
      { 'name': 'wish_list_page', 'type': 'TEXT' },
     
      { 'name': 'shipping_address_page', 'type': 'TEXT' },
     
      { 'name': 'about_us_page', 'type': 'TEXT' },
     
      { 'name': 'contact_us_page', 'type': 'TEXT' },
     
      { 'name': 'edit_profile_page', 'type': 'TEXT' },
     
      { 'name': 'package_name', 'type': 'TEXT' },
     
      { 'name': 'setting_page', 'type': 'TEXT' },
     
      { 'name': 'admob', 'type': 'TEXT' },
     
      { 'name': 'ad_unit_id_banner', 'type': 'TEXT' },
     
      { 'name': 'ad_unit_id_interstitial', 'type': 'TEXT' },
     
      { 'name': 'google_analytic_id', 'type': 'TEXT' },
     
      { 'name': 'rate_app', 'type': 'TEXT' },
     
      { 'name': 'share_app', 'type': 'TEXT' },
     
      { 'name': 'facebook_login', 'type': 'TEXT' },
     
      { 'name': 'google_login', 'type': 'TEXT' },
     
      { 'name': 'default_notification', 'type': 'TEXT' },
     
      { 'name': 'onesignal_app_id', 'type': 'TEXT' },
     
      { 'name': 'onesignal_sender_id', 'type': 'TEXT' },
     
      { 'name': 'ios_admob', 'type': 'TEXT' },
     
      { 'name': 'ios_ad_unit_id_banner', 'type': 'TEXT' },
     
      { 'name': 'ios_ad_unit_id_interstitial', 'type': 'TEXT' },
     
      { 'name': 'app_icon_image', 'type': 'TEXT' },
     
    ]

    return structure

  }

}
