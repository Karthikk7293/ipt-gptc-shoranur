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
    getNotification:()=>{
        return new Promise(async(resolve,reject)=>{
            let notification= await db.get().collection(collection.NOTIFICATION_COLLECTION).find().toArray()
            console.log(notification);
            resolve(notification[0])
        })
    },
    getScrollContent:()=>{
        return new Promise(async(resolve,reject)=>{
            let scrollContent= await db.get().collection(collection.SCROLL_CONTENT_COLLECTION).find().toArray()
            console.log(scrollContent);
            resolve(scrollContent[0])
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
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"NCC"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getNssOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"NSS"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getIedcOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"IEDC"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getCeoOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"CEO"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getCooOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"COO"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getCmoOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"CMO"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getAsapOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"ASAP"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getCfoOfficer:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:"CFO"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getPrintingHodDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.HOD_COLLECTION).findOne({department:"Printing"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getElectronicsHodDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.HOD_COLLECTION).findOne({department:"Electronics"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getComputerHodDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.HOD_COLLECTION).findOne({department:"Computer"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getHeadDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.HOD_COLLECTION).findOne({department:"Superintendents"})
            if(data){
                resolve(data)
            }else{
                resolve({status:false})
            }
        })
    },
    getNccImages:()=>{
        return new Promise(async(resolve,reject)=>{
            let image = await db.get().collection(collection.NCC_COLLECTION).find().toArray()
            resolve(image);
        })
    },
    getNssImages:()=>{
        return new Promise(async(resolve,reject)=>{
            let image = await db.get().collection(collection.NSS_COLLECTION).find().toArray()
            resolve(image);
        })
    },
    getIedcImages:()=>{
        return new Promise(async(resolve,reject)=>{
            let image = await db.get().collection(collection.IEDC_COLLECTION).find().toArray()
            console.log("iedc img",image);
            resolve(image);
        })
    },
    getHostelImages:()=>{
        return new Promise(async(resolve,reject)=>{
            let image = await db.get().collection(collection.HOSTEL_COLLECTION).find().toArray()
            resolve(image);
        })
    },
    getAuditoriumImages:()=>{
        return new Promise(async(resolve,reject)=>{
            let image = await db.get().collection(collection.AUDITORIUM_COLLECTION).find().toArray()
            resolve(image);
        })
    },
    getWorkshopImages:()=>{
        return new Promise(async(resolve,reject)=>{
            let image = await db.get().collection(collection.WORKSHOP_COLLECTION).find().toArray()
            resolve(image);
        })
    },
    getAsapImages:()=>{
        return new Promise(async(resolve,reject)=>{
            let image = await db.get().collection(collection.ASAP_COLLECTION).find().toArray()
            resolve(image);
        })
    },
    getSeminarhallImages:()=>{
        return new Promise(async(resolve,reject)=>{
            let image = await db.get().collection(collection.SEMINARHALL_COLLECTION).find().toArray()
            resolve(image);
        })
    },
    getLibraryImages:()=>{
        return new Promise(async(resolve,reject)=>{
            let image = await db.get().collection(collection.LIBRARY_COLLECTION).find().toArray()
            resolve(image);
        })
    },
    getCanteenImages:()=>{
        return new Promise(async(resolve,reject)=>{
            let image = await db.get().collection(collection.CANTEEN_COLECTION).find().toArray()
            resolve(image);
        })
    }
}