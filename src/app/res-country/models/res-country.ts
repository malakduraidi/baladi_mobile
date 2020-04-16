import { Injectable } from '@angular/core'

export interface IResCountryRemote{
  
  id:number
       
  client_id:number      
   
  name:string
       
  code:string

}

export interface IResCountry{
  id:number
   
  client_id:number
   
  name:string
   
  code:string
   
}

export const ResCountryOdooFields =[ 'id', 'client_id' ,'name', 'code' ] 

@Injectable()
export class ResCountry implements IResCountry
{
  public id:number
   
  public client_id:number
   
  public name:string
   
  public code:string
   
  constructor() { }

  public static init(){

    let resCountry: IResCountry= {

      id: null,
      
      client_id: null,
      
      name: null,
                   
      code: null,
                   
    }

    return resCountry

  }
  
  public static getTableStructure()
  {
    
    let structure: any = [
   
      { 'name': 'id', 'type': 'INTEGER' },
     
      { 'name': 'client_id', 'type': 'INTEGER PRIMARY KEY' },
     
      { 'name': 'name', 'type': 'TEXT' },
     
      { 'name': 'code', 'type': 'TEXT' },
     
    ]
    
    return structure

  }
  
}
