import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DBProvider } from './db';
import { take } from 'rxjs/operators';

const win: any = window;

@Injectable()
export class DBServiceORM {
  public _db;
  private _db_name = 'ecommerce';
  // array of objects
  public structure: any;
  public tableName: string;
  private table_name: string;
  constructor(public dbService: DBProvider) {
    this.dbService = dbService;
  }

  databaseReady(): Promise<any> {
    const me = this;
    // database will be ready if the
    // cordova is ready
    // consistancy check is good
    return new Promise((resolve, reject) => {
    
      me.dbService.initDB(this._db_name).then(

        db => {
          me.dbService.platform.ready().then(() => {
            if (me.dbService.platform.is('cordova')) {
              me._db = db;
              me.dbService._db = db;

              // create teh table ( the caller table)
              // before creae check the consistancy
              me.check_consistancy(me.getName(), me.structure).then(
                data => {
                  if (
                    data.col_to_add.length === 0 &&
                    data.col_to_remove.length === 0
                  ) {
                    // then create the table normally
                    me.create().then(
                      () => {
                        // db is ready
                        resolve();
                      },
                      err => { }
                    );
                  } else {
                    // there is column updated or should be deleted
                    let prom_adding_col;
                    let prom_remove_col;
                    if (data.col_to_add.length > 0) {
                      // add the new columns
                      prom_adding_col = me.addColumns(data.col_to_add);
                    }
                    if (data.col_to_remove.length > 0) {
                      prom_remove_col = me.removeColumns(data.col_to_remove);
                    }
                    Promise.all([prom_remove_col, prom_adding_col]).then(
                      all_done => {
                        resolve();
                      },
                      err => {
                        reject(err);
                        // some error
                      }
                    );
                  }
                },
                err => {
                  console.log(JSON.stringify(err));
                  console.log('error in check consistancy of tables');
                }
              );
            } else {
              me._db = db;

              me.dbService._db = db;

              me.create().then(
                data => {
                  // db is ready
                  resolve();
                },
                err => { }
              );
            }
          });
        },
        err => { }
      );
    });
  }

  // get the name of the caller class
  // e.g if doctor model implment this
  // then the getName return doctor

  getName() {
    return this.tableName;
  }

  addColumns(column_names) {
    const me = this;
    // we are here then the table exist
    // there is column or more to add
    // the column type should come from structure

    // gte the column from teh structyre
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:no-shadowed-variable
      const me = this;
      const colObj = {};
      // recursive add column
      let counter = 0;
      const add = (table_name, column_obj) => {
        me.dbService.addColumn(table_name, column_obj).then(
          data => {
            // success
            // go to the next if exist
            counter++;
            if (counter < column_names.length) {
              let col_obj;

              for (let i = 0; i < me.structure.length; i++) {
                if (me.structure[i].name === column_names[counter]) {
                  col_obj = me.structure[i];
                  break;
                }
              }
              add(table_name, col_obj);
            } else {
              resolve('Done adding all columns');
            }
          },

          err => {
            reject('error adding column');
          }
        );
      };

      for (let i = 0; i < this.structure.length; i++) {
        if (this.structure[i].name === column_names[counter]) {
          add(me.getName(), this.structure[i]);
        }
      }
    });
  }

  removeColumns(coulmn_names) {
    return this.dbService.removeColumn(
      this.getName(),
      coulmn_names,
      this.structure
    );
  }

  getTableStructure(table_name): Observable<any> {
    const structure: any = [];
    return from(
      this.dbService.getTableInfo(table_name).then(table_info => {
        if (table_info && table_info.res && table_info.res.rows.length > 0) {
          const table_rows = table_info.res.rows;
          for (let i = 0; i < table_rows.length; i++) {
            structure.push(table_rows.item(i));
          }
        }
        return structure;
      })
    );
  }

  DeleteDataFromTable(table_name): Observable<any> {
    return from(
      this.dbService.deleteDataFromTable(table_name).then(
        data => {
          return data;
        },
        error => {
          return error;
        }
      )
    );
  }
  check_consistancy(table_name, table_structure): Promise<any> {
    // before create :
    // 1- check if table already exist
    // 2- IF NOT then just create teh table and END PROCESS
    // 3- IF YES check if they are same column with this.structure.
    // 4- IF YES then do nothing
    // 5- IF NO then check if there is additional records
    // 6- IF YES then add the new records and if these records need migration then do it
    // 7- IF NO then check if there is column deleted
    // 8- IF YES then check for migration ( e.g column data need to go somewhere else ) and then delete

    return new Promise((resolve, reject) => {
      const me = this;
      const col_to_add = [];
      const col_to_remove = [];

      this.dbService.getTableInfo(table_name).then(
        table_info => {
          // if table does not exist the rows.length below is 0 so no need to do anything

          if (table_info && table_info.res && table_info.res.rows.length > 0) {
            // then there is rows
            const table_rows = table_info.res.rows;
            // compare to the structure

            // for removing unnecessary
            for (let i = 0; i < table_rows.length; i++) {
              let col_exist = 0;
              for (let j = 0; j < table_structure.length; j++) {
                if (table_rows.item(i).name === table_structure[j].name) {
                  col_exist = 1;
                  break;
                } else {
                }
              }
              if (col_exist === 0) {
                // then column does not exist
                // add it to additional column
                col_to_remove.push(table_rows.item(i).name);
              }
            }

            // fro adding new column
            for (let j = 0; j < table_structure.length; j++) {
              let col_exist = 0;
              for (let i = 0; i < table_rows.length; i++) {
                if (table_rows.item(i).name === table_structure[j].name) {
                  col_exist = 1;
                  break;
                }
              }
              if (col_exist === 0) {
                // then column does not exist
                // add it to additional column
                col_to_add.push(table_structure[j].name);
              }
            }
          }
          // return promise with two data col_to_add and col_to_remove as names
          const obj = { col_to_add, col_to_remove };
          resolve(obj);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  // create the table
  create(): Promise<any> {
    // get table schema (info)

    const prom = this.dbService
      .createTable(this.getName(), this.structure)
      .then(
        data => {
          return [];
        },
        err => {
          //  format err

          const errObj = {
            type: 'ERR_DB_CREATE_TABLE',
            message: 'code:' + err.err.code + '--' + err.err.message,
            level: 'ERROR'
          };
          return Promise.reject(errObj);
        }
      );

    return prom;
  }
  // drop the table
  drop(): Promise<any> {
    const prom = this.dbService.dropTable(this.getName()).then(
      data => {
        // if sucess return same object with the insert id

        return [];
      },

      err => {
        //  format err
        const errObj = {
          type: 'ERR_DB_DROP_TABLE',
          message: 'code:' + err.err.code + '--' + err.err.message,
          level: 'ERROR'
        };
        if (err.err.code === 5 || err.err.code === '5') {
          return Promise.resolve('table does not exist');
        } else {
          return Promise.reject(errObj);
        }
      }
    );

    return prom;
  }

  update(data: any): Promise<any> {
    const obj = data;

    const prom = this.dbService.update(data, this.getName()).then(
      () => {
        // if sucess return same object with the insert id
        return Object.assign({}, obj);
      },
      err => {
        //  format err
        const errObj = {
          type: 'ERR_DB_UPDATE_TABLE',
          message: 'code:' + err.err.code + '--' + err.err.message,
          level: 'ERROR'
        };
        return Promise.reject(errObj);
      }
    );

    return prom;
  }
updateByKey(data: any,column_key): Promise<any> {
    const obj = data;

    const prom = this.dbService.updateBy(data, this.getName(),column_key).then(
      () => {
        // if sucess return same object with the insert id
        return Object.assign({}, obj);
      },
      err => {
        //  format err
        const errObj = {
          type: 'ERR_DB_UPDATE_TABLE',
          message: 'code:' + err.err.code + '--' + err.err.message,
          level: 'ERROR'
        };
        return Promise.reject(errObj);
      }
    );

    return prom;
  }

  updateByCondition(data: any,condition): Promise<any> {
    const obj = data;

    const prom = this.dbService.updateByCondition(data, this.getName(),condition).then(
      () => {
        // if sucess return same object with the insert id
        return Object.assign({}, obj);
      },
      err => {
        //  format err
        const errObj = {
          type: 'ERR_DB_UPDATE_TABLE',
          message: 'code:' + err.err.code + '--' + err.err.message,
          level: 'ERROR'
        };
        return Promise.reject(errObj);
      }
    );

    return prom;
  }


  add(data: any): Promise<any> {
    let obj = Object.assign({},data);
    const primaryKey=this.structure.filter(rec=>rec.type.includes('PRIMARY'))[0].name;
    const prom = this.dbService.insert(data, this.getName(),primaryKey).then(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        // if sucess return same object with the insert id
        obj[primaryKey] = data.res.insertId;
        return Promise.resolve(obj);
      },
      err => {
        const errObj = {
          type: 'ERR_DB_INSERT_DATA',
          message: 'code:' + err.err.code + '--' + err.err.message,
          level: 'ERROR'
        };
        return Promise.reject(errObj);
      }
    );

    return prom;
  }

  // insert if not the condition is not met else update
  updateIfCondElseInsert(data: any,condition,updatedValue?): Promise<any> {
    let obj = Object.assign({},data);

    const primaryKey=this.structure.filter(rec=>rec.type.includes('PRIMARY'))[0].name;
      // check for record if exist then update , else insert
      return new Promise((resolve,reject)=>{
      this.getByCondition(condition).pipe(take(1)).subscribe(records=>{
        if(records && records.length>0)
        {
          // update
          this.updateByCondition(updatedValue,condition).then(updatedData=>{
            resolve(updatedData)
          },err=>{
            reject (err)
          })
        }
        else {
          // insert
          this.add(data).then(addedRecord=>{
            resolve(addedRecord)
          },err=>{
            reject(err)
          })

        }

      })

      })
    

  }
  upsert(data: any): Promise<any> {
    let obj = Object.assign({},data);
    const primaryKey=this.structure.filter(rec=>rec.type.includes('PRIMARY'))[0].name;
    const prom = this.dbService.upsert(data, this.getName(),primaryKey).then(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        // if sucess return same object with the insert id
        obj[primaryKey] = data.res.insertId;
        return Promise.resolve(obj);
      },
      err => {
        const errObj = {
          type: 'ERR_DB_INSERT_DATA',
          message: 'code:' + err.err.code + '--' + err.err.message,
          level: 'ERROR'
        };
        return Promise.reject(errObj);
      }
    );

    return prom;
  }
  addMultiplePort(data: any): Promise<any> {
    // since adding through sql port plugin require
    // cordova and in browser no cordova avaialbe
    if (this.dbService.platform.is('cordova')) {
      // if (1 !== 1) {
      const objArray = data;
      // for loop 1
      return new Promise((resolve, reject) => {
        this.dbService.selectLastInsertedID(this.getName()).then(
          lastInsertedID => {
            let lastID = 0;
            if (lastInsertedID.res.rows.item(0)) {
              lastID = lastInsertedID.res.rows.item(0).id;
            }
            for (let i = 0; i < data.length; i++) {
              data[i].id = ++lastID;
            }

            this.dbService.insertManyPort(objArray, this.getName()).then(
              (results: any) => {
                resolve(data.length);
              },
              err => {
                reject(err);
              }
            );
          },
          err => {
            reject(err);
          }
        );
      });
    } else {
      return this.addMultiple(data);
    }
  }

  // this take json as array of data and add them
  addMultiple(data: any): Promise<any> {
    //
    // data=
    // [{'id': 1, 'name': "Test", 'mobile_number': "059900557", 'type': 1, 'state': 1
    // },{'id': 2, 'name': "Test", 'mobile_number': "059900557", 'type': 1, 'state': 1}]
    //

    const objArray = data;
    const me = this;

    const promises = [];
    // for loop 1

    for (let i = 0; i < objArray.length; i++) {
      // IF statement 2
      const promise = me.add(objArray[i]);
      // .then( data => resolve(data));
      promises.push(promise);
    }

    let result = '';
    return new Promise((resolve, reject) => {
      if (!promises.length) {
        reject('Something went worng!');
      } else {
        Promise.all(promises).then(
          (results: any) => {
            result = result.concat(results);
            resolve(results.length);
          },
          err => {
            alert('err in ' + JSON.stringify(err));
          }
        );
      }
    });
  }
  // this take json as array of data and add them
  updateMultiple(data: any): Promise<any> {
    //
    //     data=
    // [{'id': 1, 'name': "Test", 'mobile_number': "059900557", 'type': 1, 'state': 1
    // },{'id': 2, 'name': "Test", 'mobile_number': "059900557", 'type': 1, 'state': 1}]
    //
    //
    const objArray = data;
    const me = this;

    const promises = [];
    // for loop 1
    for (let i = 0; i < objArray.length; i++) {
      // IF statement 2
      const promise = me.update(objArray[i]);
      // .then( data => resolve(data));
      promises.push(promise);
    }

    let result = '';
    return new Promise((resolve, reject) => {
      if (!promises.length) {
        reject('Something went worng!');
      } else {
        Promise.all(promises).then(
          (results: any) => {
            result = result.concat(results);
            resolve(results.length);
          },
          err => {
            alert('err in ' + JSON.stringify(err));
          }
        );
      }
    });
  }

  delete(data: any,key?): Promise<any> {
    const obj = data;
    const prom = this.dbService.delete(this.getName(), data,key).then(
      () => {
        // if sucess return same object with the deleted id
        return obj;
      },
      err => {
        const errObj = {
          type: 'ERR_DB_DELETE_RECORD',
          message: 'code:' + err.err.code + '--' + err.err.message,
          level: 'ERROR'
        };
        return Promise.reject(errObj);
      }
    );

    return prom;
  }

  deleteMany(data: any): Promise<any> {
    const prom = this.dbService.deleteMany(this.getName(), data).then(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        // if sucess return
        return data;
      },
      err => {
        const errObj = {
          type: 'ERR_DB_DELETE_ALL_RECORDS',
          message: 'code:' + err.err.code + '--' + err.err.message,
          level: 'ERROR'
        };
        return Promise.reject(errObj);
      }
    );

    return prom;
  }

  getAllTables(): Observable<any> {
    return from(
      this.dbService.GetAllTables().then(
        data => {
          let rows: any;

          if (data.res.rows._array) {
            rows = data.res.rows._array;
          } else {
            rows = data.res.rows;
          }

          if (data.res.rows && rows.length > 0) {
            const arr = [];

            // TODO you me need to check if platform.is('cordova') beside the
            // below sentence
            if (win.sqlitePlugin) {
              // this is cordova so mobile

              for (let i = 0; i < rows.length; i++) {
                if (rows.item(i) !== undefined && rows.item(i) != null) {
                  arr.push(rows.item(i));
                }
              }
            } else {
              for (let i = 0; i < rows.length; i++) {
                if (rows[i] !== undefined && rows[i] != null) {
                  arr.push(rows[i]);
                }
              }
            }

            return arr.map(row => {
              return row;
            });
          } else {
            return [];
          }
        },
        err => {
          const errObj = {
            type: 'ERR_DB_CREATE_TABLE',
            message: 'code:' + err.err.code + '--' + err.err.message,
            level: 'ERROR'
          };
          return Promise.reject(errObj);
        }
      )
    );
  }
  getAll(): Observable<any> {
    const me = this;

    return from(
      me
        .databaseReady()
        .then(
          () => {
            return this.dbService.selectAll(this.getName());
          },
          err => {
            // not ready yet
          }
        )
        .then(
          data => {
            let rows: any;

            if (data.res.rows._array) {
              rows = data.res.rows._array;
            } else {
              // for websql
              // TODO remove on production

              rows = data.res.rows;
            }

            if (data.res.rows && rows.length > 0) {
              const arr = [];

              // TODO you me need to check if platform.is('cordova') beside the
              // below sentence
              if (win.sqlitePlugin) {
                // this is cordova so mobile

                for (let i = 0; i < rows.length; i++) {
                  if (rows.item(i) !== undefined && rows.item(i) != null) {
                    arr.push(rows.item(i));
                  }
                }
              } else {
                for (let i = 0; i < rows.length; i++) {
                  if (rows[i] !== undefined && rows[i] != null) {
                    arr.push(rows[i]);
                  }
                }
              }

              return arr.map(row => {
                return row;
              });
            } else {
              return [];
            }
          },
          err => {
            const errObj = {
              type: 'ERR_DB_CREATE_TABLE',
              message: 'code:' + err.err.code + '--' + err.err.message,
              level: 'ERROR'
            };
            return Promise.reject(errObj);
          }
        )
    );
  }

getByCondition(condition): Observable<any> {
    const me = this;

    return from(
      me
        .databaseReady()
        .then(
          () => {
            return this.dbService.selectByCondition(this.getName(),condition);
          },
          err => {
            // not ready yet
          }
        )
        .then(
          data => {
            let rows: any;

            if (data.res.rows._array) {
              rows = data.res.rows._array;
            } else {
              // for websql
              // TODO remove on production

              rows = data.res.rows;
            }

            if (data.res.rows && rows.length > 0) {
              const arr = [];

              // TODO you me need to check if platform.is('cordova') beside the
              // below sentence
              if (win.sqlitePlugin) {
                // this is cordova so mobile

                for (let i = 0; i < rows.length; i++) {
                  if (rows.item(i) !== undefined && rows.item(i) != null) {
                    arr.push(rows.item(i));
                  }
                }
              } else {
                for (let i = 0; i < rows.length; i++) {
                  if (rows[i] !== undefined && rows[i] != null) {
                    arr.push(rows[i]);
                  }
                }
              }

              return arr.map(row => {
                return row;
              });
            } else {
              return [];
            }
          },
          err => {
            const errObj = {
              type: 'ERR_DB_CREATE_TABLE',
              message: 'code:' + err.err.code + '--' + err.err.message,
              level: 'ERROR'
            };
            return Promise.reject(errObj);
          }
        )
    );
  }
getBy(key,value): Observable<any> {
    const me = this;

    return from(
      me
        .databaseReady()
        .then(
          () => {
            return this.dbService.selectByKeyValue(this.getName(),key,value);
          },
          err => {
            // not ready yet
          }
        )
        .then(
          data => {
            let rows: any;

            if (data.res.rows._array) {
              rows = data.res.rows._array;
            } else {
              // for websql
              // TODO remove on production

              rows = data.res.rows;
            }

            if (data.res.rows && rows.length > 0) {
              const arr = [];

              // TODO you me need to check if platform.is('cordova') beside the
              // below sentence
              if (win.sqlitePlugin) {
                // this is cordova so mobile

                for (let i = 0; i < rows.length; i++) {
                  if (rows.item(i) !== undefined && rows.item(i) != null) {
                    arr.push(rows.item(i));
                  }
                }
              } else {
                for (let i = 0; i < rows.length; i++) {
                  if (rows[i] !== undefined && rows[i] != null) {
                    arr.push(rows[i]);
                  }
                }
              }

              return arr.map(row => {
                return row;
              });
            } else {
              return [];
            }
          },
          err => {
            const errObj = {
              type: 'ERR_DB_CREATE_TABLE',
              message: 'code:' + err.err.code + '--' + err.err.message,
              level: 'ERROR'
            };
            return Promise.reject(errObj);
          }
        )
    );
  }
  // getByKeyValues(keyValues): Observable<any> {
  //   const me = this;

  //   return from(
  //     me
  //       .databaseReady()
  //       .then(
  //         () => {
  //           return this.dbService.selectByKeyValue(this.getName(),keyValues);
  //         },
  //         err => {
  //           // not ready yet
  //         }
  //       )
  //       .then(
  //         data => {
  //           let rows: any;

  //           if (data.res.rows._array) {
  //             rows = data.res.rows._array;
  //           } else {
  //             // for websql
  //             // TODO remove on production

  //             rows = data.res.rows;
  //           }

  //           if (data.res.rows && rows.length > 0) {
  //             const arr = [];

  //             // TODO you me need to check if platform.is('cordova') beside the
  //             // below sentence
  //             if (win.sqlitePlugin) {
  //               // this is cordova so mobile

  //               for (let i = 0; i < rows.length; i++) {
  //                 if (rows.item(i) !== undefined && rows.item(i) != null) {
  //                   arr.push(rows.item(i));
  //                 }
  //               }
  //             } else {
  //               for (let i = 0; i < rows.length; i++) {
  //                 if (rows[i] !== undefined && rows[i] != null) {
  //                   arr.push(rows[i]);
  //                 }
  //               }
  //             }

  //             return arr.map(row => {
  //               return row;
  //             });
  //           } else {
  //             return [];
  //           }
  //         },
  //         err => {
  //           const errObj = {
  //             type: 'ERR_DB_CREATE_TABLE',
  //             message: 'code:' + err.err.code + '--' + err.err.message,
  //             level: 'ERROR'
  //           };
  //           return Promise.reject(errObj);
  //         }
  //       )
  //   );
  // }
}
