var express = require('express');
var router = express.Router();
var userHealpers =require('../healpers/userHealpers')

/* GET home page. */
router.get('/', async function(req, res, next) {

  let principal = await userHealpers.getPrincipalDetails()
  console.log("api call principal" ,principal);

  //let scrollContent =await userHealpers.getScrollContent()
  //console.log("api scroll contend",scrollContent);
  res.render('index',{principal});
});

router.get('/aboutUs',(req,res)=>{

  res.render('user/aboutUs');
})

router.get('/electronics',(req,res)=>{
  res.render('user/electronics')
})

router.get('/computer',(req,res)=>{
  res.render('user/computer')
})

router.get('/printing',(req,res)=>{
  res.render('user/printing')
})

router.get('/general',(req,res)=>{
  res.render('user/general')
})

router.get('/mechanical',(req,res)=>{
  res.render('user/mechanical')

})

router.get('/office',(req,res)=>{
  res.render('user/office')
})

router.get('/ncc',(req,res)=>{
  res.render('user/ncc')
})

router.get('/nss',(req,res)=>{
  res.render('user/nss')
})

router.get('/iedc',(req,res)=>{
  res.render('user/iedc')
})

router.get('/asap',(req,res)=>{
  res.render('user/asap')
})


module.exports = router;
