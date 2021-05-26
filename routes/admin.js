var express = require('express');
var router = express.Router();
var adminHealpers =require('../healpers/adminHealpers')

const varifyLogin=(req,res,next)=>{

  if (req.session.adminLogged){
    next()
  }else{
    res.render('admin/login',{admin:true})
  }
}


/* GET users listing. */
router.get('/',async function(req, res, next) {

  if(req.session.adminLogged){
   
    let principal = await adminHealpers.findPrincipalDetails()
  console.log('api response ' ,principal);
  res.render('admin',{admin:true,principal})

  }else{
    res.render('admin/login')
  }

  
  
 
});
router.post('/',(req,res)=>{
  console.log("api call", req.body);
  console.log("admin id",req.session.admin._id);
  adminHealpers.createPrincipal(req.body,req.session.admin._id).then((response)=>{
    console.log("api response",response);

  })

})

router.get('/login',(req,res)=>{
  res.redirect("admin/login")
})

router.post('/login',async(req,res)=>{
  console.log(req.body);
  console.log("api login call", req.body);
 // await adminHealpers.inseartAdminDetails(req.body)
  adminHealpers.doLogin(req.body).then((response)=>{
    //console.log(response.admin.name);
    //let admin = response.admin
    
    if(response.status){
        req.session.adminLogged=true
    req.session.admin=response.admin
   //console.log(req.session.admin)
        res.render('admin',{admin:true})
    }else{
      res.redirect('admin/login')
    }
}) 
})
router.get('/logout',varifyLogin,(req,res)=>{
  console.log("api request");
 req.session.destroy()
 res.redirect('admin/login')
})

router.get('/printing',varifyLogin,(req,res)=>{

 res.render('admin/printing',{admin:true})
})

router.get('/electronics',(req,res)=>{

  res.render('admin/electronics',{admin:true})
 })

 router.get('/computer',(req,res)=>{

  res.render('admin/computer',{admin:true})
 })

 router.get('/general',(req,res)=>{

  res.render('admin/general',{admin:true})
 })

 router.get('/mechanical',(req,res)=>{

  res.render('admin/mechanical',{admin:true})
 })

 router.get('/office',(req,res)=>{

  res.render('admin/office',{admin:true})
 })

 router.get('/nccGallery',(req,res)=>{

  res.render('admin/ncc-gallery',{admin:true})
 })
 
 router.get('/nssGallery',(req,res)=>{

  res.render('admin/nss-gallery',{admin:true})
 })
 
 router.get('/iedcGallery',(req,res)=>{

  res.render('admin/iedc-gallery',{admin:true})
 })
 
 router.get('/hostelGallery',(req,res)=>{

  res.render('admin/hostel-gallery',{admin:true})
 })
 
 router.get('/auditoriumGallery',(req,res)=>{

  res.render('admin/auditorium-gallery',{admin:true})
 })
 
 router.get('/workShopGallery',(req,res)=>{

  res.render('admin/workshop-gallery',{admin:true})
 })
 
 router.get('/asapGallery',(req,res)=>{

  res.render('admin/asap-gallery',{admin:true})
 })
 
 router.get('/libraryGallery',(req,res)=>{

  res.render('admin/library-gallery',{admin:true})
 })
 
 router.get('/seminarHallGallery',(req,res)=>{

  res.render('admin/seminarHall-gallery',{admin:true})
 })
 
 router.get('/canteenGallery',(req,res)=>{

  res.render('admin/canteen-gallery',{admin:true})
 })
 
 router.get('/nccHome',(req,res)=>{

  res.render('admin/ncc-home',{admin:true})
 })
 
 router.get('/nssHome',(req,res)=>{

  res.render('admin/nss-home',{admin:true})
 })
 
 router.get('/iedcHome',(req,res)=>{

  res.render('admin/iedc-home',{admin:true})
 })
 
 router.get('/asapHome',(req,res)=>{

  res.render('admin/asap-home',{admin:true})
 })

 router.get('/landingPage',(req,res)=>{

  res.render('admin/landing-page',{admin:true})
 })

 
 
 

module.exports = router;
