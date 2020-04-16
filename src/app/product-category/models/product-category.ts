import { Injectable } from '@angular/core'

export interface IProductCategoryRemote{ 

  id:number
     
  name:string
     
  image_medium:string

  ks_categ_background:string

  parent_id:number
  
  write_date:string
     
  client_id: number
     
  child_id:any
     
  product_ids:any

}

export interface IProductCategory{
  
  id:number
   
  name:string
   
  image_medium:string
 
  ks_categ_background:string
   
  parent_id:number
 
  child_id:any
 
  product_ids:any
   
  write_date:string
   
}

export const ProductCategoryOdooFields =[ 'id', 'name','ks_categ_background', 'parent_id', 'write_date' ,'child_id', 'product_ids' ]

@Injectable()
export class ProductCategory implements IProductCategory{
  
  public id:number
   
  public name:string
   
  public image_medium:string
  
  public ks_categ_background:string
   
  public parent_id:number
   
  public write_date:string
  
  public child_id:any
  
  public product_ids:any
   
  constructor() { }

  public static init(){

    let productCategory: IProductCategory= {

      id: null,

      name: null,
      
      image_medium: null,
      
      ks_categ_background:null,
      
      parent_id: null,
      
      product_ids:null,
      
      child_id:null,
      
      write_date: new Date().toISOString(),

    }

    return productCategory

  }
  


  public static getTableStructure()
  {
    let structure: any = [
   
      { 'name': 'id', 'type': 'INTEGER PRIMARY KEY' },
     
      { 'name': 'name', 'type': 'TEXT' },
     
      { 'name': 'image_medium', 'type': 'TEXT' },
      
      { 'name': 'ks_categ_background', 'type': 'TEXT' },
     
      { 'name': 'parent_id', 'type': 'INTEGER' },
     
      { 'name': 'child_id', 'type': 'TEXT' },
      
      { 'name': 'product_ids', 'type': 'TEXT' },
      
      { 'name': 'write_date', 'type': 'TEXT' },

    ]

    return structure

  }

}
