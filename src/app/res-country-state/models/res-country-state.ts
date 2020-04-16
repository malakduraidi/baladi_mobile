import { Injectable } from '@angular/core'

export interface IResCountryStateRemote{
 
    // add all except if the field name is server_id
   
     id:number
       
         
    // add all except if the field name is server_id
   
     client_id:number
       
         
    // add all except if the field name is server_id
   
     name:string
       
         
    // add all except if the field name is server_id
   
     code:string
       
         
    // add all except if the field name is server_id
   
     country_id:number
       
}

export interface IResCountryState{
     
 id:number
   
 client_id:number
   
 name:string
   
 code:string
   
 country_id:number
   
}

export const ResCountryStateOdooFields =[ 'id', 'client_id', 'name', 'code', 'country_id' ] 
@Injectable()
export class ResCountryState implements IResCountryState
  {
     
  public id:number
   
  public client_id: number

  public name: string

  public code: string

  public country_id: number

  constructor() { }

  public static init() {
    let resCountryState: IResCountryState = { id: null, client_id: null, name: null, code: null, country_id: null }

    return resCountryState
  }



  public static OdooToLocal(records:IResCountryState[])
  {
    const records_names=[
      'country_id'
    ]

    let localRecords=records.slice()
     return localRecords.map(record=>{
      for(let i=0;i<records_names.length;i++)
      {
        if(record[records_names[i]] && record[records_names[i]].length > 0)
        record[records_names[i]]=record[records_names[i]][0]

      }
      return record
    })
    
  }


  public static getTableStructure() {
    let structure: any = [

      { 'name': 'id', 'type': 'INTEGER' },

      { 'name': 'client_id', 'type': 'INTEGER PRIMARY KEY' },

      { 'name': 'name', 'type': 'TEXT' },

      { 'name': 'code', 'type': 'TEXT' },

      { 'name': 'country_id', 'type': 'INTEGER' },

    ]
    return structure

  }

}
