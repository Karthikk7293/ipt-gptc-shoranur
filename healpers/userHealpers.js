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
    }
}