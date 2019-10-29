let users = require('../model/users');
let channels = require('../model/channels');
let messages = require('../model/messages');

function getChannel(req, res){
  
    
    let {id} = req.body;
    //console.log(req.body);
    channels.findOne({
       _id : id
    }).populate({
       path: 'invites',
       select : {_id : 1,userName : 1}
      })
    .populate({
      path: 'users',
      select : {_id : 1,userName : 1}
     })
    .then((data) => {
      console.log("dataa......"+data);
      
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



async function cancelInvite(req, res){
  
  let data;
  let {channel,user} = req.body;
         
  channels.findOneAndUpdate({
    _id : channel._id,
  },
  {
    $pull : {invites : user._id},
  })
  .then(com => {
    data=com;
    })
    .catch(err => {
      res.json({error: true});
    })

  users.findOneAndUpdate({
    userName : user.userName,
  },
  {
    $pull : {requests : channel._id},
  })
  .then(user => {
    res.send({data : data,success:true});
    })
  .catch(err => {
    res.json({error: true});
    })

            
}
module.exports = {
    getChannel,
    sendMessage,
    getMessages,
    cancelInvite,


}