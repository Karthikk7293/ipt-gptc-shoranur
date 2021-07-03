const { response } = require('express');
var express = require('express');
const session = require('express-session');
var router = express.Router();
var adminHealpers =require('../healpers/adminHealpers')

const varifyLogin=(req,res,next)=>{
 let admin = req.session.adminLogged
 console.log(req.session+'session');
  if (admin){
    next()
  }else{
    res.redirect('/admin')  
  } 
}


/* GET users listing. */
router.get('/',async function(req, res, next) {

  if(req.session.adminLogged){
  res.render('admin/landing-page',{admin:true})

  }else{
    res.render('admin/login',{login:true})
  }

  
  
 
});
router.post('/',varifyLogin,(req,res)=>{
  console.log("api call", req.body);
  console.log("admin id",req.session.admin._id);
  
  res.redirect("/admin/landing-page")

})

// router.get('/login',(req,res)=>{ 
//   if(req.session.adminLogged){
//     res.redirect('/admin')
//   }else{
//     res.render('admin/login',{'loginError':req.session.loginError}) 
//     req.session.loginError=false
//   }
  
// })


    
router.post('/login',async(req,res)=>{
  console.log(req.body);
  console.log("api login call", req.body);
  //await adminHealpers.inseartAdminDetails(req.body)
  adminHealpers.doLogin(req.body).then((response)=>{
    //console.log(response.admin.name);
    //let admin = response.admin
    
    if(response.status){
        req.session.adminLogged=true
    req.session.admin=response.admin
   //console.log(req.session.admin)
        res.redirect('/admin/landing-page')
    }else{
      loginError='Invalid Username or Password'
      res.redirect('/admin/login',{loginError})
    }
}) 

})
router.get('/logout',(req,res)=>{
  console.log("api request");
 req.session.destroy()
 res.redirect('/admin/login')
})

router.get('/printing',varifyLogin,async(req,res)=>{
  let name={name:"printing Technology"}
  let data = await adminHealpers.getPrintingDetails()
  console.log(data);
  //console.log(data);

 res.render('admin/printing',{admin:true,data,name})
})

router.post('/printing',varifyLogin,(req,res)=>{
  console.log('api call',req.body);
  console.log('api image',req.files);
  let image =req.files.image
  adminHealpers.createPrintingStaff(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/assent/images/Printing/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/printing');
      }else{
        console.log(err);
        res.redirect('/admin/printing');
      }
    })
    
  })

 
})
router.get('/delete-printing/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeletePrintingStaff(req.params.id).then((response)=>{
   // console.log("api delete",response);
    res.redirect('/admin/printing')
  })
})


router.get('/electronics',varifyLogin,async(req,res)=>{
  let name={name:"elctronics engineering"}
  let data = await adminHealpers.getElectronicsDetails()
 // console.log(data);
  res.render('admin/electronics',{admin:true,data,name})
 })

 router.post('/electronics',varifyLogin,(req,res)=>{
  //console.log('api call',req.body);
  //console.log('api image',req.files);
  let image =req.files.image
  adminHealpers.createElectronicsStaff(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/assent/images/electronics/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/electronics');
      }else{
        console.log(err);
        res.redirect('/admin/electronics');
      }
    })
    
  })

 
})

router.get('/delete-electronics/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteElectronicsStaff(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/electronics')
  })
})


 router.get('/computer',varifyLogin,async(req,res)=>{
  let name={name:"computer engineering"}
  let data = await adminHealpers.getComputerDetails()
  // console.log(data);
  res.render('admin/computer',{admin:true,data,name})
 })

 router.post('/computer',varifyLogin,async(req,res)=>{
   //console.log('api call',req.body);
  //console.log('api image',req.files);
  let image =req.files.image
  adminHealpers.createcomputerStaff(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/assent/images/computer/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/computer');
      }else{
        console.log(err);
        res.redirect('/admin/computer');
      }
    })
    
  })

 
 })

 router.get('/delete-computer/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteComputerStaff(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/computer')
  })
})

 router.get('/general',varifyLogin,async(req,res)=>{
  let name={name:"genaral department"}
  let data = await adminHealpers.getGeneralDetails()
  // console.log(data);
  res.render('admin/general',{admin:true,data,name})
 })

router.post('/general',varifyLogin,(req,res)=>{
  //console.log('api call',req.body);
  //console.log('api image',req.files);
  let image =req.files.image
  adminHealpers.createGeneralStaff(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/assent/images/generalDepartment/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/general');
      }else{
        console.log(err);
        res.redirect('/admin/general');
      }
    })
    
  })

})

router.get('/delete-general/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteGeneralStaff(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/general')
  })
})


 router.get('/mechanical',varifyLogin,async(req,res)=>{
  let name={name:"mechanical workshop"}
  let data = await adminHealpers.getMechanicalDetails()
  // console.log(data);
  res.render('admin/mechanical',{admin:true,data,name})
 })

 router.post('/mechanical',varifyLogin,(req,res)=>{
    //console.log('api call',req.body);
  //console.log('api image',req.files);
  let image =req.files.image
  adminHealpers.createMechanicalStaff(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/assent/images/Workshop/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/mechanical');
      }else{
        console.log(err);
        res.redirect('/admin/mechanical');
      }
    })
    
  })
 })
 router.get('/delete-mechanical/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteMechanicalStaff(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/mechanical')
  })
})

 router.get('/office',async(req,res)=>{
  let name={name:"office"}
  let data = await adminHealpers.getOfficeDetails()
  // console.log(data);
  res.render('admin/office',{admin:true,data,name})
 })

router.post('/office',varifyLogin,(req,res)=>{
   //console.log('api call',req.body);
  //console.log('api image',req.files);
  let image =req.files.image
  adminHealpers.createOfficeStaff(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/assent/images/Office/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/office');
      }else{
        console.log(err);
        res.redirect('/admin/office');
      }
    })
    
  })

 })
 router.get('/delete-office/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteOfficeStaff(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/office')
  })
})


 router.get('/nccGallery',varifyLogin,async(req,res)=>{
  let name={name:"ncc"}
  let data = await adminHealpers.getNccImages()
  console.log("ncc image",data);
  res.render('admin/ncc-gallery',{admin:true,data,name})
 })

 router.post('/nccGallery',varifyLogin,(req,res)=>{
  let image =req.files.image
  adminHealpers.createNccGallery(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/images/ncc/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/ncc-gallery');
      }else{
        console.log(err);
        res.redirect('/admin/ncc-gallery');
      }
    })
    
  })

 })
 router.get('/delete-ncc/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteNccImages(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/ncc-gallery')
  })
 })
 
 router.get('/nssGallery',varifyLogin,async(req,res)=>{
  let name={name:"nss"}
  let data = await adminHealpers.getNssImages()
  console.log("ncc image",data);

  res.render('admin/nss-gallery',{admin:true,data,name})
 })

 router.post('/nssGallery',varifyLogin,(req,res)=>{
  let image =req.files.image
  adminHealpers.createNssGallery(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/images/nss/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/nss-gallery');
      }else{
        console.log(err);
      }
    })
    
  })
 })

 router.get('/delete-nss/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteNssImages(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/nss-gallery')
  })
 })
 
 router.get('/iedcGallery',varifyLogin,async(req,res)=>{
  let name={name:"iedc "}
  let data = await adminHealpers.getIedcImages()
  console.log(" image",data);
  res.render('admin/iedc-gallery',{admin:true,data,name})
 })

 router.post('/iedcGallery',varifyLogin,(req,res)=>{
  let image =req.files.image
  adminHealpers.createIedcGallery(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/images/iedc/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/iedc-gallery');
      }else{
        console.log(err);
      }
    })
    
  })
 })

 router.get('/delete-iedc/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteIedcImages(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/iedc-gallery')
  })
 })
 
 router.get('/hostelGallery',varifyLogin,async(req,res)=>{
  let name={name:"hostel "}
  let data = await adminHealpers.getHostelImages()
  console.log("image",data);
  res.render('admin/hostel-gallery',{admin:true,data,name})
 })

 router.post('/hostelGallery',varifyLogin,(req,res)=>{
  let image =req.files.image
  adminHealpers.createHostelGallery(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/images/hostel/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/hostel-gallery');
      }else{
        console.log(err);
        //alert("image uploading error try again!")
        res.redirect('/admin/hostel-gallery');
      }
    })
    
  })

 })

 router.get('/delete-hostel/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteHostelImages(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/hostel-gallery')
  })
 })
 
 router.get('/auditoriumGallery',varifyLogin,async(req,res)=>{
  let name={name:"auditorium"}
  let data = await adminHealpers.getAuditoriumImages()
  console.log("image",data);
  res.render('admin/auditorium-gallery',{admin:true,data,name})
 })

 router.post('/auditoriumGallery',varifyLogin,(req,res)=>{
  let image =req.files.image
  adminHealpers.createAuditoriumGallery(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/images/auditorium/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/auditorium-gallery');
      }else{
        console.log(err);
        //alert("image uploading error try again!")
        res.redirect('/admin/auditorium-gallery');
      }
    })
    
  })
 })
 router.get('/delete-auditorium/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteAuditoriumImages(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/auditorium-gallery')
  })
 })
 
 router.get('/workShopGallery',varifyLogin,async(req,res)=>{
  let name={name:"workshop"}
  let data = await adminHealpers.getWorkshopImages()
  console.log("image",data);
  res.render('admin/workshop-gallery',{admin:true,data,name})
 })

 router.post('/workShopGallery',varifyLogin,(req,res)=>{
  let image =req.files.image
  adminHealpers.createWorkshopGallery(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/images/workshop/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/workshop-gallery');
      }else{
        console.log(err);
       // alert("image uploading error try again!")
        res.redirect('/admin/workshop-gallery');
      }
    })
    
  })
 })

 router.get('/delete-workshop/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteWorkshopImages(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/workshop-gallery')
  })
 })
 
 router.get('/asapGallery',varifyLogin,async(req,res)=>{
  let name={name:"asap"}
  let data = await adminHealpers.getAsapImages()
  console.log("image",data);
  res.render('admin/asap-gallery',{admin:true,data,name})
 })

 router.post('/asapGallery',varifyLogin,(req,res)=>{
  let image =req.files.image
  adminHealpers.createAsapGallery(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/images/asap/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/asap-gallery');
      }else{
        console.log(err);
        //alert("image uploading error try again!")
        res.redirect('/admin/asap-gallery');
      }
    })
    
  })
 })

 router.get('/delete-asap/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteAsapImages(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/asap-gallery')
  })
 })
 
 router.get('/libraryGallery',varifyLogin,async(req,res)=>{
  let name={name:"library"}
  let data = await adminHealpers.getLibraryImages()
  console.log("image",data);
  res.render('admin/library-gallery',{admin:true,data,name})
 })

 router.post('/libraryGallery',varifyLogin,(req,res)=>{
  let image =req.files.image
  adminHealpers.createLibraryGallery(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/images/library/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/library-gallery');
      }else{
        console.log(err);
       // alert("image uploading error try again!")
        res.redirect('/admin/library-gallery');
      }
    })
    
  })
 })

 router.get('/delete-library/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteLibraryImages(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/library-gallery')
  })
 })
 
 router.get('/seminarHallGallery',varifyLogin,async(req,res)=>{
  let name={name:"seminar hall"}
  let data = await adminHealpers.getSeminarhallImages()
  console.log("image",data);
  res.render('admin/seminarHall-gallery',{admin:true,data,name})
 })

 router.post('/seminarHallGallery',varifyLogin,(req,res)=>{
  let image =req.files.image
  adminHealpers.createSeminarhallGallery(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/images/seminarHall/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/seminarHall-gallery');
      }else{
        console.log(err);
        //alert("image uploading error try again!")
        res.redirect('/admin/seminarHall-gallery');
      }
    })
    
  })
 })

 router.get('/delete-seminarhall/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteSeminarhallImages(req.params.id).then((response)=>{
   // console.log("api delete",response);
    res.redirect('/admin/seminarHall-gallery')
  })
 })
 
 router.get('/canteenGallery',varifyLogin,async(req,res)=>{
  let name={name:"canteen"}
  let data = await adminHealpers.getCanteenImages()
  console.log("image",data);
  res.render('admin/canteen-gallery',{admin:true,data,name})
 })

 router.post('/canteenGallery',varifyLogin,(req,res)=>{
  let image =req.files.image
  adminHealpers.createCanteenGallery(req.session.admin._id,req.body).then((response)=>{
    console.log("api response",response);
    image.mv('./public/images/canteen/'+response+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/canteen-gallery');
      }else{
        console.log(err);
        //alert("image uploading error try again!")
        res.redirect('/admin/canteen-gallery');
      }
    })
    
  })
 })

 router.get('/delete-canteen/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteCanteenImages(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/canteen-gallery')
  })
 })
 
 router.get('/coCurricular',varifyLogin,async(req,res)=>{
  let name={name:"ncc nss iedc asap"}
  let data = await adminHealpers.getCoCurricularData()
  console.log("image",data);
  res.render('admin/co-curricular',{admin:true,data,name})
 })
 router.post('/coCurricular',varifyLogin,(req,res)=>{
   let image= req.files.image
   console.log("iamge",image);
adminHealpers.createCoCurricular(req.body,req.session.admin._id).then((response)=>{
  console.log(response.id);
  console.log(response.status);
  if(response.status){
    image.mv('./public/images/coCurricular/'+response.id+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin/co-curricular');
      }else{
        console.log(err);
        //alert("image uploading error try again!")
        res.redirect('/admin/co-curricular');
      }
    })
  }else{
    //alert("Dont upload same data  try another one!")
        res.redirect('/admin/co-curricular');
  }

})

 })

 router.get('/delete-coCurricular/:id',varifyLogin,(req,res)=>{
  console.log(req.params.id);
  adminHealpers.DeleteCocurricularImages(req.params.id).then((response)=>{
    //console.log("api delete",response);
    res.redirect('/admin/co-curricular')
  })
 })


 router.get('/hod',varifyLogin,async(req,res)=>{
  let name={name:" HOD & SENIOR SUPERINTENDENTS"}
  let data = await adminHealpers.getHodImages()
  res.render('admin/hod',{admin:true,name,data})
})
router.post('/hod',varifyLogin,(req,res)=>{
  let image= req.files.image
  console.log("iamge",image);
adminHealpers.createHod(req.body,req.session.admin._id).then((response)=>{
 console.log(response.id);
 console.log(response.status);
 if(response.status){
   image.mv('./public/images/hod/'+response.id+'.jpg',(err,done)=>{
     if(!err){
       res.redirect('/admin/hod');
     }else{
       console.log(err);
       //alert("image uploading error try again!")
       res.redirect('/admin/hod');
     }
   })
 }else{
   //alert("Dont upload same data  try another one!")
       res.redirect('/admin/hod');
 }

})

})


router.get('/delete-hod/:id',varifyLogin,(req,res)=>{
 console.log(req.params.id);
 adminHealpers.DeleteHodImages(req.params.id).then((response)=>{
   //console.log("api delete",response);
   res.redirect('/admin/hod')
 })
})




 
 router.get('/notification',varifyLogin,(req,res)=>{
   console.log("api call 222",req.body);
   res.redirect('/admin/landing-page') 
 })

 router.get('/principal',varifyLogin,async(req,res)=>{
  let name={name:"PRINCIPAL"}
   let data= await adminHealpers.getPrincipalDetails()
   console.log("principal data ",data);
   res.render('admin/principal',{admin:true,data,name})

 })
 router.post('/principal',varifyLogin,(req,res)=>{
  let image= req.files.image
   adminHealpers.createPrincipal(req.body,req.session.admin._id).then((response)=>{
   // console.log("api response",response);
      console.log(response);
      console.log(response.status);
      if(response.status){
        image.mv('./public/assent/images/principal/'+response.id+'.jpg',(err,done)=>{
          if(!err){
            res.redirect('/admin/principal')
          }else{
            console.log(err);
            //alert("image uploading error try again!")
            res.redirect('/admin/principal')
          }
        })
      }else{
        //alert("Dont upload same data  try another one!")
        res.redirect('/admin/principal')
      }
     
    
    
   
  })
 })
 router.get('/delete-principal/:id',varifyLogin,(req,res)=>{
   console.log("api call",req.params.id);
   adminHealpers.deletePrincipal(req.params.id)
res.redirect('/admin/princpal')
 })

 router.get('/landingPage',varifyLogin,async(req,res)=>{
  let name={name:"HOME PAGE"}
  let not=await adminHealpers.getNotification()
  let scroll = await adminHealpers.getScrollContent()
  res.render('admin/landing-page',{admin:true,name,scroll,not})
 })
 
 
 router.post('/landingpage',varifyLogin,(req,res)=>{
   //console.log("api landing",req.body.notification);
   //console.log("api landing",req.body.scrollContent);
   if(req.body.notification){
     console.log("api not",req.body.notification);
     adminHealpers.createNotification(req.body.notification,req.session.admin._id).then((response)=>{
       console.log(response.status);
      res.redirect("/admin/landing-page");
     })
   }else{
     console.log("api scr",req.body.scrollContent);
     adminHealpers.createScrollContent(req.body.scrollContent,req.session.admin._id).then((response)=>{
       console.log(response.status);
       res.redirect("/admin/landing-page");
     })
    
   }
  

 })

 router.get('/delete-notification/:id',(req,res)=>{
  adminHealpers.deleteNotification(req.params.id).then((response)=>{
    console.log(response);
    res.redirect('/admin/landing-page');
  })
})
 
router.get('/delete-scrollContent/:id',(req,res)=>{
  adminHealpers.deleteScrollContent(req.params.id).then((response)=>{
    console.log(response);
    res.redirect('/admin/landing-page');
  })
})
 
 

module.exports = router;
