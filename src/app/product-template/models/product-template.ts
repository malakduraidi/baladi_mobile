import { Injectable } from '@angular/core'

export interface IProductTemplateRemote{
  
  id:number
       
  name:string
       
  default_code:string
       
  barcode:string
       
  categ_id:number
       
  list_price:number
       
  standard_price:number
  
  image_medium:string
       
  image:string
       
  write_date:string
       
  qty_available:number
       
  virtual_available:number
       
  outgoing_qty:number
       
  product_variant_ids:string
       
  description:string

  type:string
       
  client_id: number

}

export interface IProductTemplate{
  id:number
   
  name:string
   
  default_code:string
   
  barcode:string
   
  categ_id:number
   
  list_price:number
   
  standard_price:number
   
  image_medium:string
   
  image:string
   
  write_date:string
      
  qty_available:number
   
  virtual_available:number
   
  outgoing_qty:number
   
  product_variant_ids:string
   
  description:string

  type:string
   
}


export const ProductTemplateOdooFields =[ 'id', 'name', 'default_code', 'barcode', 'categ_id', 'list_price', 'standard_price', 'write_date', 'qty_available', 'virtual_available', 'outgoing_qty', 'product_variant_ids', 'description','type']

@Injectable()
export class ProductTemplate implements IProductTemplate{
  
  public id:number
   
  public name:string
   
  public default_code:string
   
  public barcode:string
   
  public categ_id:number
   
  public list_price:number
   
  public standard_price:number
   
  public image_medium:string
   
  public image:string
   
  public write_date:string
      
  public qty_available:number
   
  public virtual_available:number
   
  public outgoing_qty:number
   
  public product_variant_ids:string
   
  public description:string

  public type:string
   
  constructor() { }

  public static init(){
    
    let productTemplate: IProductTemplate= {
      
      id: null,
      
      name: null,
      
      default_code: null,
      
      barcode: null,
      
      categ_id: null,
      
      list_price: null,
      
      standard_price: null,
      
      image_medium: null,
      
      image: null,
      
      write_date: new Date().toISOString(),
      
      qty_available: null,
      
      virtual_available: null,
      
      outgoing_qty: null,
      
      product_variant_ids: null,
      
      description: null,
      
      type: null,             
                     
    }

    return productTemplate

  }

  public static OdooToLocal(records:IProductTemplate[]){

    const records_names=[
      'categ_id'
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
  

  public static getTableStructure(){
    
    let structure: any = [
   
      { 'name': 'id', 'type': 'INTEGER PRIMARY KEY' },
     
      { 'name': 'name', 'type': 'TEXT' },

      { 'name': 'name', 'type': 'TEXT' },
     
      { 'name': 'default_code', 'type': 'TEXT' },
     
      { 'name': 'barcode', 'type': 'TEXT' },
     
      { 'name': 'categ_id', 'type': 'INTEGER' },
     
      { 'name': 'list_price', 'type': 'INTEGER' },
     
      { 'name': 'standard_price', 'type': 'INTEGER' },
     
      { 'name': 'image_medium', 'type': 'TEXT' },
     
      { 'name': 'image', 'type': 'TEXT' },
     
      { 'name': 'write_date', 'type': 'TEXT' },
          
      { 'name': 'qty_available', 'type': 'INTEGER' },
     
      { 'name': 'virtual_available', 'type': 'INTEGER' },
     
      { 'name': 'outgoing_qty', 'type': 'INTEGER' },
     
      { 'name': 'product_variant_ids', 'type': 'TEXT' },
     
      { 'name': 'description', 'type': 'TEXT' },
     
    ]

    return structure

  }

}
