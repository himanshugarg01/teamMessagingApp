let users = require('../model/users');

function SignupServices(req, res){
  
    
    let {firstName, lastName,emailId, userName, password,region} = req.body;
    console.log(req.body);
    users.find({
       "userName" : userName
    })
        .then((user) => {
            if(user.length>0){
              //  req.flash('info', 'Username already exists!')
                res.send({success: false});
            }
            else{
                let newUser = new users({
                    'firstName' : firstName,
                    'lastName' : lastName,
                    'emailId' : emailId,
                    'userName' : userName,
                    'password' : password,
                    'region' : region,

                });
                newUser.save().then(data => {
            //    req.flash('info', 'Signed up successfully!')
                    res.send({success:true});
                    })
                    .catch(err => {
                    console.error(err)
                    res.send({success:false});
                    })
            }
        })
        .catch((err)=>{
            res.send({success: false});
        })
}

function checkName(req, res){
  
    
    let { userName} = req.body;
   // console.log(req.body);
    users.find({
       "userName" : userName
    })
        .then((user) => {
            if(user.length>0){
                
                res.send({success :true});
            }
            else{
                res.send({success :false});
            }
        })
}

module.exports = {
    SignupServices,
    checkName,
}