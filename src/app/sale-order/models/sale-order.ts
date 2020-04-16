import { Injectable } from '@angular/core'

export interface ISaleOrderRemote{
 
    // add all except if the field name is server_id
   
     id:number
       
         
    // add all except if the field name is server_id
   
     client_id:number
       
         
    // add all except if the field name is server_id
   
     name:string
       
         
    // add all except if the field name is server_id
   
     amount_tax:number
       
         
    // add all except if the field name is server_id
   
     amount_total:number
       
         
    // add all except if the field name is server_id
   
     amount_untaxed:number
       
         
    // add all except if the field name is server_id
   
     partner_id:number
       
         
    // add all except if the field name is server_id
   
     invoice_ids:string
       
         
    // add all except if the field name is server_id
   
     state:string
       
         
    // add all except if the field name is server_id
   
     date_order:string
       
         
    // add all except if the field name is server_id
   
     write_date:string
       
         
    // add all except if the field name is server_id
   
     note:string,
            // instead of client_id for server purpose
}

export interface ISaleOrder{
     
 id:number
   
 client_id:number
   
 name:string
   
 amount_tax:number
   
 amount_total:number
   
 amount_untaxed:number
   
 partner_id:number
   
 invoice_ids:string
   
 state:string
   
 date_order:string
   
 write_date:string
   
 note:string
   
}

export const SaleOrderOdooFields =[ 'id', 'client_id', 'name', 'amount_tax', 'amount_total', 'amount_untaxed', 'partner_id', 'invoice_ids', 'state', 'date_order', 'write_date', 'note' ] 
@Injectable()
export class SaleOrder implements ISaleOrder
  {
     
  public id:number
   
  public client_id:number
   
  public name:string
   
  public amount_tax:number
   
  public amount_total:number
   
  public amount_untaxed:number
   
  public partner_id:number
   
  public invoice_ids:string
   
  public state:string
   
  public date_order:string
   
  public write_date:string
   
  public note:string
   
      constructor() { }

  public static init(){
  let saleOrder: ISaleOrder= {
     
   
         
               
                 id: null,
                   
                     
   
         
               
                 client_id: null,
                   
                     
   
         
               
                 name: null,
                   
                     
   
         
               
                 amount_tax: null,
                   
                     
   
         
               
                 amount_total: null,
                   
                     
   
         
               
                 amount_untaxed: null,
                   
                     
   
         
               
                 partner_id: null,
                   
                     
   
         
               
                 invoice_ids: null,
                   
                     
   
         
               
                 state: null,
                   
                     
   
         
               
                 date_order: null,
                   
                     
   
         
           write_date: new Date().toISOString(),
             
               
                     
   
         
               
                 note: null,
                   
                     

    }

return saleOrder
  }
  

  public static getTableStructure()
{
  let structure: any = [
   
      { 'name': 'id', 'type': 'INTEGER' },
     
      { 'name': 'client_id', 'type': 'INTEGER PRIMARY KEY' },
     
      { 'name': 'name', 'type': 'TEXT' },
     
      { 'name': 'amount_tax', 'type': 'TEXT' },
     
      { 'name': 'amount_total', 'type': 'TEXT' },
     
      { 'name': 'amount_untaxed', 'type': 'TEXT' },
     
      { 'name': 'partner_id', 'type': 'INTEGER' },
     
      { 'name': 'invoice_ids', 'type': 'TEXT' },
     
      { 'name': 'state', 'type': 'TEXT' },
     
      { 'name': 'date_order', 'type': 'TEXT' },
     
      { 'name': 'write_date', 'type': 'TEXT' },
     
      { 'name': 'note', 'type': 'TEXT' },
     

    ]
  return structure

}


}
