import { Injectable } from '@angular/core'

export interface IProductMainSliderRemote{
 
    // add all except if the field name is server_id
   
     id:number
       
         
    // add all except if the field name is server_id
   
     name:string
       
         
    // add all except if the field name is server_id
   
     ks_main_slider_img:string
       
         
    // add all except if the field name is server_id
   
     ks_main_slider_link:string
       
         
    // add all except if the field name is server_id
   
     sequence:number
       
         
            // instead of client_id for server purpose
            client_id: number
}

export interface IProductMainSlider{
     
 id:number
   
 name:string
   
 ks_main_slider_img:string
   
 ks_main_slider_link:string
   
 sequence:number
   
}

export const ProductMainSliderOdooFields =[ 'id', 'name', 'ks_main_slider_img', 'ks_main_slider_link', 'sequence' ]

@Injectable()
export class ProductMainSlider implements IProductMainSlider
  {
     
  public id:number
   
  public name:string
   
  public ks_main_slider_img:string
   
  public ks_main_slider_link:string
   
  public sequence:number
   
      constructor() { }

  public static init(){
  let productMainSlider: IProductMainSlider= {
     
   
         
               
                 id: null,
                   
                     
   
         
               
                 name: null,
                   
                     
   
         
               
                 ks_main_slider_img: null,
                   
                     
   
         
               
                 ks_main_slider_link: null,
                   
                     
   
         
               
                 sequence: null,
                   
                     

    }

return productMainSlider
  }
  

  public static getTableStructure()
{
  let structure: any = [
   
      { 'name': 'id', 'type': 'INTEGER PRIMARY KEY' },
     
      { 'name': 'name', 'type': 'TEXT' },
     
      { 'name': 'ks_main_slider_img', 'type': 'TEXT' },
     
      { 'name': 'ks_main_slider_link', 'type': 'TEXT' },
     
      { 'name': 'sequence', 'type': 'INTEGER' },
     

    ]
  return structure

}


}
