
let channels = require('../model/channels');
let users = require('../model/users');

function addChannel(req, res){
  
    
    let {name,description,tags} = req.body;
      let newChannel = new channels({
      'name' : name,
      'description' : description,
      'tags' : tags,
      'users' : [req.session.Id], 
      'createdBy' : req.session.userName,

      });
      newChannel.save().then(data => {
      console.log(data);
    

      users.findOneAndUpdate({
        "userName" : req.session.userName,
      },
      {
        
        $push : {channels : data._id+"" }
      })
      .then(user => {
        console.log("add channel   ");
        //  res.json({data})
      })
      .catch(err => {
        res.json({error: true});
      })

      res.send({data : data,success:true});
        })
      .catch(err => {
      console.error(err)
      res.send({success:false});
      })
}
 

function getChannel(req,res)
{
  users.findOne({
    'userName' : req.session.userName,
  
  }).populate('channels')
  .then(data => {
     res.send({data : data,success : true});
     
   })
   .catch(err => {
     console.error(err)
     
     res.send({success : false});
     //res.send(error)
   })
}

  function currentUser(req,res)
  {
    users.findOne({
      'userName' : req.session.userName,
    
    }).populate('requests')
    .then(data => {
      res.send({data : data,success : true});
      
    })
    .catch(err => {
      console.error(err)
      
      res.send({success : false});
      //res.send(error)
    })
  }




function searchChannel(req,res)
{
    let {search,start}=req.body;
    let findObj={};
    if(search!='')
    {
        findObj["$or"]= [{
        "name":  { '$regex' : search, '$options' : 'i' },
        'users' : {'$ne' :req.session.Id },
       
        },
        {
        "tags":  { '$regex' : search, '$options' : 'i' },
        'users' : {'$ne' :req.session.Id },
        },
        ]
    }
    else{
    delete findObj["$or"];
    findObj= {
      'users' : {'$ne' :req.session.Id },
      }
    }


    channels.find(findObj)
    .skip(start).limit(20)
    .then(data => {
      //  console.log(data)
      res.send({data : data,success : true});
      })
      .catch(err => {
        console.error(err)
        res.send({success : false});
      })
}



function getUsers(req,res)
{
  let {channel}=req.body;
 // console.log(channel);
  
  users.find({
    // createdBy : {'$ne' :req.session.userName},
    //userName : {'$ne' :req.session.userName },
    channels :{'$ne' :channel._id },
    requests : {'$ne' :channel._id},
  })
  .then(data => {
    //  console.log(data)
    res.send({data : data,success : true});
    })
    .catch(err => {
      console.error(err)
      res.send({success : false});
    })
}

function searchUser(req,res)
{
    let {search,channel}=req.body;
    let findObj;
    if(search!='')
        findObj= {
        userName:  { '$regex' : search, '$options' : 'i' },
        channels :{'$ne' :channel._id },
    }
    else{
        delete findObj;
        findObj= {
          channels :{'$ne' :channel._id },
    }
    }


     users.find(findObj).then(data => {
      //  console.log(data)
      res.send({data : data,success : true});
      })
      .catch(err => {
        console.error(err)
        res.send({success : false});
      })
}

function addUser(req, res){
  
    
  let {user,channel} = req.body;
         
  channels.findOneAndUpdate({
    _id : channel._id,
  },
  {
    $push : {invites : user._id },
  })
  .then(data => {
    //console.log("add channel   ",data);
    //  res.json({data})
    })
    .catch(err => {
      res.json({error: true});
    })

  users.findOneAndUpdate({
    userName : user.userName,
  },
  {
    $push : {requests : channel._id }
  })
  .then(data => {
    res.send({success:true});
    })
  .catch(err => {
    res.json({error: true});
    })

            
}

function joinChannel(req, res){
  
  let data;
  let {channel} = req.body;
         
  channels.findOneAndUpdate({
    _id : channel._id,
  },
  {
    $push : {users : req.session.Id },
    $pull : {invites : req.session.Id},
  })
  .then(com => {
    data=com;
    //console.log("add channel   ",data);
    //  res.json({data})
    })
    .catch(err => {
      res.json({error: true});
    })

  users.findOneAndUpdate({
    userName : req.session.userName,
  },
  {
    $push : {channels : channel._id },
    $pull : {requests : channel._id},
  })
  .then(user => {
    res.send({data : data,success:true});
    })
  .catch(err => {
    res.json({error: true});
    })

            
}


function rejectRequest(req, res){
  
  let data;
  let {channel} = req.body;
         
  channels.findOneAndUpdate({
    _id : channel._id,
  },
  {
    $pull : {invites : req.session.Id},
  })
  .then(com => {
    data=com;
    })
    .catch(err => {
      res.json({error: true});
    })

  users.findOneAndUpdate({
    userName : req.session.userName,
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
    addChannel,
    getChannel,
    searchChannel,
    getUsers,
    searchUser,
    addUser,
    joinChannel,
    currentUser,
    rejectRequest,

}