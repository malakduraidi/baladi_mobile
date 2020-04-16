import { Injectable } from '@angular/core'

export interface ISaleOrderLineRemote{
    // add all except if the field name is server_id
     id:number
    // add all except if the field name is server_id
     product_id:number
    // add all except if the field name is server_id
     order_id:number
    // add all except if the field name is server_id
     product_uom_qty:number
    // add all except if the field name is server_id
     price_unit:number
    // add all except if the field name is server_id
     discount:number
    // add all except if the field name is server_id
     price_tax:number
    // add all except if the field name is server_id
     price_total:number
    // add all except if the field name is server_id
   
     offer_id:number
       
         
    // add all except if the field name is server_id
   
     write_date:string
       
         
            // instead of client_id for server purpose
            client_id: number
}

export interface ISaleOrderLine{
     
 id:number
   
 client_id:number
   
 product_id:number
   
 order_id:number
   
 product_uom_qty:number
   
 price_unit:number
   
 discount:number
   
 price_tax:number
   
 price_total:number
   
 offer_id:number
   
 write_date:string
   
}

export const SaleOrderLineOdooFields =[ 'id', 'client_id', 'product_id', 'order_id', 'product_uom_qty', 'price_unit', 'discount', 'price_tax', 'price_total', 'offer_id', 'write_date' ]

@Injectable()
export class SaleOrderLine implements ISaleOrderLine
  {
     
  public id:number
   
  public client_id:number
   
  public product_id:number
   
  public order_id:number
   
  public product_uom_qty:number
   
  public price_unit:number
   
  public discount:number
   
  public price_tax:number
   
  public price_total:number
   
  public offer_id:number
   
  public write_date:string
   
      constructor() { }

  public static init(){
  let saleOrderLine: ISaleOrderLine= {
     
   
         
               
                 id: null,
                   
                     
   
         
               
                 client_id: null,
                   
                     
   
         
               
                 product_id: null,
                   
                     
   
         
               
                 order_id: null,
                   
                     
   
         
               
                 product_uom_qty: null,
                   
                     
   
         
               
                 price_unit: null,
                   
                     
   
         
               
                 discount: null,
                   
                     
   
         
               
                 price_tax: null,
                   
                     
   
         
               
                 price_total: null,
                   
                     
   
         
               
                 offer_id: null,
                   
                     
   
         
           write_date: new Date().toISOString(),
             
               
                     

    }

return saleOrderLine
  }
  


  public static fromDbToData(dbData:ISaleOrderLine[]){
    if(Array.isArray(dbData))
    {
      dbData.map((rec:any)=>{
        if(rec['discount']) rec['discount']=parseFloat(rec['discount'])
        if(rec['price_tax']) rec['price_tax']=parseFloat(rec['price_tax'])
        if(rec['price_total']) rec['price_total']=parseFloat(rec['price_total'])

        return rec

      })

      return dbData
    }
    

  }
  public static getTableStructure()
{
  let structure: any = [
   
      { 'name': 'id', 'type': 'INTEGER' },
     
      { 'name': 'client_id', 'type': 'INTEGER PRIMARY KEY' },
     
      { 'name': 'product_id', 'type': 'INTEGER' },
     
      { 'name': 'order_id', 'type': 'INTEGER' },
     
      { 'name': 'product_uom_qty', 'type': 'INTEGER' },
     
      { 'name': 'price_unit', 'type': 'INTEGER' },
     
      { 'name': 'discount', 'type': 'TEXT' },
     
      { 'name': 'price_tax', 'type': 'TEXT' },
     
      { 'name': 'price_total', 'type': 'TEXT' },
     
      { 'name': 'offer_id', 'type': 'INTEGER' },
     
      { 'name': 'write_date', 'type': 'TEXT' },
     

    ]
  return structure

}


}
