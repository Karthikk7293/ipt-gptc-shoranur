var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt =require('bcrypt')
const ObjectId = require('mongodb').ObjectID

module.exports={

    getPrincipalDetails:()=>{
        return new Promise(async(resolve,reject)=>{
           let data=await db.get().collection(collection.PRINCIPAL_COLLECTION).find().toArray()
           
           console.log("api call ",data[0]);
           resolve(data[0])
        })
    },
    getComputerDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let staff= await db.get().collection(collection.COMPUTER_COLLECTION).find().toArray()
            console.log(staff);
            resolve(staff)
        })
    },
    getPrintingDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let staff= await db.get().collection(collection.PRINTING_COLLECTION).find().toArray()
            console.log(staff);
            resolve(staff)
        })
    },
    getGeneralDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let staff= await db.get().collection(collection.GENERAL_COLLECTION).find().toArray()
            console.log(staff);
            resolve(staff)
        })
    },
    getMechanicalDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let staff= await db.get().collection(collection.MECHANICAL_COLLECTION).find().toArray()
            console.log(staff);
            resolve(staff)
        })
    },
    getOfficeDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let staff= await db.get().collection(collection.OFFICE_COLLECTION).find().toArray()
            console.log(staff);
            resolve(staff)
        })
    },
    getEletronicsDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let staff= await db.get().collection(collection.ELCTRONICS_COLLECTION).find().toArray()
            console.log(staff);
            resolve(staff)
        })
    },
    getNccOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"ncc"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getNssOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"nss"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getIedcOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"iedc"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getCeoOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"ceo"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getCooOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"coo"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getCmoOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"cmo"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getCfoOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"cfo"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getElectronicsHodDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.HOD_COLLECTION).findOne({department:"electronics"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getComputerHodDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.HOD_COLLECTION).findOne({department:"computer"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getPrintingHodDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.HOD_COLLECTION).findOne({department:"superintendents"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    }
}