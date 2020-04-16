import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

const win: any = window;

@Injectable()
export class DBProvider {
  private _dbPromise: Promise<any>;

  // TODO should be private
  public _db;

  constructor(public platform: Platform, private sqlitePorter: SQLitePorter) {}

  initDB(dbName, location = 'default'): Promise<any> {
    this._dbPromise = new Promise((resolve, reject) => {
      try {
        this.platform.ready().then(() => {
          if (this.platform.is('cordova') && win.sqlitePlugin) {
            // FOR MOBILE DEVICE sqlite
            this._db = win.sqlitePlugin.openDatabase({
              name: dbName,
              location: 'default'
            });
            // enable PRAGMA to use foreign keys constraint: it is OFF by default
            this.enableForeignKey();
          } else {
            // FOR WEBSQL
            console.warn(
              'Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!'
            );
            this._db = win.openDatabase(
              dbName,
              '1.0',
              'database',
              5 * 1024 * 1024
            );
          }
          resolve(this._db);
        });
      } catch (err) {
        reject({ err });
      }
    });
    return this._dbPromise;
  }

  public dropTable(tableName: string) {
    return this.query('DROP TABLE ' + tableName);
  }

  public getTableInfo(tableName: string) {
    return this.query('PRAGMA table_info(' + tableName + ')');
  }

  addColumn(tableName, column) {
    let query = '';
    if (column.default) {
      query =
        'ALTER TABLE ' +
        tableName +
        ' ADD COLUMN ' +
        column.name +
        ' ' +
        column.type +
        ' DEFAULT ' +
        column.default;
    } else {
      query =
        'ALTER TABLE ' +
        tableName +
        ' ADD COLUMN ' +
        column.name +
        ' ' +
        column.type +
        '';
    }
    return this.query(query);
  }

  // column to remove is array
  removeColumn(tableName, columnToRemove, col_structure) {
    const me = this;
    return new Promise((resolve, reject) => {
      this.query(
        'ALTER TABLE ' + tableName + ' RENAME TO ' + tableName + '_old;'
      ).then(
        data => {
          // get the column names from old table
          let columnsSeperated = '';
          me.getColumnNamesFromTable(tableName + '_old').then(
            col_names => {
              // we should remove the columnToRemove so we don't copy them to new table

              for (let j = 0; j < columnToRemove.length; j++) {
                for (let k = 0; k < col_names.length; k++) {
                  // remove the column that need to be removed
                  // so we don't copy the content to new array
                  if (col_names[k] === columnToRemove[j]) {
                    col_names.splice(k, 1);
                  }
                }
              }

              for (let i = 0; i < col_names.length; i++) {
                if (i !== col_names.length - 1) {
                  columnsSeperated += col_names[i];
                  columnsSeperated += ',';
                } else {
                  columnsSeperated += col_names[i];
                }
              }

              me.createTable(tableName, col_structure).then(
                succ => {
                  // insert data to the new table
                  me.query(
                    'INSERT INTO ' +
                      tableName +
                      '(' +
                      columnsSeperated +
                      ') SELECT ' +
                      columnsSeperated +
                      ' FROM ' +
                      tableName +
                      '_old;'
                  ).then(
                    succ_copy_data => {
                      me.query('DROP TABLE ' + tableName + '_old;').then(
                        success_drop => {},
                        err => {
                          console.log('err');
                        }
                      );
                    },
                    err_copy_data => {
                      reject(err_copy_data);
                    }
                  );
                },
                err_create_table => {}
              );
            },
            err_get_column_names => {}
          );
        },
        err_alter_table => {}
      );
    });
  }

  deleteDataFromTable(tableName): Promise<any> {
    return this.query('DELETE FROM ' + tableName);
  }

  getColumnNamesFromTable(tableName): Promise<any> {
    const me = this;
    const column_names = [];
    return new Promise((resolve, reject) => {
      me.getTableInfo(tableName).then(
        table_info => {
          if (table_info && table_info.res && table_info.res.rows.length > 0) {
            const table_rows = table_info.res.rows;
            for (let i = 0; i < table_rows.length; i++) {
              column_names.push(table_rows.item(i).name);
            }
            resolve(column_names);
          }
        },
        err => {
          reject(
            'error getin colun names from Table using paragma info ' +
              JSON.stringify(err)
          );
        }
      );
    });
  }

  createTable(tableName: any, tableParams: any): Promise<any> {
    if (tableName !== undefined) {
      let query = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' ';
      query += '(';
      for (let i = 0; i < tableParams.length; i++) {
        {
          query += '' + tableParams[i].name + ' ' + tableParams[i].type;
          if (
            tableParams[i].default &&
            tableParams[i].default !== undefined &&
            tableParams[i].default != null
          ) {
            query += '' + ' DEFAULT ' + tableParams[i].default;
          }

          // if no last column add  comma
          if (i !== tableParams.length - 1) {
            query += '' + ',';
          }
        }
      }

      query += ')';
      // query="CREATE TABLE IF NOT EXISTS e(e,n){var r=t.call (id integer primary key,name text,date text)"
      return this.query(query);
    }
  }
  insertManyPort(objects, tableName): Promise<any> {
    const me = this;
    //   var successFn = function(count){
    //     alert("Successfully imported JSON to DB; equivalent to "+count+" SQL statements");
    // };
    // var errorFn = function(error){
    //     alert("The following error occurred: "+error.message);
    // };
    // var progressFn = function(current, total){
    //     console.log("Imported "+current+"/"+total+" statements";
    // };

    const json = {
      data: {
        inserts: {
          [tableName]: objects
        }
      }
    };

    return new Promise((resolve, reject) => {
      me.sqlitePorter.importJsonToDb(me._db, json).then(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  insertMany(objects, tableName): Promise<any> {
    let questionValues = '';
    for (let k = 0; k < objects.length; k++) {
      questionValues += '(';
      const fieldsValues = this.getFieldValuesArr(objects[k]);
      for (let i = 0; i < fieldsValues.length; i++) {
        if (i !== fieldsValues.length - 1) {
          if (
            typeof fieldsValues[i] === 'string' ||
            fieldsValues[i] === undefined ||
            fieldsValues[i] === true ||
            fieldsValues[i] === false
          ) {
            questionValues += '\'' + fieldsValues[i] + '\'' + ',';
          } else {
            questionValues += fieldsValues[i] + ',';
          }
        } else {
          if (
            typeof fieldsValues[i] === 'string' ||
            fieldsValues[i] === undefined ||
            fieldsValues[i] === true ||
            fieldsValues[i] === false
          ) {
            questionValues += '\'' + fieldsValues[i] + '\'' + ',';
          } else {
            questionValues += fieldsValues[i] + '';
          }
        }
      }
      questionValues += ')';
      if (k !== objects.length - 1) {
        questionValues += ',';
      }
    }

    const query =
      'INSERT INTO ' +
      tableName +
      '(' +
      this.getFieldNamesStr(objects[0]) +
      ') VALUES ' +
      questionValues;
    return this.query(query);
  }
  upsert_v2(newObject, tableName,primaryKey,column_name): Promise<any> {
    const upsert=true
    const fieldsValues = this.getFieldValuesArr(newObject,primaryKey,upsert);

    let questionValues = '(';
    for (let i = 0; i < fieldsValues.length - 1; i++) {
      questionValues += '?,';
    } 
    questionValues += '?) ';

    const query =
      'INSERT INTO ' +
      tableName +
      '(' +
      this.getFieldNamesStr(newObject,primaryKey,upsert) +
      ') VALUES ' +
      questionValues +' ON CONFLICT('+column_name+') DO UPDATE SET ' +
      this.getFieldSetNamesStr(newObject) +
      ' WHERE '+column_name+'=? '+
       this.getFieldValuesArray(newObject)  


       return this.query(query, fieldsValues);


  }

  upsert(newObject, tableName,primaryKey?): Promise<any> {
    const upsert=true
    const fieldsValues = this.getFieldValuesArr(newObject,primaryKey,upsert);

    let questionValues = '(';
    for (let i = 0; i < fieldsValues.length - 1; i++) {
      questionValues += '?,';
    } 
    questionValues += '?) ';

    const query =
      'INSERT OR REPLACE INTO ' +
      tableName +
      '(' +
      this.getFieldNamesStr(newObject,primaryKey,upsert) +
      ') VALUES ' +
      questionValues;
    // return this.query('INSERT INTO ' + tableName + ' (' + this.getFieldNamesStr(newObject)
    // + ') VALUES (' + this.getFieldValuesStr(newObject) + ")", []);
    // var arrValues=[]
    // Object.keys(newObject).forEach(key =>
    //   {
    //   if(key != '§')
    //   arrValues.push(newObject[key])
    //   }
    // );
    // alert(arrValues);
    return this.query(query, fieldsValues);
  }

  insert(newObject, tableName,primaryKey?): Promise<any> {
    const fieldsValues = this.getFieldValuesArr(newObject,primaryKey);

    let questionValues = '(';
    for (let i = 0; i < fieldsValues.length - 1; i++) {
      questionValues += '?,';
    }
    questionValues += '?) ';

    const query =
      'INSERT OR REPLACE INTO ' +
      tableName +
      '(' +
      this.getFieldNamesStr(newObject,primaryKey) +
      ') VALUES ' +
      questionValues;
    // return this.query('INSERT INTO ' + tableName + ' (' + this.getFieldNamesStr(newObject)
    // + ') VALUES (' + this.getFieldValuesStr(newObject) + ")", []);
    // var arrValues=[]
    // Object.keys(newObject).forEach(key =>
    //   {
    //   if(key != '§')
    //   arrValues.push(newObject[key])
    //   }
    // );
    // alert(arrValues);
    return this.query(query, fieldsValues);
  }


  selectAll(tableName): Promise<any> {
    return this.query('SELECT * from ' + tableName);
  }

selectByKeyValue(tableName,key,value): Promise<any> {
    return this.query("SELECT * from " + tableName +" where "+key+" = '"+value+"'");

  }
  // selectByKeyValue(tableName,keyValues): Promise<any> {

  //   return this.query('SELECT * from ' + tableName +' where '+key+'="'+value+'"');
  // }
selectByCondition(tableName,condition): Promise<any> {
    
    return this.query('SELECT * from ' + tableName +' where '+condition);
  }

  private getFieldNamesStr(newObject,primaryKey?,upsert?) {
    let fields = '';
    if(!primaryKey) primaryKey='id'
    for (const f in newObject) {
      if(upsert)
      {
        if ( typeof newObject[f] !== 'function') {
          fields += f + ',';
        }
      }
      else {
      if (f !== primaryKey && typeof newObject[f] !== 'function') {
        fields += f + ',';
      }
    }
    }
    fields = fields.substr(0, fields.length - 1);
    return fields;
  }

  // private getFieldValuesStr(object) {
  //   let fields = '';
  //   for (let f in object) {
  //     if (f !== "id") fields += '\"' + object[f] + '\",';
  //   }
  //   fields = fields.substr(0, fields.length - 1);
  //   return fields;
  // }

  private getFieldValuesArr(object,primaryKey?,upsert?) {
    const fields = [];
    if(!primaryKey) primaryKey ='id'
    

    for (const f in object) {
      // we do not need the function
      if(upsert)
      {
        if ( typeof object[f] !== 'function') {
          fields.push(object[f]);
        }
      }else 
      {

      if ((f !== primaryKey) && typeof object[f] !== 'function') {
        fields.push(object[f]);
      }
    }
    }
    // fields = fields.substr(0, fields.length - 1);
    return fields;
  }

  // private getFieldNamesStr(newObject) {
  //   let fields = "";
  //   for (let f in newObject) {
  //     if (f !== "id") fields += f + ",";
  //   }
  //   fields = fields.substr(0, fields.length - 1);
  //   return fields;
  // }

  // // private getFieldValuesStr(object) {
  // //   let fields = '';
  // //   for (let f in object) {
  // //     if (f !== "id") fields += '\"' + object[f] + '\",';
  // //   }
  // //   fields = fields.substr(0, fields.length - 1);
  // //   return fields;
  // // }

  // private getFieldValuesArr(object) {
  //   let fields = [];
  //   for (let f in object) {
  //     if (f !== "id") fields.push(object[f]);
  //   }
  //   // fields = fields.substr(0, fields.length - 1);
  //   return fields;
  // }

  update(object, tableName): Promise<any> {
    return this.query(
      'UPDATE ' +
        tableName +
        ' SET ' +
        this.getFieldSetNamesStr(object) +
        ' WHERE id=?',
      this.getFieldValuesArray(object,true)
    );
  }

  updateBy(object, tableName,column_key): Promise<any> {
    return this.query(
      'UPDATE ' +
        tableName +
        ' SET ' +
        this.getFieldSetNamesStr(object) +
        ' WHERE '+column_key+'=?',
      this.getFieldValuesArray(object)
    );
  }

  updateByCondition(object, tableName,condition): Promise<any> {
    return this.query(
      'UPDATE ' +
        tableName +
        ' SET ' +
        this.getFieldSetNamesStr(object) +
        ' WHERE '+condition,
      this.getFieldValuesArray(object)
    );
  }

  private getFieldSetNamesStr(object) {
    let fields = '';
    for (const f in object) {
      if (f !== 'id' && typeof object[f] !== 'function') {
        fields += f + '=? ,';
      }
    }
    fields = fields.substr(0, fields.length - 1);
    return fields;
  }

  private getFieldValuesArray(object,id_exist?) {
    const fields = [];
    for (const f in object) {
      if (f !== 'id' && typeof object[f] !== 'function') {
        fields.push(object[f]);
      }
    }
    if(id_exist)
    {
    fields.push(object.id);
    }
    return fields;
  }

  delete(tableName, object,key?): Promise<any> {
    if(!key)
    {key="id"}
    const query = 'DELETE FROM ' + tableName + ' WHERE '+key+'=?';
    return this.query(query, [object[key]]);
  }


  deleteManyOld(tableName, ids): Promise<any> {
    // array of string
    let questionArray = '';
    for (let i = 0; i < ids.length; i++) {
      if (i === ids.length - 1) {
        // last one should be without comma
        questionArray += '?';
      } else {
        questionArray += '?,';
      }
    }

    const query =
      'DELETE FROM ' + tableName + ' WHERE id IN (' + questionArray + ')';
    return this.query(query, ids);
  }
  deleteMany(tableName, ids): Promise<any> {
    // sqlite has limitations of number  of variable
    // almost 999 at one transactions
    // the below is workaround when for example we need
    // to delete ( > 999 )

    const ids_chunk = this.chunck(ids, 500);
    // ids_chunk should contains array of array e.g [Array(500),Array(500),Array(10)]
    const promises = [];

    for (let k = 0; k < ids_chunk.length; k++) {
      let questionArray = '';

      for (let i = 0; i < ids_chunk[k].length; i++) {
        if (i === ids_chunk[k].length - 1) {
          // last one should be without comma
          questionArray += '?';
        } else {
          questionArray += '?,';
        }
      }

      const query =
        'DELETE FROM ' + tableName + ' WHERE id IN (' + questionArray + ')';
      promises.push(this.query(query, ids_chunk[k]));
    }
    // array of string
    return new Promise((resolve, reject) => {
      Promise.all(promises).then(
        (results: any) => {
          resolve('done delete all data');
        },
        err => {
          console.log('err in ' + JSON.stringify(err));
          reject('err in ' + JSON.stringify(err));
        }
      );
    });
  }

  GetAllTables(): Promise<any> {
    const query =
      'SELECT name FROM sqlite_master  WHERE type=\'table\' ORDER BY name';
    return this.query(query);
  }
  enableForeignKey() {
    return new Promise((resolve, reject) => {
      try {
        this._dbPromise.then(db => {
          db.transaction(
            (tx: any) => {
              tx.executeSql(
                'PRAGMA foreign_keys=ON;',
                [],
                // tslint:disable-next-line:no-shadowed-variable
                (tx: any, res: any) => resolve({ tx, res }),
                // tslint:disable-next-line:no-shadowed-variable
                (tx: any, err: any) => reject({ tx, err })
              );
            },
            (err: any) => reject({ err })
          );
        });
      } catch (err) {
        reject({ err });
      }
    });
  }

  selectLastInsertedID(tableName) {
    return this.query(
      'SELECT id FROM ' + tableName + ' ORDER BY id DESC LIMIT 1'
    );
  }
  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this._dbPromise.then(db => {
          db.transaction(
            (tx: any) => {
              tx.executeSql(
                query,
                params,
                // tslint:disable-next-line:no-shadowed-variable
                (tx: any, res: any) => resolve({ tx, res }),
                // tslint:disable-next-line:no-shadowed-variable
                (tx: any, err: any) => reject({ tx, err })
              );
            },
            (err: any) => reject({ err })
          );
        });
      } catch (err) {
        reject({ err });
      }
    });
  }

  chunck(arr, chunkSize) {
    const temporal = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
      temporal.push(arr.slice(i, i + chunkSize));
    }

    return temporal;
  }
}

// utility

// import { Injectable } from "@angular/core";
// import { Platform } from "ionic-angular";

// const win: any = window;

// @Injectable()
// export class DBProvider {
//   private _dbPromise: Promise<any>;

//   // TODO should be private
//   public _db;

//   constructor(public platform: Platform) {}

//   initDB(dbName, location = "default"): Promise<any> {
//     this._dbPromise = new Promise((resolve, reject) => {
//       try {
//         // let _db: any;
//         this.platform.ready().then(() => {
//           if (this.platform.is("cordova") && win.sqlitePlugin) {
//             //FOR MOBILE DEVICE sqlite
//             this._db = win.sqlitePlugin.openDatabase({
//               name: dbName,
//               location: "default"
//             });
//             //enable PRAGMA to use foreign keys constraint: it is OFF by default
//             this.enableForeignKey();
//           } else {
//             //FOR WEBSQL
//             console.warn(
//               "Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!"
//             );
//             this._db = win.openDatabase(
//               dbName,
//               "1.0",
//               "database",
//               5 * 1024 * 1024
//             );
//           }
//           resolve(this._db);
//         });
//       } catch (err) {
//         reject({ err: err });
//       }
//     });
//     return this._dbPromise;
//     // this._tryInit();
//   }

//   public dropTable(tableName: String) {
//     return this.query("DROP TABLE " + tableName);
//   }

//   // list(table: TABLES): Promise<any> {
//   //   return this.query('SELECT * FROM ' + TABLES[table]).then(data => {
//   //     if (data.res.rows.length > 0) {
//   //       if (this.platform.is('cordova') && win.sqlitePlugin) {
//   //         let result = [];
//   //
//   //         for (let i = 0; i < data.res.rows.length; i++) {
//   //           var row = data.res.rows.item(i);
//   //           result.push(row);
//   //         }
//   //         return result;
//   //       }
//   //       else {
//   //         return data.res.rows;
//   //       }
//   //     }
//   //   });
//   // }

//   createTable(tableName: any, tableParams: any): Promise<any> {
//     let query = "CREATE TABLE IF NOT EXISTS " + tableName + " ";
//     query += "(";
//     for (let i = 0; i < tableParams.length; i++) {
//       {
//         query += "" + tableParams[i].name + " " + tableParams[i].type;
//         if (
//           tableParams[i].default &&
//           tableParams[i].default != undefined &&
//           tableParams[i].default != null
//         ) {
//           query += "" + " DEFAULT " + tableParams[i].default;
//         }

//         //if no last column add  comma
//         if (i != tableParams.length - 1) {
//           query += "" + ",";
//         }
//       }
//     }

//     query += ")";
//     // query="CREATE TABLE IF NOT EXISTS e(e,n){var r=t.call (id integer primary key,name text,date text)"
//     return this.query(query);
//   }

//   insert(newObject, tableName): Promise<any> {
//     // alert(JSON.stringify(newObject));
//     // alert(tableName);
//     // alert(JSON.stringify(this.getFieldNamesStr(newObject)));
//     var fieldsValues = this.getFieldValuesArr(newObject);

//     var questionValues = "(";
//     for (var i = 0; i < fieldsValues.length - 1; i++) {
//       questionValues += "?,";
//     }
//     questionValues += "?) ";

//     var query =
//       "INSERT INTO " +
//       tableName +
//       "(" +
//       this.getFieldNamesStr(newObject) +
//       ") VALUES " +
//       questionValues;
//     // return this.query('INSERT INTO ' + tableName + ' (' + this.getFieldNamesStr(newObject)
//     // + ') VALUES (' + this.getFieldValuesStr(newObject) + ")", []);
//     // var arrValues=[]
//     // Object.keys(newObject).forEach(key =>
//     //   {
//     //   if(key != 'id')
//     //   arrValues.push(newObject[key])
//     //   }
//     // );
//     // alert(arrValues);
//     return this.query(query, fieldsValues);
//   }

//   selectAll(tableName): Promise<any> {
//     return this.query("SELECT * from " + tableName);
//   }

//   private getFieldNamesStr(newObject) {
//     let fields = "";
//     for (let f in newObject) {
//       if (f !== "id" && typeof newObject[f] != "function") fields += f + ",";
//     }
//     fields = fields.substr(0, fields.length - 1);
//     return fields;
//   }

//   // private getFieldValuesStr(object) {
//   //   let fields = '';
//   //   for (let f in object) {
//   //     if (f !== "id") fields += '\"' + object[f] + '\",';
//   //   }
//   //   fields = fields.substr(0, fields.length - 1);
//   //   return fields;
//   // }

//   private getFieldValuesArr(object) {
//     let fields = [];
//     for (let f in object) {
//       // we do not need the function
//       if (f !== "id" && typeof object[f] != "function") fields.push(object[f]);
//     }
//     // fields = fields.substr(0, fields.length - 1);
//     return fields;
//   }

//   update(object, tableName): Promise<any> {
//     return this.query(
//       "UPDATE " +
//         tableName +
//         " SET " +
//         this.getFieldSetNamesStr(object) +
//         " WHERE id=?",
//       this.getFieldValuesArray(object)
//     );
//   }

//   private getFieldSetNamesStr(object) {
//     let fields = "";
//     for (let f in object) {
//       if (f !== "id" && typeof object[f] != "function") fields += f + "=? ,";
//     }
//     fields = fields.substr(0, fields.length - 1);
//     return fields;
//   }

//   private getFieldValuesArray(object) {
//     let fields = [];
//     for (let f in object) {
//       if (f !== "id" && typeof object[f] != "function") fields.push(object[f]);
//     }
//     fields.push(object.id);
//     return fields;
//   }

//   delete(tableName, object): Promise<any> {
//     let query = "DELETE FROM " + tableName + " WHERE id=?";
//     return this.query(query, [object.id]);
//   }
//   //  receive array of ids
//   deleteMany(tableName, ids): Promise<any> {
//     // array of string
//     let QuestionArray = "";
//     for (var i = 0; i < ids.length; i++) {
//       if (i == ids.length - 1) {
//         // last one should be without comma
//         QuestionArray += "?";
//       } else {
//         QuestionArray += "?,";
//       }
//     }

//     let query =
//       "DELETE FROM " + tableName + " WHERE id IN (" + QuestionArray + ")";
//     return this.query(query, ids);
//   }

//   enableForeignKey() {
//     return new Promise((resolve, reject) => {
//       try {
//         this._dbPromise.then(db => {
//           db.transaction(
//             (tx: any) => {
//               tx.executeSql(
//                 "PRAGMA foreign_keys=ON;",
//                 [],
//                 (tx: any, res: any) => resolve({ tx: tx, res: res }),
//                 (tx: any, err: any) => reject({ tx: tx, err: err })
//               );
//             },
//             (err: any) => reject({ err: err })
//           );
//         });
//       } catch (err) {
//         reject({ err: err });
//       }
//     });
//   }

//   query(query: string, params: any[] = []): Promise<any> {
//     return new Promise((resolve, reject) => {
//       try {
//         this._dbPromise.then(db => {
//           db.transaction(
//             (tx: any) => {
//               tx.executeSql(
//                 query,
//                 params,
//                 (tx: any, res: any) => resolve({ tx: tx, res: res }),
//                 (tx: any, err: any) => reject({ tx: tx, err: err })
//               );
//             },
//             (err: any) => reject({ err: err })
//           );
//         });
//       } catch (err) {
//         reject({ err: err });
//       }
//     });
//   }
// }
