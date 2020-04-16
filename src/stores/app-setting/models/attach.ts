import { Injectable } from '@angular/core';



@Injectable()
export class Attach {
  constructor() { }
  // public id: number;

  // public username: string;

  // public password: string;

  // public token: string;

  // public uid: number;

  // public last_login: string;

  // public last_sync: string;

  // public language: number;

  // public device_number: string;

  // public device_type: string;

  // public write_date: string;

  // public server_id: number;

  // public server_url: string;

  // public db: string;

  // public customer_code: string;
  // public user_role: string;

  // public one_signal_push_token: string;
  // public one_signal_user_id: string;
  // public one_signal_last_update: string;
  // public one_signal_is_dirty: number;

  // public expiration_date: string;

  // public connection_type: string;

  // public connection_status: string;

  // public company_name: string;
  // public company_number: string;

  // public logo: string;
  // public sync_time: number;
  // public bluetooth_printer: any;

  // public static init() {
  //   const setting: ISetting = {
  //     id: null,

  //     username: null,

  //     password: null,

  //     token: null,

  //     uid: null,

  //     last_login: null,

  //     last_sync: null,

  //     language: null,

  //     device_number: null,

  //     device_type: null,

  //     write_date: null,

  //     server_id: null,

  //     server_url: null,
  //     user_role: null,

  //     db: null,

  //     customer_code: null,

  //     one_signal_push_token: null,
  //     one_signal_user_id: null,
  //     one_signal_last_update: null,
  //     one_signal_is_dirty: 1,

  //     expiration_date: null,

  //     connection_type: null,

  //     connection_status: null,
  //     bluetooth_printer: [],
  //     company_name: null,
  //     company_number: null,
  //     logo: null
  //   };

  //   return setting;
  // }

  public static getTableStructure() {
    const structure: any = [
      { name: 'id', type: 'INTEGER PRIMARY KEY' },

      { name: 'name', type: 'TEXT' },
      { name: 'server_id', type: 'INTEGER' },

      { name: 'file_local_path', type: 'TEXT' },
      { name: 'file_server_path', type: 'TEXT' },
      { name: 'mime_type', type: 'TEXT' },
      { name: 'write_date', type: 'TEXT' },

    ];
    return structure;
  }
}
