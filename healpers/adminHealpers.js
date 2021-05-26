var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt =require('bcrypt')
const ObjectId = require('mongodb').ObjectID

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
    }

}