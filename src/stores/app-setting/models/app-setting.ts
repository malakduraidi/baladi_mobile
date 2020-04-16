import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface ICredential {
  username: string;
  password: string;
  uid: string;
}
export interface IUserType {
  group_id: string;
  group_name: string;
}

export interface ISetting {
  id: number;

  username: string;

  password: string;

  token: string;

  uid: number;

  last_login: string;
  last_sync: string;

  language: number;

  device_number: string;

  device_type: string;

  write_date: string;

  server_id: number;

  server_url: string;

  one_signal_user_id: string;

  one_signal_push_token: string;

  // check if there is update on one_signal
  // should be datetime as string

  one_signal_last_update: string;

  one_signal_is_dirty: number;

  db: string;

  customer_code: string;

  expiration_date: string;
  user_role: string;

  connection_type: string;
  connection_status: string;
  bluetooth_printer: any;
  company_name: string;
  company_number: string;
  logo: string;
}

@Injectable()
export class Setting implements ISetting {
  constructor() {}
  public id: number;

  public username: string;

  public password: string;

  public token: string;

  public uid: number;

  public last_login: string;

  public last_sync: string;

  public language: number;

  public device_number: string;

  public device_type: string;

  public write_date: string;

  public server_id: number;

  public server_url: string;

  public db: string;

  public customer_code: string;
  public user_role: string;

  public one_signal_push_token: string;
  public one_signal_user_id: string;
  public one_signal_last_update: string;
  public one_signal_is_dirty: number;

  public expiration_date: string;

  public connection_type: string;

  public connection_status: string;

  public company_name: string;
  public company_number: string;

  public logo: string;
  public sync_time: number;
  public bluetooth_printer: any;

  public static init() {
    const setting: ISetting = {
      id: null,

      username: null,

      password: null,

      token: null,

      uid: null,

      last_login: null,

      last_sync: null,

      language: null,

      device_number: null,

      device_type: null,

      write_date: null,

      server_id: null,

      server_url: null,
      user_role: null,

      db: null,

      customer_code: null,

      one_signal_push_token: null,
      one_signal_user_id: null,
      one_signal_last_update: null,
      one_signal_is_dirty: 1,

      expiration_date: null,

      connection_type: null,

      connection_status: null,
      bluetooth_printer: [],
      company_name: null,
      company_number: null,
      logo: null
    };

    return setting;
  }

  public static getTableStructure() {
    const structure: any = [
      { name: 'id', type: 'INTEGER PRIMARY KEY' },

      { name: 'username', type: 'TEXT' },

      { name: 'password', type: 'TEXT' },

      { name: 'token', type: 'TEXT' },

      { name: 'uid', type: 'INTEGER' },

      { name: 'last_login', type: 'TEXT' },

      { name: 'last_sync', type: 'TEXT' },

      { name: 'language', type: 'INTEGER' },

      { name: 'device_number', type: 'TEXT' },

      { name: 'device_type', type: 'TEXT' },

      { name: 'write_date', type: 'TEXT' },

      { name: 'server_id', type: 'INTEGER' },

      { name: 'server_url', type: 'TEXT' },

      { name: 'db', type: 'TEXT' },

      { name: 'customer_code', type: 'TEXT' },

      { name: 'one_signal_push_token', type: 'TEXT' },
      { name: 'one_signal_user_id', type: 'TEXT' },
      { name: 'one_signal_last_update', type: 'TEXT' },
      { name: 'one_signal_is_dirty', type: 'INTEGER' },

      { name: 'expiration_date', type: 'TEXT' },

      { name: 'connection_type', type: 'TEXT' },

      { name: 'connection_status', type: 'TEXT' },

      { name: 'bluetooth_printer', type: 'ANY' },

      { name: 'company_name', type: 'TEXT' },
      { name: 'user_role', type: 'TEXT' },

      { name: 'company_number', type: 'TEXT' },

      { name: 'logo', type: 'TEXT' },
      { name: 'sync_time', type: 'INTEGER' }
    ];
    return structure;
  }
}
