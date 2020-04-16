import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpClient,
  HttpEventType,
  HttpHeaders
} from '@angular/common/http';

import { Subject } from 'rxjs';
import { share, take } from 'rxjs/operators';
import { SettingState } from 'src/stores/app-setting/reducers/app-setting.reducer';
import { Store } from '@ngrx/store';
import { getSettings } from 'src/stores/app-setting/reducers/index';
import { ADD } from 'src/stores/error/store/actions';
import { ErrorState } from 'src/stores/error/store/state';

@Injectable()
export class OdooJsonRPC {
  private jsonRpcID = 0;
  private headers: Headers;
  private odoo_server: string;
  private odoo_server_poll: string;

  // private syncStore: Store<fromSyncStore.SyncState>;
  private http_auth: string;
  private list = '/web/database/list';
  private get_list = '/web/database/get_list';
  private jsonrpc = '/jsonrpc';
  private context = null;

  private requestObs = new Subject<any>();
  session_id: any;

  constructor(
    private http: HttpClient,
    private appStore: Store<SettingState>,
    private errStore: Store<ErrorState>
  ) {
    this.http = http;
    this.getContext();
  }

  /**
   * Builds a request for odoo server
   * @param url Odoo Server URL
   * @param params Object
   */
  private buildRequest(url: string, params: any) {
    this.jsonRpcID += 1;
    return JSON.stringify({
      jsonrpc: '2.0',
      method: 'call',
      id: this.jsonRpcID,
      params
    });
  }

  /**
   * Returns the error message
   * @param response Error response from server
   */
  public handleOdooErrors(response: any) {
    const err: string = response.error.data.message;
    const msg = err.split('\n');
    const errMsg = msg[0];
  }

  /**
   * Handles HTTP errors
   */
  public handleHttpErrors(error: any) {
    return Promise.reject(error.message || error);
  }

  /**
   * Sends a JSON request to the odoo server
   * @param url Url of odoo
   * @param params Object
   */
  public sendRequest(url: string, params: any): Promise<any> {

    const options = this.buildRequest(url, params);
    this.headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'X-Openerp-Session-Id': this.session_id

    });

    const result = new HttpRequest('POST', this.odoo_server + url, options, {
      withCredentials: true,
      // headers: this.headers
      reportProgress: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'

      })
    });
    // const obs = this.http.request(result).share();
    const obs = this.http.request(result).pipe(share());
    obs.subscribe(
      event => {
        if (event.type === HttpEventType.DownloadProgress) {
          // this.syncStore.dispatch(
          //   new fromSyncStore.UpdateLoadingUploading({
          //     total: (event.total / 1024).toFixed(3).toString(),
          //     current: (event.loaded / 1024).toFixed(3).toString(),
          //     opType: 'LOADING'
          //   })
          // );
        }

        if (event.type === HttpEventType.UploadProgress) {
          // this.syncStore.dispatch(
          //   new fromSyncStore.UpdateLoadingUploading({
          //     total: (event.total / 1024).toFixed(3).toString(),
          //     current: (event.loaded / 1024).toFixed(3).toString(),
          //     opType: 'UPLOADING'
          //   })
          // );
        }

        if (event.type === HttpEventType.Response) {
        }
      },
      err => {
        this.errStore.dispatch(new ADD(err));
        // alert('Error in the request please restart the app and try again');
        // alert(JSON.stringify(err));
      }
    );

    return obs.toPromise();
  }

  public init(configs: any) {
    this.odoo_server = configs.odoo_server;
    this.http_auth = configs.http_auth || null;
  }
  public initPoll(configs: any) {
    this.odoo_server_poll = configs.odoo_server_poll;
    this.http_auth = configs.http_auth || null;
  }

  public UpdateConfig(configs: any) {
    this.odoo_server = configs.odoo_server;
  }

  public setOdooServer(odoo_server: string) {
    this.odoo_server = odoo_server;
  }

  public setHttpAuth(http_auth: string) {
    this.http_auth = http_auth;
  }

  /**
   * Gets the server info
   */
  public getServerInfo() {
    return this.sendRequest('/web/webclient/version_info', {});
  }

  /**
   * Gets the session info
   */
  public getSessionInfo() {
    return this.sendRequest('/web/session/get_session_info', {});
  }

  /**
   * Gets the Odoo Server Version Number
   */
  public getServerVersionNumber(): Promise<number> {
    return this.getServerInfo().then(
      (res: any): Promise<number> => {
        return new Promise<number>(resolve => {
          resolve(res.body.result.server_version_info[0]);
        });
      }
    );
  }

  /**
   * Get the database list
   */
  public getDbList(): Promise<string> {
    const dbParams = {
      context: {}
    };
    return this.getServerVersionNumber().then((data: number) => {
      if (data <= 8) {
        return this.sendRequest(this.get_list, dbParams);
      } else if (data === 9) {
        return this.sendRequest(this.jsonrpc, dbParams);
      } else {
        return this.sendRequest(this.list, dbParams);
      }
    });
  }

  /**
   * Returns all modules that are installed in your database
   */
  public modules(): Promise<string> {
    const params = {
      context: {}
    };
    return this.sendRequest('/web/session/modules', params);
  }

  /**
   * Login to the database
   * @param db Database name of odoo
   * @param login Username
   * @param password password
   */
  public login(db: string, login: string, password: string) {
    const params = {
      db,
      login,
      password,
      base_location: this.odoo_server,
      context: {}
    };
    return this.sendRequest('/web/session/authenticate', params);
  }

  /**
   * Check whether the session is live or not
   */
  public check(): Promise<string> {
    const params = {
      // context: this.getContext()
      context: this.context
    };
    return this.sendRequest('/web/session/check', params);
  }

  /**
   * Destroy the session
   */
  public destroy() {
    const params = {
      context: {}
    };
    return this.sendRequest('/web/session/destroy', params);
  }

  /**
   * Fires query in particular model with fields and conditions
   * @param model Model name
   * @param domain Conditions that you want to fire on your query
   *              (e.g) let domain = [
   *                         ["id","=",11]
   *                    ]
   * @param fields Fields names which you want to bring from server
   *              (e.g) let fields = [
   *                         ["id","name","email"]
   *                    ]
   * @param limit limit of the record , offset
   * @param sort sorting order of data (e.g) let sort = "ascending"
   */
  public searchRead(
    model: string,
    domain: any,
    fields: any,
    limit: number,
    offset: any,
    sort: string
  ) {
    this.getContext()
    const params = {
      model,
      fields,
      domain,
      offset,
      limit,
      sort,
      context: this.context
    };
    return this.sendRequest('/web/dataset/search_read', params);
  }

  /**
   * Calls the method of that particular model
   * @param model Model name
   * @param method Method name of particular model
   * @param args Array of fields
   * @param kwargs Object
   */
  public call(model: string, method: string, args: any, kwargs?: any) {
    kwargs = kwargs || {};
    const params = {
      model,
      method,
      args,
      kwargs: kwargs === false ? {} : kwargs,
      // context: this.getContext()
      context: this.context
    };
    return this.sendRequest('/web/dataset/call_kw', params);
  }

  /**
   * for long polling
   * @param method Method name of particular model
   * @param args Array of fields
   * @param kwargs Object
   */
  public callPoll(channels: any, last: any, options: any) {
    const params = {
      channels,
      options,
      last,
      // context: this.getContext()
      context: this.context
    };
    return this.sendRequestPoll('', params);
  }

  /**
   * Reads that perticular fields of that particular ID
   * @param model Model Name
   * @param id Id of that record which you want to read
   * @param mArgs Array of fields which you want to read of the particular id
   */

  public read(
    model: string,
    id: Array<number>,
    mArgs: Array<string>
  ): Promise<any> {
    const args = [id, mArgs];
    return this.call(model, 'read', args);
  }

  /**
   * Loads all data of the paricular ID
   * @param model Model name
   * @param id Id of that particular data which you want to load
   */
  public load(model: string, id: number): Promise<any> {
    const params = {
      model,
      id,
      fields: [],
      // context: this.getContext()
      context: this.context
    };
    return this.sendRequest('/web/dataset/load', params);
  }

  /**
   * Provide the name that you want to search
   * @param model Model name
   * @param name Name that you want to search
   */
  public nameSearch(model: string, name: string): Promise<any> {
    const kwargs = {
      name,
      args: [],
      operator: 'ilike',
      limit: 0
    };
    return this.call(model, 'name_search', [], kwargs);
  }

  /**
   * Provide the IDs and you will get the names of that paticular IDs
   * @param model Model name
   * @param mArgs Array of IDs that you want to pass
   */
  public nameGet(model: string, mArgs: any): Promise<any> {
    const args = [mArgs];
    return this.call(model, 'name_get', args);
  }

  /**
   * Create a new record
   * @param model Model name
   * @param mArgs Object of fields and value
   */
  public createRecord(model: string, mArgs: any) {
    const args = [mArgs];
    return this.call(model, 'create', args, null);
  }

  /**
   * Delete the record of particular ID
   * @param model Model Name
   * @param id Id of record that you want to delete
   */
  public deleteRecord(model: string, id: number) {
    const mArgs = [id];
    return this.call(model, 'unlink', mArgs, null);
  }

  /**
   * Updates the record of particular ID
   * @param model Model Name
   * @param id Id of record that you want to update the.
   * @param mArgs The Object of fields and value that you want to update
   *              (e.g)
   *              let args = {
   *                 "name": "Mtfa"
   *              }
   */
  public updateRecord(model: string, id: number, mArgs: any) {
    const args = [[id], mArgs];
    return this.call(model, 'write', args, null);
  }

  /**
   * Get the User Context from the response of odoo server
   */
  private getContext() {
    // get token from the store

    let response = '';
    this.appStore.select(getSettings).pipe(take(1)).subscribe(data => {
      


      this.context = {};
      if (data && data[0]) {
        response = data[0].token;

        // response = localStorage.getItem('token');

        let jsonData = null;
        try {
          jsonData = JSON.parse(response);
        } catch (e) {
          // alert(e); // error in the above string (in this case, yes)!
        }

        this.context = {};
        if (!!jsonData) {
          this.context = jsonData.result.user_context;
          this.session_id = jsonData.result.session_id;
          document.cookie = 'session_id=' + this.session_id
        }
      }
    });

    // return context;
  }

  /**
   * Sends a JSON request to the odoo server for pll request
   * @param url Url of odoo
   * @param params Object
   */
  public sendRequestPoll(url: string, params: any): Promise<any> {
    const options = this.buildRequest(url, params);
    this.headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });

    const result = new HttpRequest(
      'POST',
      this.odoo_server_poll + url,
      options,
      {
        withCredentials: true,
        // headers: this.headers
        reportProgress: true,
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8'
        })
      }
    );
    // const obs = this.http.request(result).share();
    const obs = this.http.request(result).pipe(share());
    obs.subscribe(
      event => {
        if (event.type === HttpEventType.DownloadProgress) {
          // this.syncStore.dispatch(
          //   new fromSyncStore.UpdateLoadingUploading({
          //     total: (event.total / 1024).toFixed(3).toString(),
          //     current: (event.loaded / 1024).toFixed(3).toString(),
          //     opType: 'LOADING'
          //   })
          // );
        }

        if (event.type === HttpEventType.UploadProgress) {
          // this.syncStore.dispatch(
          //   new fromSyncStore.UpdateLoadingUploading({
          //     total: (event.total / 1024).toFixed(3).toString(),
          //     current: (event.loaded / 1024).toFixed(3).toString(),
          //     opType: 'UPLOADING'
          //   })
          // );
        }

        if (event.type === HttpEventType.Response) {
        }
      },
      err => {
        console.log(
          'Error in the request please restart the app and try again'
        );
        console.log(JSON.stringify(err));
      }
    );

    return obs.toPromise();
  }
}
