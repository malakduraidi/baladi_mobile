import { Injectable } from '@angular/core';

import { OdooJsonRPC } from './odooJsonRPC';

import { from, throwError, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimeService } from '../../time.service';
import { OdooChatMessage, PublicOdooRequest, AuthOdooData, RegisterOdooData, modelURL } from '../models/ModelRemoteOdoo';
import { ConfigService } from 'src/providers/config/config.service';

@Injectable()
export class OdooAPI {
  last = 0;
  constructor(
    private odooJsonRPC: OdooJsonRPC, // private fileOperations: FileOperations,
    private httpClient: HttpClient,
    private timeService: TimeService,
    private config:ConfigService
  ) { }


  loadPublicRecords(requestData:PublicOdooRequest){

    const model = requestData.model
    const dataTosend = 
    { 
      model: requestData.model, 
      domain: requestData.domain, 
      offset: requestData.offset, 
      limit: requestData.limit, 
      fields: requestData.fields};

    return this.httpClient
      .post(
        this.config.yourSiteUrl + modelURL[model],
        {params :dataTosend}
      )
      .pipe(
        map((data: any) => {
          if ('error' in data){
            throw new Error(JSON.stringify(data.error));
          } else if('result' in data){
            return data.result.records;
          }
        })
      );
  }

  loadProductsPublic() {
    const dataTosend = { fields: ['name','website_url','product_tmpl_id'], model: 'product.product' };

    return this.httpClient
      .post(
        this.config.yourSiteUrl + '/grefoot/api/products/',
        {params :dataTosend}
      )
      .pipe(
        map((data: any) => {
          if ('error' in data){
            throw new Error(JSON.stringify(data.error));
          } else if('result' in data){
            return data.result.records;
          }
        })
      );
  }

  loadRecords(modelName, domain, offset?, limit?, fields?, sort?) {
    if (!domain) {
      domain = [[]]
    }

    if (!limit) {
      limit = 10;
    }
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        domain,
        fields,
        limit,
        offset,
        sort

      )
    )
      .pipe(
        map(data => {
          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result.records;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  updateRecord(modelName, recordId, data) {
    return from(
      this.odooJsonRPC.updateRecord(modelName, recordId, data)
    )
      .pipe(
        map(data => {
          if (data.body.error) {
            const error = {
              message: 'Error adding record',

              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );


  }

  deleteRecord(modelName, recordId) {
    return from(this.odooJsonRPC.deleteRecord(modelName, recordId)).pipe(
      map(data => {
        if (data.body.error) {
          const error = {
            message: 'Error adding record',

            model: modelName,
            odoo: data
          };
          throw new Error(JSON.stringify(error));
        }

        return data.body.result;
      })
    )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );


  }

  addRecord(record: any, modelName) {
    
    return from(this.odooJsonRPC.call(modelName, "create", [ record ])
      ).pipe(
      map((data: any) => {
        // result here should be the server id
        if (!!!data.body.result) 
        {
          let error = {
            message: "Error adding record",
            model: modelName,
            odoo: data
          };
          throw new Error(JSON.stringify(error));
        }
        return data.body.result;
      }))
      .pipe(
        catchError((error: any) => {
          return Observable.throw(error);
        })
      );
  }


  loadImage(modelName, record_id, image_field_name) {
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        [['id','=',record_id]],
        [image_field_name],
        null,
        null,
        null

      )
    )
      .pipe(
        map(data => {
          
          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result.records;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }
  authenticate( auth_data: AuthOdooData) {
    const promise = new Promise((resolve, reject) => {
      this.odooJsonRPC.login(auth_data.db, auth_data.email, auth_data.password).then(
        data => {
          if (data && data.body) {
            if ('error' in data.body){
              reject(data.body.error.data);
            }else if ('result' in data.body){
              resolve(data.body.result[0].data);
            }
        }},
        err => {
          resolve(err);
        }
      );
    });
    return promise;
  }

  register(reg_data: RegisterOdooData) {

    return this.httpClient
      .post(
        this.config.yourSiteUrl + '/grefoot/api/signup/',
        {params :reg_data}
      )
      .pipe(
        map((data: any) => {
          if ('error' in data){
            throw new Error(JSON.stringify(data.error.data.message));
          } else if('result' in data){
            if (data.result && data.result.code == 200){
              return data.result.records;
            }else{
              throw new Error(JSON.stringify(data.result.message));
            }
          }
        })
      );
  }

  addPublicOrder(order_data: any) {

    return this.httpClient
      .post(
        this.config.yourSiteUrl + '/grefoot/api/order/',
        {params :order_data}
      )
      .pipe(

        map((data: any) => {
          if ('error' in data){
            throw new Error(JSON.stringify(data.error.data.message));
          } else if('result' in data){
            if (data.result && data.result.code == 200){
              return data.result.records;
            }else{
              throw new Error(JSON.stringify(data.result.message));
            }
          }
        })
      );
  }



  initServerSettings(odoo_server, http_auth) {
    this.odooJsonRPC.init({
      odoo_server,
      http_auth
    });
  }

  initServerSettingsPoll(odoo_server_poll, http_auth) {
    this.odooJsonRPC.initPoll({
      odoo_server_poll,
      http_auth
    });
  }



  createAttach(name, data, mimetype, res_id) {
    const modelName = "ir.attachment"
    let attach = {
      'name': name,
      'display_name': name,
      'type': 'binary',
      'datas': data,
      'res_model': 'mail.channel',
      'res_id': res_id,
      'mimetype': mimetype,
    }

    return from(
      this.odooJsonRPC.call(modelName, 'create', [
        attach
      ])
    )
      .pipe(
        map((data: any) => {

          if (!!!data.body.result) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          // then success now send for push notification
          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );

  }


  getProducts() {
    const modelName = 'product.product';
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        [],
        [],
        null,
        null,
        null
      )
    ).pipe(
      map(data => {
        
        if (data.body.error) {
          // const error = {
          //   message: 'Error Getting User Type',
          //   model: modelName,
          //   odoo: data.error
          // };
          throw new Error(JSON.stringify(data.body.error));
        }

        return data.body.result;
      })
    );
  }

  updateWorkflow(toStatus, order_id) {
    return from(
      this.odooJsonRPC.call('rb_delivery.order', 'wkf_action_' + toStatus, [
        order_id
        // {
        //   // id: order_id
        //   '110'
        //   // domain: [['id', '=', order_id]]
        // }
      ])
    ).pipe(
      map(data => {
        if (data.body.error) {
          throw new Error(JSON.stringify(data.body.error));
        }

        return data.body.result;
      })
    );
  }

  loadArea(uid, offset, ids?: [], limit?: number) {
    const modelName = 'rb_delivery.area';
    const fields = ['id', 'code', 'name'];
    let domain = [];
    if (ids && ids.length > 0) {
      domain = [['id', 'in', ids]];
    }
    if (!limit) {
      limit = 10;
    }
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        domain,
        fields,
        limit,
        offset,
        null
      )
    )
      .pipe(
        map(data => {
          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  loadChat(domain, uid?, offset?, limit?: number) {
    const modelName = 'kc_academy.chat';
    const fields = ['id', 'title', 'header', 'message', 'to_type', 'to_user_ids', 'user_id', 'to_class_ids', 'create_date', 'attach_name'];
    if (!domain) {
      domain = [[]]
    }
    // if (ids && ids.length > 0) {
    //   domain = [['id', 'in', ids]];
    // }
    if (!limit) {
      limit = 100;
    }
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        domain,
        fields,
        limit,
        offset,
        "id desc"

      )
    )
      .pipe(
        map(data => {
          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  delete_unread_messages(from_user, to_user) {
    const modelName = 'kc_academy.unread_message';
    return from(
      this.odooJsonRPC.call(modelName, 'delete_rec', [
        {
          from_user: from_user,
          to_user: to_user,
        }
      ])
    )
      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }
  loadUnreadMessages(sender_id, receiver_id) {
    const modelName = 'kc_academy.unread_message';
    const fields = ['id', 'counter'];
    let domain = [['from_user', '=', sender_id], ['to_user', '=', receiver_id]]

    let limit = 1;

    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        domain,
        fields,
        limit,
        0,
        null,

      )
    )
      .pipe(
        map(data => {
          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }



  loadUser(uid, offset, ids?: [], limit?: number) {
    const modelName = 'kc_academy.user';
    const fields = ['id', 'user_id', 'partner_id', 'group_id', 'mobile_number', 'username', 'role_name', 'email', 'address', 'image'];
    let domain = [];
    if (ids && ids.length > 0) {
      domain = [['id', 'in', ids]];
    }
    if (!limit) {
      limit = 50;
    }
    if (uid) {
      domain = [['user_id', '=', uid]];
    }
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        domain,
        fields,
        limit,
        offset,
        null
      )
    )
      .pipe(
        map(data => {
          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  loadOrderType(uid, offset, ids?: [], limit?: number) {
    const modelName = 'rb_delivery.order_type';
    const fields = ['id', 'code', 'name'];
    let domain = [];
    if (ids && ids.length > 0) {
      domain = [['id', 'in', ids]];
    }
    if (!limit) {
      limit = 10;
    }
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        domain,
        fields,
        limit,
        offset,
        null
      )
    )
      .pipe(
        map(data => {
          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  getUserRoleId(uid) {
    const modelName = 'kc_academy.user';
    const domain = [['user_id', '=', uid]];
    return from(
      this.odooJsonRPC.searchRead(modelName, domain, ['id'], 1, 0, null)
    )
      .pipe(
        map(data => {
          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result.records[0].id;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  updateUserOneSignal(id, userId) {
    const modelName = 'kc_academy.user';
    return from(
      this.odooJsonRPC.updateRecord(modelName, id, { player_id: userId })
    )
      .pipe(
        map(data => {
          if (data.body.error) {
            const error = {
              message: 'Error adding record',

              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  loadOrder(uid, offset, ids?: [], limit?: number, domain?: any) {
    //
    const modelName = 'rb_delivery.order';
    const fields = [
      'id',
      'order_type_id',
      'customer_name',
      'customer_mobile',
      'customer_area',
      'customer_address',
      'sequence',
      'create_date',
      'assign_to',
      'cost',
      'delivery_cost',
      'note',
      'state'
    ];
    let outerDomain = [];

    // if (domain && domain.length > 0) {
    //   outerDomain.push(domain);
    // }
    if (ids && ids.length > 0) {
      // domain = [['id', 'in', ids]];
      outerDomain.push(['id', 'in', ids]);
    }

    if (!limit) {
      limit = 10;
    }
    if (outerDomain.length === 0) {
      outerDomain = domain;
    }
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        outerDomain,
        fields,
        limit,
        offset,
        null
      )
    )
      .pipe(
        map(data => {
          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  channelFetchPreview(im_user_ids) {
    const modelName = 'mail.channel';

    return from(
      // todo I don't now what 10 here means 
      this.odooJsonRPC.call(modelName, 'channel_fetch_preview', [im_user_ids], {}
      )
    )
      .pipe(
        map((data: any) => {
          if (!!!data.body.result) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          // then success now send for push notification
          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }

  channelGet(im_user_id) {
    const modelName = 'mail.channel';

    return from(
      // todo I don't now what 10 here means 
      this.odooJsonRPC.call(modelName, 'channel_get', [[im_user_id]], {}
      )
    )
      .pipe(
        map((data: any) => {
          if (!!!data.body.result) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          // then success now send for push notification
          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }

  imSearch(username) {
    const modelName = 'res.partner';

    return from(
      // todo I don't now what 10 here means 
      this.odooJsonRPC.call(modelName, 'im_search', [username, 10], {}
      )
    )
      .pipe(
        map((data: any) => {
          if (!!!data.body.result) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          // then success now send for push notification
          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }
  messageFetchListener(uuid) {
    const modelName = 'mail.channel';

    return from(
      // todo I don't now what 10 here means 
      this.odooJsonRPC.call(modelName, 'channel_fetch_listeners', [uuid]

      )
    )
      .pipe(
        map((data: any) => {
          if (!!!data.body.result) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          // then success now send for push notification
          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }

  getChannel(domain, limit) {
    const modelName = 'mail.channel';

    return from(
      // todo I don't now what 10 here means 
      this.odooJsonRPC.searchRead(
        modelName,
        domain,
        null,
        limit,
        0,
        null
      )
    )
      .pipe(
        map((data: any) => {

          if (!!!data.body.result) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          // then success now send for push notification
          return data.body.result.records;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }
  getPrivateChannel() {
    const modelName = 'mail.channel';

    return from(
      // todo I don't now what 10 here means 
      this.odooJsonRPC.searchRead(
        modelName,
        [['public', '=', 'private'], "|", ['channel_type', '=', "chat"], ['channel_type', '=', "channel"]],
        null,
        100,
        0,
        null
      )
    )
      .pipe(
        map((data: any) => {

          if (!!!data.body.result) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          // then success now send for push notification
          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }

  channelSeen(channel_id) {
    const modelName = 'mail.channel';

    return from(
      // todo I don't now what 10 here means 
      this.odooJsonRPC.call(modelName, 'channel_seen', [[channel_id]])
    )
      .pipe(
        map((data: any) => {
          if (!!!data.body.result && data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          // then success now send for push notification
          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }
  messageFetch(domain, limit) {
    const modelName = 'mail.message';

    return from(
      // todo I don't now what 10 here means 
      this.odooJsonRPC.call(modelName, 'message_fetch', domain,
        { limit: limit }

      )
    )
      .pipe(
        map((data: any) => {
          if (!!!data.body.result) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          // then success now send for push notification
          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }

  sendMessage(chat: OdooChatMessage, channelId) {
    const modelName = 'mail.channel';
    let updatedChat = Object.assign({}, chat)
    // updatedChat so we send what odoo understand
    let kwargs = chat


    // let kwargs1 = {
    //   attachment_ids: [],
    //   body: "test",
    //   content_subtype: "html",
    //   message_type: "comment",
    //   partner_ids: [],
    //   subtype: "mail.mt_comment"
    // }

    return from(
      this.odooJsonRPC.call(modelName, 'message_post', [channelId], kwargs
      )
    )
      .pipe(
        map((data: any) => {


          if (!!!data.body.result) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          // then success now send for push notification
          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );


  }
  // sendMessage(chat: IChat) {
  //   const modelName = 'kc_academy.chat';
  //   let updatedChat = Object.assign({}, chat)
  //   // updatedChat so we send what odoo understand
  //   if (chat.to_class_ids !== undefined) {

  //     updatedChat.to_class_ids = [[6, 0, chat.to_class_ids]]
  //   }
  //   else {

  //     updatedChat.to_user_ids = [[6, 0, chat.to_user_ids]]
  //   }


  //   return from(
  //     this.odooJsonRPC.call(modelName, 'create', [
  //       updatedChat
  //     ])
  //   )
  //     .pipe(
  //       map((data: any) => {

  //         if (!!!data.body.result) {
  //           const error = {
  //             message: 'Error adding record',
  //             model: modelName,
  //             odoo: data
  //           };
  //           throw new Error(JSON.stringify(error));
  //         }

  //         // then success now send for push notification
  //         return data.body.result;
  //       })
  //     )
  //     .pipe(
  //       catchError((error: any) => {
  //         return throwError(error);
  //       })
  //     );

  // }

  getAttachment(attachId) {
    const fields = [
      'id',
      'mimetype',
      'name',
      'db_datas',
      'local_url',
      'website_url',
    ]


    const modelName = 'ir.attachment';
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        [['id', '=', attachId]],
        fields,
        1,
        0,
        null
      )
    )

      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result.records;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );

  }
  getChatAttachment(record_id) {
    const fields = [
      'id',
      'attach',
      'attach_name',
    ]


    const modelName = 'kc_academy.chat';
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        [['id', '=', record_id]],
        fields,
        1,
        0,
        null
      )
    )

      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );

  }

  addOrder(order) {
    const modelName = 'rb_delivery.order';

    return from(
      this.odooJsonRPC.call(modelName, 'create', [
        order
        // {
        //   order_type_id: 1,
        //   customer_name: 'Test',
        //   customer_mobile: '059881321',
        //   customer_address: 'Ramallah blah blah',
        //   cost: 34.5,
        //   note: 'Test'

        //   // id: order.id,
        //   // data: order
        // }
      ])
    )
      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (!!!data.body.result) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result.id;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  uploadAttach() {

  }

  getDeliveryPrice(customerId, fromArea, toArea) {
    const modelName = 'rb_delivery.pricelist';
    return from(
      this.odooJsonRPC.call(modelName, 'get_price', [
        {
          customer_id: customerId,
          from_area: fromArea,
          to_area: toArea
        }
      ])
    )
      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  pollMessagesFromAll(im_user_ids) {
    return from(
      this.odooJsonRPC.callPoll(['mail_channel'], this.last, {
        bus_inactivity: 5243568,
        // should be im_user
        bus_presence_partner_ids: im_user_ids,
      })
    ).pipe(
      take(1),
      map(
        (data: any) => {
          console.log(data)
          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: 'orderPolling',
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }


          if (data.body && data.body.result && data.body.result[0]) {
            if (data.body.result[0].id > 0) {
              // let mail_channels = data.body.result.filter(rec => rec.channel.includes('mail.channel'))
              let mail_channels = data.body.result.filter(rec => rec.id > 0)
              if (mail_channels.length > 0)
                this.last = mail_channels[mail_channels.length - 1].id
              // this.last = data.body.result[0].id;
            }
          }
          return data.body.result;
        },
        err => { }
      )
    );
  }
  pollMessages(im_user_id) {
    return from(
      this.odooJsonRPC.callPoll(['mail_channel'], this.last, {
        bus_inactivity: 5243568,
        // should be im_user
        bus_presence_partner_ids: [im_user_id],
      })
    ).pipe(
      take(1),
      map(
        (data: any) => {
          console.log(data)
          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: 'orderPolling',
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }


          if (data.body && data.body.result && data.body.result[0]) {
            if (data.body.result[0].id > 0) {

              this.last = data.body.result[0].id;
            }
          }
          return data.body.result;
        },
        err => { }
      )
    );
  }

  loadAreaPublic() {
    return this.httpClient.get(
      'http://www.kitchen-club.com:8076/rb_delivery/area'
    );
  }

  loadHomework() {

    const fields =
      [
        'id',
        'title',
        'date',
        'desc',
        'is_image',
        'is_video',
        'is_gallery',
        'class_id',
        'attached_from_teacher',
        'notes'
      ]


    const modelName = 'kc_academy.homework';
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        [],
        fields,
        100,
        0,
        null
      )
    )

      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }
  // get homework item ID to update it later on
  getHomeworkItemId(student_id) {
    const fields = [
      'id',
    ]


    const modelName = 'kc_academy.homework_item';
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        [['student_id', '=', student_id]],
        fields,
        1,
        0,
        null
      )
    )

      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result.records[0];
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );




  }
  uploadHWAttach(imageData, homework_item_id) {
    const modelName = 'kc_academy.homework_item';
    return from(
      this.odooJsonRPC.updateRecord(modelName, homework_item_id, { attachment: imageData })
    )
      .pipe(
        map(data => {
          if (data.body.error) {
            const error = {
              message: 'Error adding record',

              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );


  }

  loadNews() {

    const fields = [
      'id',
      'content',
      'title',
      'type'
    ]


    const modelName = 'kc_academy.news';
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        [],
        fields,
        10,
        0,
        null
      )
    )

      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }
  loadExams() {

    const fields = [
      'id',
      'name',
      'exam_type_id',
      'exam_mark',
      'real_exam_mark',
      'percentage',
      'class_id'
    ]


    const modelName = 'kc_academy.exam';
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        [],
        fields,
        1000,
        0,
        null
      )
    )

      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }


  getExamsMarks(exam_ids, student_id) {

    const fields = [
      'id',
      'mark',
      'real_mark',
      'exam_id'
    ]

    let domain = [['exam_id', 'in', exam_ids], ['student_id', '=', student_id]]

    const modelName = 'kc_academy.mark';
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        domain,
        fields,
        null,
        0,
        null
      )
    )

      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }
  getExamMark(exam_id, student_id) {

    const fields = [
      'id',
      'mark',
      'real_mark',
    ]

    let domain = [['exam_id', '=', exam_id], ['student_id', '=', student_id]]
    let limit = 1

    const modelName = 'kc_academy.mark';
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        domain,
        fields,
        limit,
        0,
        null
      )
    )

      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }


  loadExamType() {

    const fields = [
      'id',
      'name',
      'parent_type'
    ]


    const modelName = 'kc_academy.exam_type';
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        [],
        fields,
        1000,
        0,
        null
      )
    )

      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }


  loadCourse() {

    const fields = [
      'id',
      'name',
      'class_ids',
    ]


    let domain = []
    const modelName = 'kc_academy.course';
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        domain,
        fields,
        1000,
        0,
        null
      )
    )

      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }

  loadClass() {

    const fields = [
      'id',
      'name',

      'student_ids',


      'course_ids',
      'exam_ids',
    ]


    const modelName = 'kc_academy.academy_class';
    return from(
      this.odooJsonRPC.searchRead(
        modelName,
        [],
        fields,
        1000,
        0,
        null
      )
    )

      .pipe(
        map((data: any) => {
          // result here should be the server id

          if (data.body.error) {
            const error = {
              message: 'Error adding record',
              model: modelName,
              odoo: data
            };
            throw new Error(JSON.stringify(error));
          }

          return data.body.result;
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );



  }



  // getAll(): Observable<any[]> {
  //   return;
  // }

  // getAllMetaData(metaDomain, modelName): Observable<any> {
  //   const me = this;
  //   const model: string = modelName;
  //   const fields = ['id', 'client_id', 'write_date', 'sync_ids'];
  //   let domain = metaDomain;
  //   if (!!!metaDomain) {
  //     domain = [];
  //   }
  //   // let domain = [["sync_ids.user_id.id", "=", 2]];
  //   // , ["partner_id", "!=", false]];
  //   const offset = 0;

  //   const limit = 0;

  //   const sort = '';

  //   const sub = Observable.create(observer => {
  //     this.odooJsonRPC
  //       .call(model, 'search_read_sync', [
  //         {
  //           fields: ['id', 'write_date', 'client_id', 'sync_ids'],
  //           domain
  //         }
  //       ])
  //       .then(
  //         (res: any) => {
  //           try {
  //             res.body.result = JSON.stringify(res.body.result);
  //             const body = res.body;

  //             if (!!!body.result) {
  //               // add model name to the error body
  //               // to be shown in the error message
  //               body.error.modelName = modelName;
  //               throw new Error(JSON.stringify(body.error, null, 2));
  //               // observer.error("error get all meta data for " + modelName);
  //             }

  //             const result = body.result;
  //             if (result) {
  //               // observer.next(result.records);
  //               observer.next(result);
  //               observer.complete();
  //             }
  //           } catch (err) {
  //             const errMessage: IErrorMessage = {
  //               title: 'Getting Meta Data Error',
  //               message: 'Error getting Meta Data, contact your administrator',
  //               code: 0,
  //               detail: [
  //                 {
  //                   message: JSON.stringify(err.message, null, 2),
  //                   code: 0
  //                 }
  //               ]
  //             };
  //             this.progress_store.dispatch(
  //               new fromProgressIndicatorStore.UpdateStatus({
  //                 status: 1
  //               })
  //             );
  //             this.progress_store.dispatch(
  //               new fromProgressIndicatorStore.UpdateProgress({
  //                 progress: 0
  //               })
  //             );
  //             this.progress_store.dispatch(
  //               new fromProgressIndicatorStore.UpdateStatusText({
  //                 status_text: ''
  //               })
  //             );

  //             // this.alertService.errDetailAlert(
  //             //   "Adding to database error",
  //             //   errMessage,
  //             //   "ok"
  //             // );
  //           }
  //         },

  //         function(error) {
  //           me.errorMessageStore
  //             .select(fromErrorMessageStore.selectModalOpened)
  //             .take(1)
  //             .subscribe(modalOpened => {
  //               const errMessage: IErrorMessage = {
  //                 title: 'Getting Meta Data Error ',
  //                 message:
  //                   'Error Getting all meta data , contact your administrator',
  //                 code: 0,
  //                 detail: [
  //                   {
  //                     message: JSON.stringify(error),
  //                     code: 0
  //                   }
  //                 ]
  //               };
  //               if (!modalOpened) {
  //                 me.alertService.errDetailAlert(
  //                   'Error Getting all meta data, contact your technical administrator',
  //                   errMessage,
  //                   'ok'
  //                 );
  //               }
  //               me.errorMessageStore.dispatch(
  //                 new fromErrorMessageStore.UpdateAll(errMessage)
  //               );
  //               me.progress_store.dispatch(
  //                 new fromProgressIndicatorStore.UpdateStatus({
  //                   status: 1
  //                 })
  //               );
  //               me.progress_store.dispatch(
  //                 new fromProgressIndicatorStore.UpdateProgress({
  //                   progress: 0
  //                 })
  //               );
  //               me.progress_store.dispatch(
  //                 new fromProgressIndicatorStore.UpdateStatusText({
  //                   status_text: ''
  //                 })
  //               );
  //             });

  //           observer.error(error);
  //         }
  //       );
  //   });

  //   return sub;
  // }

  // async addRecord(
  //   record: any,
  //   remoteFields,
  //   relationalFields,
  //   binaryFields,
  //   many2manyFields,
  //   modelName
  // ): Promise<Observable<number>> {
  //   for (const property in record) {
  //     // remove not needed records
  //     if (
  //       !(remoteFields.onCreate().filter(prop => prop === property).length > 0)
  //     ) {
  //       delete record[property];
  //     }

  //     if (relationalFields[property]) {
  //       // so this is a relational field then
  //       // get only the id (server_id) ( not intereseted in name )

  //       // then we need to get the client_id (id) of that property

  //       record[property] = await relationalFields[property].getServerID(
  //         record[property]
  //       );
  //     } else if (
  //       binaryFields &&
  //       binaryFields[property] &&
  //       record[property] &&
  //       record[property] !== '' &&
  //       record[property] !== null &&
  //       record[property] !== 'false'
  //     ) {
  //       if (!this.platform.is('cordova')) {
  //         // no need to store even the data
  //         // TODO store the data and find way to show it
  //         // using src in img tag

  //         record[property] = 'false';
  //       } else if (record[property] !== false) {
  //         // always _name should be added to the name of field that hold the
  //         // attachment ( binary field ) e.g in communication
  //         // the field name is attach so it must has a attach_name field also
  //         // let filename = record[property].replace(/^.*[\\\/]/, '')
  //         const fullPath = record[property];
  //         const filename = this.fileOperations.getFileNameFromFullPath(
  //           fullPath
  //         );
  //         const filepath =
  //           this.fileOperations.getDataDirectory() +
  //           this.fileOperations.getFilePathFromFullPath(fullPath);

  //         await this.fileOperations.readAsDataURL(filepath, filename).then(
  //           function(dataUrl) {
  //             // This is so the data has in front of it the type of image png/jpg ..
  //             record[property] = dataUrl.split(',')[1];
  //           },
  //           err => {
  //             alert(
  //               'error reading file ' +
  //                 JSON.stringify(err) +
  //                 record[property] +
  //                 record[property + '_name']
  //             );
  //           }
  //         );
  //         // get the path
  //         // convert to binary
  //       }
  //     } else if (
  //       // if it is many2many fields
  //       // and there is value in it
  //       many2manyFields &&
  //       many2manyFields[property] &&
  //       record[property] !== null &&
  //       record[property] !== undefined
  //     ) {
  //       // for many 2 many fields e.g adding invoices in the payment
  //       // get the server id
  //       record[property] = await many2manyFields[property].getServerID(
  //         record[property]
  //       );
  //       record[property] = [[6, 0, [record[property]]]];
  //     }

  //     // and then upload that binary data
  //   }

  //   // convert write date to compatible with odoo
  //   // should be removed or use the utility
  //   if (record.write_date) {
  //     record.write_date = record.write_date.replace(/\//g, '-');
  //   }
  //   return Observable.fromPromise(
  //     this.odooJsonRPC.call(modelName, 'create_record_sync', [
  //       {
  //         id: record.id,
  //         data: record
  //       }
  //     ])
  //   )
  //     .map((data: any) => {
  //       // result here should be the server id

  //       if (!!!data.body.result) {
  //         const error = {
  //           message: 'Error adding record',
  //           model: modelName,
  //           odoo: data
  //         };
  //         throw new Error(JSON.stringify(error));
  //       }

  //       return data.body.result.id;
  //     })
  //     .pipe(
  //       catchError((error: any) => {
  //         return throwError(error);
  //       })
  //     );
  // }

  // deleteRecord(payload: number, modelName) {
  //   return Observable.fromPromise(
  //     this.odooJsonRPC.deleteRecord(modelName, payload)
  //   ).pipe(catchError((error: any) => throwError(error.json())));
  // }

  // async updateRecord(
  //   server_id: number,
  //   record: any,
  //   remoteFields: any,
  //   relationalFields,
  //   binaryFields,
  //   modelName
  // ) {
  //   const me = this;
  //   // record.write_date = record.write_date
  //   //   .replace("T", " ")
  //   //   .replace("Z", " ")
  //   //   .replace(".", "");
  //   record.write_date = this.utility.datetimeToOdooISO(record.write_date);
  //   for (const property in record) {
  //     //   TODO only on Update should pass
  //     if (
  //       !(
  //         remoteFields.onUpdate().filter(prop => prop === property).length > 0
  //       ) &&
  //       property !== 'id'
  //     ) {
  //       delete record[property];
  //     }

  //     if (relationalFields[property]) {
  //       // so this is a relational field then
  //       // get only the id (server_id) ( not intereseted in name )
  //       // then we need to get the client_id (id) of that property

  //       record[property] = await relationalFields[property].getServerID(
  //         record[property]
  //       );
  //     } else if (
  //       binaryFields &&
  //       binaryFields[property] &&
  //       record[property] &&
  //       record[property] !== '' &&
  //       record[property] !== null &&
  //       record[property] !== 'false'
  //     ) {
  //       if (!this.platform.is('cordova')) {
  //         // no need to store even the data
  //         // TODO store the data and find way to show it
  //         // using src in img tag

  //         record[property] = 'false';
  //       } else if (record[property] !== false) {
  //         // always _name should be added to the name of field that hold the
  //         // attachment ( binary field ) e.g in communication
  //         // the field name is attach so it must has a attach_name field also
  //         // let filename = record[property].replace(/^.*[\\\/]/, '')
  //         const fullPath = record[property];
  //         const filename = this.fileOperations.getFileNameFromFullPath(
  //           fullPath
  //         );
  //         // var filepath = this.fileOperations.getFilePathFromFullPath(fullPath);
  //         const filepath =
  //           this.fileOperations.getDataDirectory() +
  //           this.fileOperations.getFilePathFromFullPath(fullPath);

  //         await this.fileOperations.readAsDataURL(filepath, filename).then(
  //           function(dataUrl) {
  //             // This is so the data has in front of it the type of image png/jpg ..
  //             record[property] = dataUrl.split(',')[1];
  //           },
  //           err => {
  //             alert(
  //               'error reading file ' +
  //                 JSON.stringify(err) +
  //                 record[property] +
  //                 record[property + '_name']
  //             );
  //           }
  //         );
  //         // get the path
  //         // convert to binary
  //       }
  //     }
  //   }
  //   record.sync_ids = {
  //     client_id: record.client_id,
  //     server_write_date: record.write_date,
  //     client_write_date: record.write_date
  //   };

  //   return Observable.fromPromise(
  //     me.odooJsonRPC.call(modelName, 'update_record_sync', [
  //       {
  //         id: record.id,
  //         data: record
  //       }
  //     ])
  //   ).pipe(
  //     map((data: any) => {
  //       // result here should be the server id

  //       // response is as below
  //       // just return the server id since it is not in the response
  //       // check if response not an error
  //       if (!!!data.body.result) {
  //         // throw new Error(data.error);
  //         throw data.error;
  //       }
  //       return server_id;
  //     }),

  //     catchError((error: any) => throwError(JSON.stringify(error)))
  //   );
  // }

  // async updateRecord_old(
  //   server_id: number,
  //   record: any,
  //   relationalFields,
  //   modelName
  // ) {
  //   record.write_date = record.write_date
  //     .replace('T', ' ')
  //     .replace('Z', ' ')
  //     .replace('.', '');
  //   for (const property in record) {
  //     if (relationalFields[property]) {
  //       // so this is a relational field then
  //       // get only the id (server_id) ( not intereseted in name )
  //       // then we need to get the client_id (id) of that property

  //       record[property] = await relationalFields[property].getServerID(
  //         record[property]
  //       );
  //     }
  //   }

  //   return Observable.fromPromise(
  //     this.odooJsonRPC.updateRecord(modelName, server_id, record)
  //   ).pipe(
  //     map((data: any) => {
  //       // result here should be the server id

  //       // response is as below
  //       // just return the server id since it is not in the response
  //       // check if response not an error
  //       if (!!!data.body.result) {
  //         throw new Error(
  //           'Error updating +' + modelName + JSON.stringify(data.error)
  //         );
  //       }
  //       return server_id;
  //     }),

  //     catchError((error: any) => throwError(JSON.stringify(error)))
  //   );
  // }
  // updateRecordClientIds(
  //   ids: any[],
  //   client_ids: any[],
  //   write_dates: any[],
  //   modelName
  // ) {
  //   const me = this;

  //   const allRec = [];
  //   for (let i = 0; i < ids.length; i++) {
  //     const id = ids[i];
  //     const client_id = client_ids[i];
  //     const write_date = write_dates[i];
  //     allRec.push({
  //       // id: id,
  //       data: {
  //         id,
  //         sync_ids: {
  //           client_id,
  //           server_write_date: write_date,
  //           client_write_date: write_date
  //         }
  //       }
  //     });
  //   }

  //   return Observable.fromPromise(
  //     new Promise(function(resolve, reject) {
  //       me.odooJsonRPC
  //         .call(modelName, 'update_records_sync', [allRec])

  //         .then(
  //           function(data) {
  //             me.odooJsonRPC
  //               .read(modelName, [ids[0]], ['write_date'])
  //               .then(function(data) {
  //                 resolve(data.body.result);
  //               });
  //             // resolve(data)
  //           },
  //           function(err) {
  //             reject(err);
  //           }
  //         );
  //     })

  //     // get the write date after the update
  //   ).pipe(
  //     map((data: any) => {
  //       if (!!!data) {
  //         throw new Error(
  //           'Error update record client id +' +
  //             modelName +
  //             JSON.stringify(data.error)
  //         );
  //       }
  //     }),

  //     catchError((error: any) => throwError(JSON.stringify(error)))
  //   );

  //   // .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
  // }

  // updateRecordClientId(
  //   id: number,
  //   client_id: number,
  //   write_date: string,
  //   modelName
  // ) {
  //   const me = this;

  //   return Observable.fromPromise(
  //     new Promise(function(resolve, reject) {
  //       me.odooJsonRPC
  //         .call(modelName, 'update_record_sync', [
  //           {
  //             id,
  //             data: {
  //               id,
  //               sync_ids: {
  //                 client_id,
  //                 server_write_date: write_date,
  //                 client_write_date: write_date
  //               }
  //             }
  //           }
  //         ])

  //         .then(
  //           function(data) {
  //             me.odooJsonRPC
  //               .read(modelName, [id], ['write_date'])
  //               .then(function(data) {
  //                 resolve(data.body.result);
  //               });
  //             // resolve(data)
  //           },
  //           function(err) {
  //             reject(err);
  //           }
  //         );
  //     })

  //     // get the write date after the update
  //   ).pipe(
  //     map((data: any) => {
  //       if (!!!data) {
  //         throw new Error(
  //           'Error update record client id +' +
  //             modelName +
  //             JSON.stringify(data.error)
  //         );
  //       }
  //     }),

  //     catchError((error: any) => throwError(JSON.stringify(error)))
  //   );

  //   // .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
  // }
  // updateRecordClientId_old(id: number, client_id: number, modelName) {
  //   const me = this;
  //   return Observable.fromPromise(
  //     new Promise(function(resolve, reject) {
  //       me.odooJsonRPC
  //         .updateRecord(modelName, id, {
  //           client_id,
  //           desc: 'test testse 2',
  //           sync_ids: { client_id }
  //           // {id:1, "client_id": client_id }
  //         })

  //         .then(function(data) {
  //           me.odooJsonRPC
  //             .read(modelName, [id], ['write_date'])
  //             .then(function(data) {
  //               resolve(data.body.result);
  //             });
  //         });
  //     })
  //     // get the write date after the update
  //   );
  //   // .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
  // }

  // getRecordsById(
  //   ids: number[],
  //   isUpdate,
  //   fields: string[],
  //   relationalFields?: any,
  //   binaryFields?: any,
  //   many2manyFields?: any,
  //   modelName?: any
  // ): Observable<any> {
  //   const sub = Observable.create(observer => {
  //     let method = 'search_read_sync';
  //     if (isUpdate) {
  //       method = 'search_read_sync';
  //     }
  //     this.odooJsonRPC
  //       .call(modelName, method, [
  //         {
  //           domain: [['id', 'in', ids]],
  //           fields
  //         }
  //       ])

  //       .then(
  //         async (res: any) => {
  //           const body = res.body;

  //           if (!!!body.result) {
  //             throw new Error(
  //               'Error getting ' + modelName + '' + JSON.stringify(body.error)
  //             );
  //           }
  //           const records = body.result;

  //           let resultCreateDir = null;
  //           if (this.platform.is('cordova')) {
  //             resultCreateDir = await this.fileOperations.createDataDir(
  //               modelName.replace(/\./g, '_').replace(/\-/g, '_')
  //             );
  //           }
  //           for (let i = 0; i < records.length; i++) {
  //             const record = records[i];
  //             if (record.sync_ids) {
  //               record.client_id = record.sync_ids.client_id;
  //               record.write_date = this.utility.datetimeFromOdooToMobile(
  //                 record.sync_ids.server_write_date
  //               );
  //               delete record.sync_ids;
  //             }

  //             // convert write_date from odoo to mobile

  //             // then remove the sync_ids
  //             // filter relational field by getting only the first in the array
  //             for (let property in record) {
  //               if (relationalFields && relationalFields[property]) {
  //                 // so this is a relational field then
  //                 // get only the id (server_id) ( not intereseted in name )
  //                 // then we need to get the client_id (id) of that property
  //                 record[property] = await relationalFields[
  //                   property
  //                 ].getClientID(record[property][0]);
  //               } else if (
  //                 binaryFields &&
  //                 binaryFields[property] &&
  //                 record[property] &&
  //                 record[property] !== '' &&
  //                 record[property] !== null &&
  //                 record[property] !== 'false'
  //               ) {
  //                 if (!this.platform.is('cordova')) {
  //                   // no need to store even the data
  //                   // TODO store the data and find way to show it
  //                   // using src in img tag

  //                   record[property] = 'false';
  //                 } else if (record[property] !== false) {
  //                   // add to array where is the record
  //                   // that contains the images
  //                   // console.log("starting adding direcotry for images");
  //                   // const resultCreateDir = await this.fileOperations.createDataDir(
  //                   //   modelName.replace(/\./g, "_").replace(/\-/g, "_")
  //                   // );
  //                   if (resultCreateDir) {
  //                     // if directory is created
  //                     // now I need to write to file
  //                     // file name if it exist e.g file_name
  //                     // then use that name in combination with datetime

  //                     this.syncStore.dispatch(
  //                       new fromSyncStore.UpdateLoadingUploading({
  //                         total: records.length.toString(),
  //                         current: i.toString(),
  //                         opType: 'Save Image'
  //                       })
  //                     );

  //                     let file_type = 'jpg';
  //                     if (
  //                       binaryFields[property] &&
  //                       binaryFields[property].type
  //                     ) {
  //                       file_type = binaryFields[property].type;
  //                     }
  //                     if (
  //                       record[property + '_name'] &&
  //                       record[property + '_name'] !== false
  //                     ) {
  //                       file_type = record[property + '_name'].split('.')[1];
  //                     }
  //                     const createdDateTime = new Date()
  //                       .toISOString()
  //                       .split('.')[0]
  //                       .replace(/\-/g, '_')
  //                       .replace(/\:/g, '_');

  //                     let file_name =
  //                       binaryFields[property].prefix_path +
  //                       record.id +
  //                       createdDateTime +
  //                       '.' +
  //                       file_type;
  //                     if (
  //                       record[property + '_name'] &&
  //                       record[property + '_name'] !== false
  //                     ) {
  //                       file_name =
  //                         createdDateTime + record[property + '_name'];
  //                     }

  //                     let resultCreateFile = false;
  //                     try {
  //                       resultCreateFile = await this.fileOperations.writeToFile(
  //                         file_name,
  //                         resultCreateDir.name,
  //                         this.fileOperations.b64toBlob(
  //                           record[property],
  //                           file_type
  //                           // binaryFields[property].type
  //                         )
  //                       );
  //                     } catch (error) {
  //                       alert('error is ' + JSON.stringify(error));
  //                     }

  //                     if (resultCreateFile) {
  //                       // file create successfully
  //                       // then stroe path of that file into the field
  //                       record[property] =
  //                         // this.fileOperations.file.dataDirectory +
  //                         resultCreateDir.name + '/' + file_name;

  //                       // record[property + "_name"] = file_name;
  //                       console.log('end adding images');
  //                     }
  //                   }
  //                 } else if (record[property] === false) {
  //                   // for now just keep it as it is
  //                 }
  //                 // then this is binary field we need to remove it from
  //                 // cash
  //                 // convert it to real file
  //                 // and store the path location in the field instead
  //               } else if (
  //                 many2manyFields &&
  //                 many2manyFields[property]
  //                 // many2manyFields[property].length > 0 &&
  //                 // many2manyFields[property][0] > 0
  //               ) {
  //                 // so just take the first proprty
  //                 // TODO here we asume that we have one field ( as many2one not many2many)
  //                 // UPDATE TODO so we will remove the [] and convert to string with , seperated in
  //                 // case of mulituple value

  //                 if (record[property].length > 1) {
  //                   let propArrayCommaSeparated = '';
  //                   for (let i = 0; i < record[property].length - 1; i++) {
  //                     propArrayCommaSeparated += record[property][i];
  //                     propArrayCommaSeparated += ',';
  //                   }
  //                   // last one dose not have , before "
  //                   propArrayCommaSeparated +=
  //                     record[property][record[property].length - 1];

  //                   record[(property = propArrayCommaSeparated)];
  //                 } else if (record[property].length === 1) {
  //                   record[property] = record[property][0] + '';
  //                 }
  //               } else if (record[property] === false) {
  //                 // then there is no value
  //                 record[property] = null;
  //               }
  //             }

  //             // since we should return only one ( one ID )
  //           }
  //           // send records to create images if they contains images
  //           observer.next(records);
  //           observer.complete();
  //         },

  //         function(error) {
  //           observer.error(error);
  //         }
  //       );
  //   });

  //   return sub;
  // }

  // getRecordById(
  //   id: number,
  //   fields: string[],
  //   relationalFields?: any,
  //   binaryFields?: any,
  //   many2manyFields?: any,
  //   modelName?: any
  // ): Observable<any> {
  //   const sub = Observable.create(observer => {
  //     // new sync
  //     // this.odooJsonRPC.read(modelName, [id], fields).then(
  //     this.odooJsonRPC
  //       .call(modelName, 'search_read_sync', [
  //         [
  //           {
  //             domain: [['id', '=', id]],
  //             fields
  //           }
  //         ]
  //       ])

  //       .then(
  //         async (res: any) => {
  //           const body = res.body;

  //           if (!!!body.result) {
  //             throw new Error(
  //               'Error getting ' + modelName + '' + JSON.stringify(body.error)
  //             );
  //           }
  //           const record = body.result[0];

  //           if (record.sync_ids) {
  //             record.client_id = record.sync_ids.client_id;
  //             record.write_date = this.utility.datetimeFromOdooToMobile(
  //               record.sync_ids.server_write_date
  //             );
  //             delete record.sync_ids;
  //           }

  //           // convert write_date from odoo to mobile

  //           // then remove the sync_ids
  //           // filter relational field by getting only the first in the array
  //           for (const property in record) {
  //             if (relationalFields && relationalFields[property]) {
  //               // so this is a relational field then
  //               // get only the id (server_id) ( not intereseted in name )
  //               // then we need to get the client_id (id) of that property
  //               record[property] = await relationalFields[property].getClientID(
  //                 record[property][0]
  //               );
  //             } else if (
  //               binaryFields &&
  //               binaryFields[property] &&
  //               record[property] &&
  //               record[property] !== '' &&
  //               record[property] !== null &&
  //               record[property] !== 'false'
  //             ) {
  //               if (!this.platform.is('cordova')) {
  //                 // no need to store even the data
  //                 // TODO store the data and find way to show it
  //                 // using src in img tag

  //                 record[property] = 'false';
  //               } else if (record[property] !== false) {
  //                 const resultCreateDir = await this.fileOperations.createDataDir(
  //                   modelName.replace(/\./g, '_').replace(/\-/g, '_')
  //                 );
  //                 if (resultCreateDir) {
  //                   // if directory is created
  //                   // now I need to write to file
  //                   // file name if it exist e.g file_name
  //                   // then use that name in combination with datetime

  //                   let file_type = 'jpg';
  //                   if (binaryFields[property] && binaryFields[property].type) {
  //                     file_type = binaryFields[property].type;
  //                   }
  //                   if (
  //                     record[property + '_name'] &&
  //                     record[property + '_name'] !== false
  //                   ) {
  //                     file_type = record[property + '_name'].split('.')[1];
  //                   }
  //                   const createdDateTime = new Date()
  //                     .toISOString()
  //                     .split('.')[0]
  //                     .replace(/\-/g, '_')
  //                     .replace(/\:/g, '_');

  //                   let file_name =
  //                     binaryFields[property].prefix_path +
  //                     record.id +
  //                     createdDateTime +
  //                     '.' +
  //                     file_type;
  //                   if (
  //                     record[property + '_name'] &&
  //                     record[property + '_name'] !== false
  //                   ) {
  //                     file_name = createdDateTime + record[property + '_name'];
  //                   }

  //                   let resultCreateFile = false;
  //                   try {
  //                     resultCreateFile = await this.fileOperations.writeToFile(
  //                       file_name,
  //                       resultCreateDir.name,
  //                       this.fileOperations.b64toBlob(
  //                         record[property],
  //                         binaryFields[property].type
  //                       )
  //                     );
  //                   } catch (error) {
  //                     alert('error is ' + JSON.stringify(error));
  //                   }
  //                   if (resultCreateFile) {
  //                     // file create successfully
  //                     // then stroe path of that file into the field
  //                     record[property] =
  //                       // this.fileOperations.file.dataDirectory +
  //                       resultCreateDir.name + '/' + file_name;
  //                   }
  //                 }
  //               } else if (record[property] === false) {
  //                 // for now just keep it as it is
  //               }
  //               // then this is binary field we need to remove it from
  //               // cash
  //               // convert it to real file
  //               // and store the path location in the field instead
  //             } else if (
  //               many2manyFields &&
  //               many2manyFields[property] &&
  //               many2manyFields[property].length > 0 &&
  //               many2manyFields[property][0] > 0
  //             ) {
  //               // so just take the first proprty
  //               // TODO here we asume that we have one field ( as many2one not many2many)
  //               record[property] = record[property][0];
  //             } else if (record[property] === false) {
  //               // then there is no value
  //               record[property] = null;
  //             }
  //           }

  //           // since we should return only one ( one ID )

  //           observer.next(record);
  //           observer.complete();
  //         },

  //         function(error) {
  //           observer.error(error);
  //         }
  //       );
  //   });

  //   return sub;
  // }

  // getRecordClientIDWriteDateById(
  //   id: number,
  //   modelName
  // ): Observable<{ client_id: number; write_date: string }> {
  //   const sub = Observable.create(observer => {
  //     this.odooJsonRPC.read(modelName, [id], ['write_date', 'client_id']).then(
  //       (res: any) => {
  //         const body = res.body;
  //         const result = body.result;
  //         // since we have one record
  //         // change id to server_id
  //         result[0].server_id = result[0].id;
  //         // TODO maybe need to change client_id to server_id

  //         result[0].write_date = this.utility.datetimeFromOdooToMobile(
  //           result[0].write_date
  //         );
  //         observer.next(result[0]);
  //         observer.complete();
  //       },

  //       function(error) {
  //         observer.error(error);
  //       }
  //     );
  //   });
  //   return sub;
  // }

  // // getRecordsByIds(ids: number[], modelName): Observable<any> {
  // //   let model: string = modelName;
  // //   let fields = ["name", "server_id", "write_date"];

  // //   // since we need only data with visit_id
  // //   let domain = [["id", "in", ids]];
  // //   let offset = 0;
  // //   let limit = 0;
  // //   let sort = "";

  // //   let sub = Observable.create(observer => {
  // //     this.odooJsonRPC
  // //       .searchRead(model, domain, fields, limit, offset, sort)
  // //       .then(
  // //         (res: any) => {
  // //           let body=res.body;
  // //           let result = body.result;
  // //           observer.next(result.records);
  // //           observer.complete();
  // //         },

  // //         function(error) {
  // //           observer.error(error);
  // //         }
  // //       );
  // //   });

  // //   return sub;
  // // }

  // // return observable with repid
  // getRepIDByUserId(uid: number): Observable<any> {
  //   const me = this;
  //   const model = 'mandoob.rep';
  //   const fields = ['id', 'name', 'server_id', 'write_date'];
  //   // since we need only data with visit_id
  //   const domain = [['refers_to', '=', uid]];
  //   const offset = 0;
  //   const limit = 0;
  //   const sort = '';

  //   const sub = Observable.create(observer => {
  //     this.odooJsonRPC
  //       .searchRead(model, domain, fields, limit, offset, sort)
  //       .then(
  //         (res: any) => {
  //           const body = res.body;
  //           if (!!body && !!body.result && !!body.result.records[0]) {
  //             this.store.dispatch(
  //               new settingActions.UpdateRepId(body.result.records[0].id)
  //             );
  //           } else {
  //             // show error message that you are not rep

  //             me.errorMessageStore
  //               .select(fromErrorMessageStore.selectModalOpened)
  //               .take(1)
  //               .subscribe(modalOpened => {
  //                 const errMessage: IErrorMessage = {
  //                   title: 'You are not a representative:',
  //                   message:
  //                     'You are not a representative, contact your administrator',
  //                   code: 0,
  //                   detail: [
  //                     {
  //                       message: 'You are not a representaitive',
  //                       code: 0
  //                     }
  //                   ]
  //                 };

  //                 if (!modalOpened) {
  //                   me.alertService.errDetailAlert(
  //                     'Error Getting all meta data, contact your technical administrator',
  //                     errMessage,
  //                     'ok'
  //                   );
  //                 }
  //                 me.errorMessageStore.dispatch(
  //                   new fromErrorMessageStore.UpdateAll(errMessage)
  //                 );
  //               });
  //           }

  //           // let result = body.result;
  //           // observer.next(result.records);
  //           observer.complete();
  //         },
  //         function(error) {
  //           observer.error(error);
  //         }
  //       );
  //   });

  //   return sub;
  // }

  // getCompanyInfo(): Observable<any> {
  //   const me = this;
  //   const model = 'res.company';
  //   const fields = ['name', 'phone', 'logo'];
  //   // since we need only data with visit_id
  //   // let domain = [["refers_to", "=", uid]];
  //   const domain = [];
  //   const offset = 0;
  //   const limit = 0;
  //   const sort = '';

  //   const sub = Observable.create(observer => {
  //     this.odooJsonRPC
  //       .searchRead(model, domain, fields, limit, offset, sort)
  //       .then(
  //         (res: any) => {
  //           const body = res.body;
  //           if (!!body && !!body.result && !!body.result.records[0]) {
  //             this.store.dispatch(
  //               new settingActions.UpdateCompanyInfo(body.result.records[0])
  //             );
  //           } else {
  //             // show error message that you are not rep

  //             me.errorMessageStore
  //               .select(fromErrorMessageStore.selectModalOpened)
  //               .take(1)
  //               .subscribe(modalOpened => {
  //                 const errMessage: IErrorMessage = {
  //                   title: 'You are not a representative:',
  //                   message:
  //                     'You are not a representative, contact your administrator',
  //                   code: 0,
  //                   detail: [
  //                     {
  //                       message: 'You are not a representaitive',
  //                       code: 0
  //                     }
  //                   ]
  //                 };

  //                 if (!modalOpened) {
  //                   me.alertService.errDetailAlert(
  //                     'Error Getting all meta data, contact your technical administrator',
  //                     errMessage,
  //                     'ok'
  //                   );
  //                 }
  //                 me.errorMessageStore.dispatch(
  //                   new fromErrorMessageStore.UpdateAll(errMessage)
  //                 );
  //               });
  //           }

  //           observer.complete();
  //         },
  //         function(error) {
  //           observer.error(error);
  //         }
  //       );
  //   });

  //   return sub;
  // }

  // update_one_signal(userId: string, pushToken: string, repId: number) {
  //   const me = this;
  //   return Observable.fromPromise(
  //     // this.odooJsonRPC.updateRecord(modelName, server_id, record)

  //     me.odooJsonRPC.call('mandoob.rep', 'update_one_signal', [
  //       {
  //         repId,
  //         playerId: userId,
  //         pushToken
  //       }
  //     ])
  //   ).pipe(
  //     map((data: any) => {
  //       // result here should be the server id

  //       // response is as below
  //       // just return the server id since it is not in the response
  //       // check if response not an error
  //       if (!!!data.body.result) {
  //         throw new Error(
  //           'Error updating +' + 'mandoob.rep' + JSON.stringify(data.error)
  //         );
  //       }
  //       return 'success update';
  //     }),

  //     catchError((error: any) => throwError(JSON.stringify(error)))
  //   );
  // }
}
