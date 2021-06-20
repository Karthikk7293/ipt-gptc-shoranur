var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt =require('bcrypt')
const ObjectId = require('mongodb').ObjectID
const { response } = require('express')

module.exports={

    inseartAdminDetails:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            //console.log('api call from admin',adminData.email);
            adminData.password=await bcrypt.hash(adminData.password,10)
            db.get().collection(collection.ADMIN_COLLECTION).insertOne(adminData).then((data)=>{
                resolve(data.ops[0])
            })
        })
    },


    doLogin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let admin = await db.get().collection(collection.ADMIN_COLLECTION).findOne({email:adminData.email})
            if(admin){
                bcrypt.compare(adminData.password,admin.password).then((status)=>{
                    if(status){
                        console.log('login success')
                        response.admin=admin
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('login failed');
                        resolve({status:false})
                    }
                })
            }else{
                console.log('login failed');
                resolve({status:false})
            }
        })
    },
    createPrincipal:(principalData,adminId)=>{
        return new Promise(async(resolve,reject)=>{

            let admin = await db.get().collection(collection.PRINCIPAL_COLLECTION).findOne({admin:ObjectId(adminId)})
                  if(admin<1){
                    let principalObj={
                        admin:ObjectId(adminId),
                        principal:principalData.name,
                        qualification:principalData.qualification
                    }
                    db.get().collection(collection.PRINCIPAL_COLLECTION).insertOne(principalObj).then((data)=>{
                       console.log("api call for id",data.ops[0]._id);
                        resolve(data.ops[0]._id)
                    })

                  }
             
              
        })
    },
    findPrincipalDetails:()=>{
        return new Promise (async(resolve,reject)=>{
           let principal = await db.get().collection(collection.PRINCIPAL_COLLECTION).find().toArray()
           //console.log('principal object call',principal);
           resolve(principal[0])
        })
    },
    getPrincipalDetails:()=>{
        return new Promise (async(resolve,reject)=>{
            let principal = await db.get().collection(collection.PRINCIPAL_COLLECTION).find().toArray()
            //console.log('principal object call',principal[0]);
            resolve(principal[0])
        })
    },
    createPrintingStaff:(adminId,data)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let staff=await db.get().collection(collection.PRINTING_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!staff){
                let staffObj={
                    admin:ObjectId(adminId),
                    name:data.name,
                    posision:data.posision

                }
                db.get().collection(collection.PRINTING_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })
            }else{
                staffObj={
                    admin:ObjectId(adminId),
                    name:data.name,
                    posision:data.posision
                }
                db.get().collection(collection.PRINTING_COLLECTION).insertOne(staffObj).then((response)=>{
                    console.log("printing response",response.ops);
                    console.log("printing response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },
    getPrintingDetails:()=>{
        return new Promise(async(resolve,reject)=>{
         let staff = await db.get().collection(collection.PRINTING_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(staff)
        })
    },
    createElectronicsStaff:(adminId,data)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let staff=await db.get().collection(collection.ELCTRONICS_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!staff){
                let staffObj={
                    admin:ObjectId(adminId),
                    name:data.name,
                    posision:data.posision

                }
                db.get().collection(collection.ELCTRONICS_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                    name:data.name,
                    posision:data.posision
                }
                db.get().collection(collection.ELCTRONICS_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },
    getElectronicsDetails:()=>{
        return new Promise(async(resolve,reject)=>{
         let staff = await db.get().collection(collection.ELCTRONICS_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(staff)
        })
    },
    createcomputerStaff:(adminId,data)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let staff=await db.get().collection(collection.COMPUTER_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!staff){
                let staffObj={
                    admin:ObjectId(adminId),
                    name:data.name,
                    posision:data.posision

                }
                db.get().collection(collection.COMPUTER_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                    name:data.name,
                    posision:data.posision
                }
                db.get().collection(collection.COMPUTER_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },
    getComputerDetails:()=>{
        return new Promise(async(resolve,reject)=>{
         let staff = await db.get().collection(collection.COMPUTER_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(staff)
        })
    },

    createGeneralStaff:(adminId,data)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let staff=await db.get().collection(collection.GENERAL_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!staff){
                let staffObj={
                    admin:ObjectId(adminId),
                    name:data.name,
                    posision:data.posision

                }
                db.get().collection(collection.GENERAL_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                    name:data.name,
                    posision:data.posision
                }
                db.get().collection(collection.GENERAL_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },
    getGeneralDetails:()=>{
        return new Promise(async(resolve,reject)=>{
         let staff = await db.get().collection(collection.GENERAL_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(staff)
        })
    },


    createMechanicalStaff:(adminId,data)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let staff=await db.get().collection(collection.MECHANICAL_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!staff){
                let staffObj={
                    admin:ObjectId(adminId),
                    name:data.name,
                    posision:data.posision

                }
                db.get().collection(collection.MECHANICAL_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                    name:data.name,
                    posision:data.posision
                }
                db.get().collection(collection.MECHANICAL_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },
    getMechanicalDetails:()=>{
        return new Promise(async(resolve,reject)=>{
         let staff = await db.get().collection(collection.MECHANICAL_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(staff)
        })
    },

    createOfficeStaff:(adminId,data)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let staff=await db.get().collection(collection.OFFICE_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!staff){
                let staffObj={
                    admin:ObjectId(adminId),
                    name:data.name,
                    posision:data.posision

                }
                db.get().collection(collection.OFFICE_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                    name:data.name,
                    posision:data.posision
                }
                db.get().collection(collection.OFFICE_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },
    getOfficeDetails:()=>{
        return new Promise(async(resolve,reject)=>{
         let staff = await db.get().collection(collection.OFFICE_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(staff)
        })
    },
    createNccGallery:(adminId,data)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let staff=await db.get().collection(collection.NCC_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!staff){
                let staffObj={
                    admin:ObjectId(adminId)
                    

                }
                db.get().collection(collection.NCC_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                   
                }
                db.get().collection(collection.NCC_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },

    getNccImages:()=>{
        return new Promise(async(resolve,reject)=>{
         let staff = await db.get().collection(collection.NCC_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(staff)
        })
    },
    createNssGallery:(adminId,data)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let nss=await db.get().collection(collection.NSS_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!nss){
                let staffObj={
                    admin:ObjectId(adminId)
                    

                }
                db.get().collection(collection.NSS_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                   
                }
                db.get().collection(collection.NSS_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },

    getNssImages:()=>{
        return new Promise(async(resolve,reject)=>{
         let nss = await db.get().collection(collection.NSS_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(nss)
        })
    },

    createIedcGallery:(adminId,data)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let nss=await db.get().collection(collection.IEDC_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!nss){
                let staffObj={
                    admin:ObjectId(adminId)
                    

                }
                db.get().collection(collection.IEDC_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                   
                }
                db.get().collection(collection.IEDC_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },

    getIedcImages:()=>{
        return new Promise(async(resolve,reject)=>{
         let nss = await db.get().collection(collection.IEDC_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(nss)
        })
    },

    createHostelGallery:(adminId,data)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let nss=await db.get().collection(collection.HOSTEL_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!nss){
                let staffObj={
                    admin:ObjectId(adminId)
                    

                }
                db.get().collection(collection.HOSTEL_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                   
                }
                db.get().collection(collection.HOSTEL_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },

    getHostelImages:()=>{
        return new Promise(async(resolve,reject)=>{
         let nss = await db.get().collection(collection.HOSTEL_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(nss)
        })
    },

    createAuditoriumGallery:(adminId,data)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let nss=await db.get().collection(collection.AUDITORIUM_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!nss){
                let staffObj={
                    admin:ObjectId(adminId)
                    

                }
                db.get().collection(collection.AUDITORIUM_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                   
                }
                db.get().collection(collection.AUDITORIUM_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },

    getAuditoriumImages:()=>{
        return new Promise(async(resolve,reject)=>{
         let nss = await db.get().collection(collection.AUDITORIUM_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(nss)
        })
    },

    createWorkshopGallery:(adminId)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let nss=await db.get().collection(collection.WORKSHOP_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!nss){
                let staffObj={
                    admin:ObjectId(adminId)
                    

                }
                db.get().collection(collection.WORKSHOP_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                   
                }
                db.get().collection(collection.WORKSHOP_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },

    getWorkshopImages:()=>{
        return new Promise(async(resolve,reject)=>{
         let data = await db.get().collection(collection.WORKSHOP_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(data)
        })
    },

    getAuditoriumImages:()=>{
        return new Promise(async(resolve,reject)=>{
         let nss = await db.get().collection(collection.AUDITORIUM_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(nss)
        })
    },

    createAsapGallery:(adminId)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let nss=await db.get().collection(collection.ASAP_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!nss){
                let staffObj={
                    admin:ObjectId(adminId)
                    

                }
                db.get().collection(collection.ASAP_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                   
                }
                db.get().collection(collection.ASAP_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },

    getAsapImages:()=>{
        return new Promise(async(resolve,reject)=>{
         let data = await db.get().collection(collection.ASAP_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(data)
        })
    },

    createLibraryGallery:(adminId)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let nss=await db.get().collection(collection.LIBRARY_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!nss){
                let staffObj={
                    admin:ObjectId(adminId)
                    

                }
                db.get().collection(collection.LIBRARY_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                   
                }
                db.get().collection(collection.LIBRARY_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },

    getLibraryImages:()=>{
        return new Promise(async(resolve,reject)=>{
         let data = await db.get().collection(collection.SEMINARHALL_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(data)
        })
    },

    createSeminarhallGallery:(adminId)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let nss=await db.get().collection(collection.SEMINARHALL_COLLECTION).findOne({admin:ObjectId(adminId)})
            if(!nss){
                let staffObj={
                    admin:ObjectId(adminId)
                    

                }
                db.get().collection(collection.SEMINARHALL_COLLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                   
                }
                db.get().collection(collection.SEMINARHALL_COLLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },

    getSeminarhallImages:()=>{
        return new Promise(async(resolve,reject)=>{
         let data = await db.get().collection(collection.SEMINARHALL_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(data)
        })
    },

    createCanteenGallery:(adminId)=>{
        
        return new Promise(async(resolve,rejcet)=>{
            
            let nss=await db.get().collection(collection.CANTEEN_COLECTION).findOne({admin:ObjectId(adminId)})
            if(!nss){
                let staffObj={
                    admin:ObjectId(adminId)
                    

                }
                db.get().collection(collection.CANTEEN_COLECTION).insertOne(staffObj).then((response)=>{
                    resolve(response.ops[0]._id)
                })

            }else{
                staffObj={
                    admin:ObjectId(adminId),
                   
                }
                db.get().collection(collection.CANTEEN_COLECTION).insertOne(staffObj).then((response)=>{
                    //console.log(" response",response.ops);
                    //console.log(" response",response.ops[0]._id);
                    resolve(response.ops[0]._id)
                })
            }
        })
    },

    getCanteenImages:()=>{
        return new Promise(async(resolve,reject)=>{
         let data = await db.get().collection(collection.CANTEEN_COLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(data)
        })
    },
    createCoCurricular:(data,adminId)=>{
        return new Promise(async(resolve,reject)=>{

            let head = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).findOne({department:data.department})
                  if(head<1){
                    let curricularObj={
                        admin:ObjectId(adminId),
                        name:data.name,
                        posision:data.posision,
                        department:data.department
                    }
                    db.get().collection(collection.CO_CURRICULAR_COLLECTION).insertOne(curricularObj).then((data)=>{
                       //console.log("api call for id",data.ops[0]._id);
                       let id=data.ops[0]._id
                        resolve({id,status:true})
                    })

                  }else{
                      resolve({status:false});
                  }
             
              
        })
    },
    getCoCurricularData:()=>{
        return new Promise(async(resolve,reject)=>{
         let data = await db.get().collection(collection.CO_CURRICULAR_COLLECTION).find().toArray()
            //console.log("staff",staff);
            resolve(data)
        })
    }


}