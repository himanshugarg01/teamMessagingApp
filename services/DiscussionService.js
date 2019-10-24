let users = require('../model/users');
let channels = require('../model/channels');
let messages = require('../model/messages');

function getChannel(req, res){
  
    
    let {id} = req.body;
    //console.log(req.body);
    channels.findOne({
       _id : id
    })
    .then((data) => {
     // console.log(data);
      
      res.send({data : data,success : true});
    })
    .catch((err)=>{
      res.send({success: false});
    })
}

function sendMessage(req, res){
  
    
  let {channel,discussionBody} = req.body;
  //console.log(req.body);
  let newMessage = new messages({
    channel : channel._id,
    message : discussionBody,
    userName : req.session.userName,
  });
    newMessage.save().then(data => {
    res.send({data : data,success:true});
    })
    .catch(err => {
    console.error(err)
    res.send({success:false});
    })
}


function getMessages(req, res){
  
  let {channel,start,search} = req.body; 

  if(search!='')
  {
      var findObj= {
      "message":  { '$regex' : search, '$options' : 'i' },
      channel : channel._id,
     
      }
  }
  else{
  delete findObj;
  findObj= {
    channel : channel._id,
    }
  }


  
  //console.log(req.body);
  messages.find(findObj).skip(start).limit(20).sort({createdAt : -1})
  .then((data) => {
    //console.log(data);
    
    res.send({data : data,success : true});
  })
  .catch((err)=>{
    res.send({success: false});
  })
}
module.exports = {
    getChannel,
    sendMessage,
    getMessages,



}