import { Injectable } from '@angular/core'

export interface IResPartnerRemote{
   
    id:number
       
    uid:number
       
    login:string
         
    password:string
                  
    state_id:number

    street:string

    parent_id:number
   
    country_id:number
   
    lang:number
   
    name:string
   
    active:boolean
   
    mobile:string
   
    phone:string
   
    image:string
   
    birthdate:string
   
    lat:string
   
    long:string
   
    email:string
   
    gender:string
   
    credit:number
   
    debit:number
   
    credit_limit:number

    property_product_pricelist:number

    write_date:string
       
    client_id:number
    
    logged:boolean

    type:string

}

export interface IResPartner{

    id:number
   
    uid:number
   
    login:string
   
    password:string
   
    state_id:number

    street:string

    parent_id:number
   
    country_id:number
   
    lang:number
   
    name:string
   
    active:boolean
   
    mobile:string
   
    phone:string
   
    image:string
   
    birthdate:string
   
    lat:string
   
    long:string
   
    email:string
   
    gender:string
   
    credit:number
   
    debit:number
   
    credit_limit:number
   
    property_product_pricelist:number
   
    write_date:string
    
    logged:boolean

    client_id:number

    type:string

}

export const ResPartnerOdooFields =[ 'id', 'uid', 'login', 'password', 'street', 'parent_id', 'state_id', 'country_id', 'lang', 'name', 'active', 'mobile', 'phone', 'image', 'birthdate', 'lat', 'long', 'email', 'gender', 'credit', 'debit', 'credit_limit', 'property_product_pricelist', 'write_date', 'type']

@Injectable()
export class ResPartner implements IResPartner{

    public id:number
   
    public uid:number
   
    public login:string
   
    public password:string
   
    public state_id:number

    public street:string

    public parent_id:number
   
    public country_id:number
   
    public lang:number
   
    public name:string
   
    public active:boolean
   
    public mobile:string
   
    public phone:string
   
    public image:string
   
    public birthdate:string
   
    public lat:string
   
    public long:string
   
    public email:string
   
    public gender:string
   
    public credit:number
   
    public debit:number
   
    public credit_limit:number
   
    public property_product_pricelist:number
   
    public write_date:string
    
    public logged:boolean
   
    public client_id:number

    public type:string

    constructor() { }

    public static init(){
        let resPartner: IResPartner= {
   
            id: null,
           
            uid: null,
            
            login: null,
             
            password: null,
              
            state_id: null,

            street:null,

            parent_id:null,
               
            country_id: null,
               
            lang: null,
              
            name: null,
               
            active: null,
               
            mobile: null,
               
            phone: null,
                   
            image: null,
                   
            birthdate: null,
               
            lat: null,
                   
            long: null,
                   
            email: null,
               
            gender: null,
                   
            credit: null,
                      
            debit: null,
   
            credit_limit: null,

            property_product_pricelist: null,
                   
            write_date: new Date().toISOString(),
            
            logged:false,
            
            client_id: null,

            type: null

        }
 
        return resPartner

    }

    public static OdooToLocal(records:IResPartner[])
    {
        const records_names=[
            'country_id',
            'state_id'
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
   
            { 'name': 'id', 'type': 'INTEGER' },
     
            { 'name': 'uid', 'type': 'INTEGER' },
     
            { 'name': 'login', 'type': 'TEXT' },
     
            { 'name': 'password', 'type': 'TEXT' },
     
            { 'name': 'state_id', 'type': 'INTEGER' },

            { 'name': 'street', 'type': 'TEXT' },
     
            { 'name': 'parent_id', 'type': 'INTEGER' },
     
            { 'name': 'country_id', 'type': 'INTEGER' },
     
            { 'name': 'lang', 'type': 'INTEGER' },
     
            { 'name': 'name', 'type': 'TEXT' },
     
            { 'name': 'active', 'type': 'TEXT' },
     
            { 'name': 'mobile', 'type': 'TEXT' },
     
            { 'name': 'phone', 'type': 'TEXT' },
     
            { 'name': 'image', 'type': 'TEXT' },
     
            { 'name': 'birthdate', 'type': 'TEXT' },
     
            { 'name': 'lat', 'type': 'TEXT' },
     
            { 'name': 'long', 'type': 'TEXT' },
     
            { 'name': 'email', 'type': 'TEXT' },
     
            { 'name': 'gender', 'type': 'TEXT' },
     
            { 'name': 'credit', 'type': 'TEXT' },
     
            { 'name': 'debit', 'type': 'TEXT' },
     
            { 'name': 'credit_limit', 'type': 'TEXT' },
     
            { 'name': 'property_product_pricelist', 'type': 'INTEGER' },
     
            { 'name': 'write_date', 'type': 'TEXT' },
      
            { 'name': 'logged', 'type': 'TEXT' },

            {'name': 'client_id', 'type': 'INTEGER PRIMARY KEY'},

            {'name': 'type', 'type': 'TEXT'}

        ]

        return structure

    }

}
