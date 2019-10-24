let users = require('../model/users');
let channels = require('../model/channels');
let messages = require('../model/messages');
var async = require('async');
ObjectId = require('mongodb').ObjectID;
// var await = require('asyncawait/await');
// var Parallel=require('async-parallel');

async function dashboard(req, res){
  
    
    let {from,to} = req.body;
  //  let topChannels,topRegions,topUsers,topTags;
var dash =[
    messages.aggregate([
    {$match :
       {"createdAt" : {$gte : new Date(from),$lte : new Date(to)}}
    },
    {$group : 
      {_id : "$channel",sum : {$sum : 1}}
    },
    {$sort : {sum : -1}}
    ]).limit(5)
    .then((data) => {
      console.log("retgfdf",data);
     var findObj={};
    findObj["$or"]= [];
    for(let i=0;i<data.length;i++)
    {
      findObj.$or.push({'_id' : ObjectId(data[i]._id)});
    }
   // console.log(findObj.$or);
    
    return channels.find(findObj).then((channel)=>{
     // console.log("..........",channel);
      
      return {topChannels : channel};
    })

    })
    .catch((err)=>{
      return err
    }),

    channels.aggregate([
      {$match :
         {"createdAt" : {$gte : new Date(from),$lte : new Date(to)}}
      },
      {
      $unwind : '$tags'
      },
      {$match : {"tags" :{$ne : ""}}},
      {$group : 
        {_id : "$tags",sum : {$sum : 1}}
      },
      {$sort : {sum : -1}}
      ]).limit(5)
      .then((data) => {
        return {topTags : data};
      })
      .catch((err)=>{
        return err
      }),

      users.aggregate([
        {$match :
           {"createdAt" : {$gte : new Date(from),$lte : new Date(to)}}
        },
        {$group : 
          {_id : "$region",sum : {$sum : 1}}
        },
        {$sort : {sum : -1}}
        ]).limit(5)
        .then((data) => {
          return {topRegions : data};
        })
        .catch((err)=>{
          return err
        }),

        messages.aggregate([
          {$match :
             {"createdAt" : {$gte : new Date(from),$lte : new Date(to)}}
          },
          {$group : 
            {_id : "$userName",sum : {$sum : 1}}
          },
          {$sort : {sum : -1}}
          ]).limit(5)
          .then((data) => {
            return {topUsers : data};
          })
          .catch((err)=>{
            return err
          })
  ];

  Promise.all(dash).then(function(values) {
    console.log(values);
    res.send({data:values,success : true});
  }).catch((err)=>{
    res.send({success :false })
  });
  

}

module.exports = {
    dashboard,



}