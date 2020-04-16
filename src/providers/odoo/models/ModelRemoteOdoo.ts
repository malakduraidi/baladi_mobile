export declare class ModelRemoteOdoo {
  constructor();

  public static getRemoteModelName();
  public static getRelationalField();
  public static getBinaryField(): any;
  public static getRemoteFields();
  public getRemoteModelName();
  public getMetaDomain();
  public getRelationalField();
  // for syncing operation
  getStore();
  selectAll();

  loadHTTP(data);

  selectByID(recordClientID);
  deleteManyDB(ids);
  selectSyncing();
  startSync(syncType);
  addHTTP(record);
  updateHTTP(record);
}

export const modelURL = {
  'product.product': '/grefoot/api/global/',
  'product.template': '/grefoot/api/global/',
  'product.public.category':'/grefoot/api/global/',
  'ks_product_main.slider':'/grefoot/api/global/',
  'grefoot.mobile_config': '/grefoot/api/global/',
  'res.country':'/grefoot/api/global/',
  'res.country.state':'/grefoot/api/global/',


}

export interface IOdooErrorData {
  arguments: any[];
  debug: string;
  exception_Type;
  // mos usefull
  message: string;
  // error type
  name: string;
}

export interface IOdooError {
  code: number;
  data: IOdooErrorData;
  message: string;
}

export interface RegisterOdooData{
  customers_firstname: string,
  email: string,
  password: string,
  confirm_password: string,
  customers_telephone: string
}


export interface PublicOdooRequest {
  model: string;
  domain: any;
  offset: number;
  limit: number;
  fields: any;
}

export interface AuthOdooData{
  db: string,
  email: string,
  password: string
}

export interface OdooChatMessage {
  attachment_ids: any; //array 
  author_id?: any; //array first one is the ID the second is username
  body: string;//html e.g "<p>fasdfasdf</p>"
  channel_ids?: any;// array of channel ids eg. [0]
  customer_email_data?: any;// arra e.g []
  customer_email_status?: string;//email status e.g "sent"
  date?: string;// date of sent e.g "2019-11-23 17:31:34"
  email_from?: string;// sender email e.g  "malak <malak@kitchen-club.com>"
  id?: number;// record id e.g 123
  is_note?: boolean;// e.g false
  message_type?: string;// e.g "comment"
  model?: string;//e.g "mail.channel"
  needaction_partner_ids?: any;//array e.g []
  partner_ids?: any; //e.g []
  record_name?: string; //e.g (channel usernames ) "malak, obada"
  res_id?: number; //e.g 9
  starred_partner_ids?: any; //array e.g []
  subject?: boolean;//e.g false
  subtype_description?: boolean; //e.g false
  subtype_id?: any;//e.g (2)[1, "Discussions"]
  tracking_value_ids?: any; //e.g  []
  subtype?: string; //e.g "mail.mt_comment",

}

export interface OdooSentMessage {
  attachment_ids: any;//e.g  [];
  body: string; //e.g "test";
  content_subtype?: string;//e.g "html";
  message_type: string;//"comment";
  partner_ids: any;//e.g [];
  subtype?: string;//e.g  "mail.mt_comment";
}




export interface OdooChannel {
  alias_contact: string; //e.g "everyone"
  alias_defaults: string; // e.g "{}"
  alias_domain: boolean;//e.g false
  alias_force_thread_id: number; //e.g 18
  alias_id: any; //e.g (2) [18, "Inactive Alias"]
  alias_model_id: any // e.g (2) [142, "Discussion channel"]
  alias_name: boolean; // e.g false
  alias_parent_model_id: any;//eg (2) [142, "Discussion channel"]
  alias_parent_thread_id: number; //e.g 18
  alias_user_id: boolean; //e.g false
  channel_last_seen_partner_ids: any;//e.g (7) [41, 42, 43, 44, 45, 46, 47]
  channel_message_ids: any;//e.g (3) [140, 139, 136]
  channel_partner_ids: any;//e.g (7) [3, 22, 7, 20, 8, 13, 15]
  channel_type: string; //e.g "channel"
  create_date: string;//e.g  "2019-11-24 05:44:23"
  create_uid: any;//e.g (2) [1, "Administrator"]
  description: boolean;//e.g false
  display_name: string;//e.g "malakonly"
  email_send: boolean; //e.g false
  group_ids: any;//e.g []
  group_public_id: any;//e.g (2) [1, "Employees / Employee"]
  id: number //e.g 18,
  image: string //e.g "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAu↵IwAALiMBeKU/dgAAAAd0SU1FB9wECRMNILEA3BIAAAumSURBVHja7Z1rbBzVFcfPuXdmvLv22t74↵HZvEdhw3xiFJASUB1BI1RaVAC0JKK0X9Qlu1FQpFERVQVZWSNiChQHkmlFfTgtqqCCgUREuI2gIF↵FChtE+KQQEicxI7j2Hl41zs7r3tPP+zasR3b69fuztr3/8myZmdnzu+ec885c+cuEhEo5U5MmUAB↵UACUFAAFQEkBUACUFAAFQCm70nLwna7tfvS6PNvlvPYwCnfUQ8ixtKvWsYqFMGqh7tp8yZXa0jWz↵AABmuRXh7dmVeOo2OnMCAyHUAwSAiCOtT4SI5DpAYoyrZpSIgW0C4BiOzbRLr2N1LaOfQQpW2cC/↵sJqENyp9ZBxLqrC0CqQY/AgGw/kNwPtst9j3tvW7O3lVPSAmrTy1Uw18Fsc7xHPOm++CuwbXJjs+↵xhkI9ABvXsXKL6LzACSrrGellYBcW3Uji9TkHwBz6zrR9hYGwyTllE0/I5oIexIekBzGzLNBeMA4↵b17NGr4YWP+LfAJg/+VB55X7UTNGjTn+11BmJAUwDoChu1/i9cvzIAvyDr7vvvkkaHqeWh9GXDYy↵JEKA/o0rZF9PHgCQXYfkmS5ElqfWHwUGIpHkNU3Rb1f6HQAlYs7ftmNhySx78oOIJDy+YIH1/C/9↵7QGagQVFMI2cx88MkHF355P+9oBYrzzyX2R8VtaxRISabj5yi489QEqy4zDrhv/5QEREPe0+7wXN↵TusPLbx9DmC2i2kKQI7nAgUgb51HmUABmA3ZqAKQU43Z91YAVAhSUgAUACUFQAFQUgB8Kc3H10ZE↵CACIwDQaUfeQQCJAJF+0WqfRbNd8Y+zUWiEAQCTkAARcl8jAMbHzQ06DpiYwCqGiWXAdhIu5Z0BE↵Z07mC4Dzg3poBzH5TymR6wQIibPYtYdznczTTEoEgJHP0wjOHWVMg6a1LskUs1xhQCNQ9GhbXgAg↵AEBGiEASPAdJAgABgtmLvZ8xbkD/KQYAyIDrBMSQAWdDXWTgD0ZSoBS0/1V9ydddpsEABjUHXDjL↵h0u5ISWBHUWSKDySHgoPoieYZ4N00Y4icuA6uSbqgSQnJEJkwwb1oHExaWokAGScDu3Sm65xGUt9↵UAFIyT52LL7nY5IU3/2eczDiAbejCASuDcJGREANEAAQ9OAIiw+O5fGtiQCEiFJS1x6+YLXwLJzT↵HnBu19+tQ5+TlKdffBmIRDwuTRMIRF8fQXEysKS+siA1VAeiygQtPjoDALT6mB0TmkH5uPZl6gC6↵fv2U13tGWomT255goSDqOiYDgRjem2WM4Yg4jtNO3oYyAJJgRbGogjAPo9DkAHy+YSN57skntnMj↵rEVKkXNA1EqLUxmNlDDu6s9MDE9EcuLYf4oV1wjhzFIPMA9+2vunFzruuU8viwBBsL4ZgIAG1gzn↵eskh4nSWJfgegHXs+KHv/cjcu6+gpnrA4jRw534YbwiMnBi4JnJ9NoagT772Dbe3V58X8eccl5xX↵7ChzTclLctItmZZN0jTjTjy8ze3p4YWFvs0wkgUB8twMfUQk28wggPiej9EwwNcvViAimWfQs/Jy↵CWQaAOfe2MkMw/+3gZi7zjpmEgDT9XwYRogMrHNIIvsugGT2ZRBAXogImEZ9HUy4kOXXcMi1Aj/Y↵PtcBIBIQcmNwTs5eCgTCM768PoMA8uTFLkQGsW6GLPW8IXuz/7B3iTMAwKitHdnb8Wscmko3bzpj↵H4A8J+PvCZd/62Zy3Hzwg9Q8nIUQlNrKQnhYsaBw867MAghdcokw4/5vcREBN6i7jQNkdh5OWd9z↵qa8n+P3HMl4HlK5dI/rz4BW75DysBZKvw1Lmwg4iSs9h1Y2he97mjSumf9r0vSBkDPIkBMW6GTe8↵KTelx2u3ECEASUl2P69rLdzy1kxdd3oAtXfdceqZ37JgMA8mYpk+eRvvcQUAjdXX5hpqOnI9fH/7↵zF5zegC8uFgKkRf1AqL0MKI1LEg+Grog3Gri6F4YM3FE2dNe/JLM8jWnB1Cyds3Rn/5cKyry/TxM↵XJOd3StaHvnNWMfENi4HMzrGlEZQEPI+3a01r8rmZacf2Xp5efGXrvJ/NZB8Nse08YZw8JYHpJMY↵PUYRYbBY/O/NLF92egAFdbXB5sV5Uo6l8/dlXy3cvEvGz46yUV1yDimK+A6AdF1y3exv75ch8QVL↵0QhemNchIhaE7Ofu9h0AHgoVXX6ZjPu9HKPk8t0JeGrh1n9TQZCkHCW9LorYr/zKXwAAQCubx0v9↵vuMSIkrbDrW2pL/nefNDdzzPItXkWEPnAyJiXHNefzSrHrlp06b0B4XD/R986J7q8a0TpMpUTW95↵+fkJjbvSSla/jNUs9j56DYlQDxAN7OXIGMT7tKVX+yUNBYBA/UIWDoOU09mXJbP9Gc6tI4dbXn5x↵Ene+eKW2eCWWVoPZl3jgu6y2DjQDiFBK950/sPpl+qqb/BKCAIBpmj9DEBEhY86JrsbHH5t34w2T↵/bhxxc3G2lvCfzzFW68WJw6TbZJrkRl13/69jJ/NRuScoFkPrFsfe/d9Xz2gPx+7Haf8O+sbtt47↵/XOKzoMgPOfVh9y3ntMuvyF05wt+AWAf7zhw0zq393SON70VAojI88h1A4saMRgk11v23j/yuDSZ↵KKhAgDyRc+uHll+il5XxcFjE+ms2bjAqK435NZDPmigAo6J8jL3GM5JRAtGFzWGZSCzYsqloxXKY↵RZpEfftBeR0vKszURIoIiCIeB0nu6R6tJKJFSkgOY0BEzDAu/WzfbAIwibSy5Y1XiWimcqGh5Q8Q↵iWgs0X64YdvDi57efhXZdT+7S5iJER6AiNKyEoc+n6MeAAAfVNRNYaHu4PGUbNNLAoa8sJAYA+Hp↵5eUL79sSaFpkVFWdn/M7TxzesDH+0X+QsRFfJyxr5cmjcxRA945nj9x6u15dlfY3AIbt9+660vNk↵PF502aWAyMJFRlVV5PprQ60XB5sXj5l3dXQevvXHsfd2s0AANX6+3OW85Ctrmp5+fLK36nmpn0th↵jDPfVJST7nEe+uGGnh3PGnW1IOXoroBAQpLniVg/uS7qWuT664zqSq2sbN7NNyJjoZYlE/wuq/3o↵6Rf/fO6vO6P/elcrKcFAIOVJQsz75g2N2x6ayEmOHj0Sj5uO41hW6j1Kxlg4HJZyzBsvLi4exyyc↵s/nza3MGAAAO3/6TzkceKCiv5YWFQyO0tCyQ5Jw6FWhqLL7yitLrrjWqq4Cx4OImo7pqypdotbdH↵//mO2fZJ9zM7vGgUk64gqfSata07X0tTPx44EI32cc5hyNPgtLcspRw3R8NAoGCsc2iaxhhbtGiR↵pumZApBU59YHj2/eMvigRlpmzW0beFF44b2bSUrMgI9L2ybHGToUeSg0zvH79+9LJCyc3u/VjJM+↵jK+SkpKmpsUZBOB/7d/flkgksl88Jnm7rtPcvCQSicxYGppfMk3TGeou2ZxXEYlI1419+z6eyTog↵v9Td3eW6bq56J0kGwWCws7NjjgLI+U/WICIi9vX1zVEA/hgEmEgkFIBcKm2OowBkUEKIurqLFIBc↵hiCRbpmMApBjKQAKgAKgpAAoAEoKgAKgNPM1sKqEc1mFua5TV1enAKgQpKQAKABKCkAOEqE5DICI↵IKebKkspa2pq5i6AhobGYLAwV4tukquYGxoa53QICoeLJlgNzbjpAaCmZv6EyoVZvDALADo6jh87↵dswwjORq3OkvkRu26Jho1GdeQojW1qXhcFgBSKm9/UhHR4dhGEnbTW29EBENghyU53ktLRc7jsV5↵6l0j1/UqKiomUTDPBQCDcl0XAPSpbgfc1tZmWcPWOrquu2rVapWGTlS6ruvT2Iy5tbV1SIql6oBc↵qLi4JOlGSQycc9u2p3PCuRWCZmhi74hG+0zTTM4HnuetXLlKAci29u7dE4vFkhN7Wdm8hoZFCkAO↵1NXVJYTo6jpRUVFRX9+gAOSf1CSsACgASgqAAqCkACgASgqAAqCkACgASgqAAqCUJf0fFkxzEMI0↵n0EAAAAASUVORK5CYII=↵"
  image_medium: boolean; //e.g false
  image_small: boolean; //e.g false
  is_member: boolean;//e.g true
  is_subscribed: boolean //e.g true
  message_channel_ids: any; //e.g [18]
  message_follower_ids: any; //e.g [61]
  message_ids: any;// e.g (3) [140, 139, 136]
  message_is_follower: boolean;///e.g false
  message_last_post: boolean; //e.g false
  message_needaction: boolean; //e.g false
  message_needaction_counter: number; //e.g 0
  message_partner_ids: any;//e.g []
  message_unread: any; //e.g true
  message_unread_counter: number;//e.g 2
  last_message: any;
  name: string;//e.g  "malakonly"
  public: string // e.g "private" or "public"
  uuid: string;//e.g "0c41d609-bd93-432f-a6c8-d30f1aa31683"
  write_date: string; //e.g "2019-11-24 06:00:37"
  write_uid: any; //e.g (2) [1, "Administrator"]
  __last_update: string //e.g "2019-11-24 06:00:37"
}