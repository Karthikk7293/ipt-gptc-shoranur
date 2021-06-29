var express = require('express');
var router = express.Router();
var userHealpers =require('../healpers/userHealpers')

/* GET home page. */
router.get('/', async function(req, res, next) {

  let principal = await userHealpers.getPrincipalDetails()
  console.log("api call principal" ,principal); 
let notification = await userHealpers.getNotification()
let scrollContent = await userHealpers.getScrollContent()
  //let scrollContent =await userHealpers.getScrollContent()
  //console.log("api scroll contend",scrollContent);
  res.render('index',{principal,notification,scrollContent});
});

router.get('/aboutUs',(req,res)=>{

  res.render('user/aboutUs');
})

router.get('/electronics',async(req,res)=>{
  let staff = await userHealpers.getEletronicsDetails()
  //console.log("api call 1",staff);
  let hod = await userHealpers.getElectronicsHodDetails()

  res.render('user/electronics',{staff,hod})
})

router.get('/computer',async(req,res)=>{
  let staff = await userHealpers.getComputerDetails()
  //console.log("api call 1",staff);
  let hod = await userHealpers.getComputerHodDetails()
  res.render('user/computer',{staff,hod})
})

router.get('/printing',async(req,res)=>{
  let staff = await userHealpers.getPrintingDetails()
  //console.log("api call 1",staff);
  let hod = await userHealpers.getPrintingHodDetails()
  res.render('user/printing',{staff,hod})
})

router.get('/general',async(req,res)=>{
  let staff = await userHealpers.getGeneralDetails()
  //console.log("api call 1",staff);
  res.render('user/general',{staff})
})

router.get('/mechanical',async(req,res)=>{
  let staff = await userHealpers.getMechanicalDetails()
  //console.log("api call 1",staff);
  res.render('user/mechanical',{staff})

})

router.get('/office',async(req,res)=>{
  let staff = await userHealpers.getOfficeDetails()
  //console.log("api call 1",staff);
  let superendent = await userHealpers.getHeadDetails()
  res.render('user/office',{staff,superendent})
})

router.get('/ncc',async(req,res)=>{
  let staff = await userHealpers.getNccOfficer()
  console.log("api call",staff);

  res.render('user/ncc',{staff})
})

router.get('/nss',async(req,res)=>{
  let staff = await userHealpers.getNssOfficer()
  console.log("api call",staff);
  res.render('user/nss',{staff})
})

router.get('/iedc',async(req,res)=>{
  let staff = await userHealpers.getIedcOfficer()
  let ceo = await userHealpers.getCeoOfficer()
  let coo = await userHealpers.getCooOfficer()
  let cmo = await userHealpers.getCmoOfficer()
  let cfo = await userHealpers.getCfoOfficer()
  console.log("api call",staff);

  res.render('user/iedc',{staff,ceo,coo,cmo,cfo})
})

router.get('/asap',(req,res)=>{
  res.render('user/asap')
})

router.get('/fecilities',(req,res)=>{
  res.render('user/fecilities')

})

router.get('/gallery',async(req,res)=>{
  let ncc = await userHealpers.getNccImages()
  console.log(ncc);
  let nss = await userHealpers.getNssImages()
  console.log(nss);
  let iedc = await userHealpers.getIedcImages()
  console.log(iedc);
  let hostel = await userHealpers.getHostelImages()
  let auditorium = await userHealpers.getAuditoriumImages()
  let workshop = await userHealpers.getWorkshopImages()
  let asap = await userHealpers.getAsapImages()
  let library = await userHealpers.getLibraryImages()
  let seminarhall = await userHealpers.getSeminarhallImages()
  let canteen = await userHealpers.getCanteenImages()

  res.render('user/gallery',{ncc,nss,iedc,hostel,auditorium,workshop,asap,library,seminarhall,canteen})
})

router.get('/bog',(req,res)=>{
  res.render('user/bog')
})

router.get('/downloads',(req,res)=>{
  res.render('user/downloads')
})

router.get('/contactUs',(req,res)=>{
  res.render('user/contactUs')
})



router.get('/developers',(req,res)=>{
  res.render('user/developer')
})

module.exports = router;
