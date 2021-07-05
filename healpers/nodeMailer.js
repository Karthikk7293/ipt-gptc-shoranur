var nodemailer = require('nodemailer');
var adminemail ="movietickets.new@gmail.com"

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'movietickets.new@gmail.com',
      pass: 'Riljo@-7293'
    }
  });

 

module.exports={

    sendMail:(details)=>{
        console.log("api call mail",details.email,details.message,details.subject);

        return new Promise ((resolve,reject)=>{
            

            var mailOptions = {
                from: "movietickets.new@gmail.com",
                to: details.email,
                subject: " ipt & gptc ",
                text:details.message,
                date: new Date()
            
                
              };
              
              transporter .sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log("error",error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
              
        })
    }
    

}