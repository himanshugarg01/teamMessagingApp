
app.controller("channelController", ["$scope","$rootScope","$http","$location","currentUser", function ($scope,$rootScope,$http,$location,currentUser) {
  
  $scope.channelName="";
  $scope.channel={};
  $scope.description="";
  $scope.channels=[];
  $scope.users=[];
  $scope.searchUser="";
  $scope.tags;
  $scope.start=0;
  $scope.currentUser=currentUser.user;
  
  


  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(window).height()+200+($scope.start*80)) {
      //  $scope.getMessages();
      console.log("scroll");
      
        $scope.start+=20;
    }
  });





$scope.getChannel =function getChannel()
  {
  //  $(document).ready(function() {
     
   // });
      $('#tags').select2({
        "placeholder" : "Enter tag...",
        "results": [
          
        ],
        'data' : [],
        tags : true,
        tokenSeparators: [' ']
      });
      $http({
          method: 'GET',
          url: '/channel/getChannel'
        }).then(function successCallback(res) {
            if(res.data.success)
            {
              console.log(res.data);
              $scope.channels=res.data.data.channels;
              
            }
            

            
          }, function errorCallback(response) {
            console.log("err");

            
          });
  }
  function addChannel()
  {
    // console.log($scope.channelName,$scope.description,$scope.tags);
      if($scope.channelName==""||$scope.description=="")
      {
        alert("input should not be empty")
      }
      else
      {
      $http({
          method: 'POST',
          data : {name : $scope.channelName,description : $scope.description,tags : $scope.tags},
          url: '/channel/add'
        }).then(function successCallback(res) {
            if(res.data.success)
            {
              alert("Channel Added");
              $scope.channels.push(res.data.data);
              $scope.channelName="";
              $scope.description="";
              $scope.tags="";
            }
            

            
          }, function errorCallback(response) {
            console.log("err");
            
          });
        }
      
  }
  function setChannel(channel)
  {
     console.log(channel);
    $scope.channel=channel;
   // $scope.channelName=channel.name;
    $scope.getUsers();
  }

  
  $scope.getUsers =function getUsers()
 {
     $http({
         method: 'POST',
         url: '/channel/getUsers',
         data : {channel: $scope.channel}
       }).then(function successCallback(res) {
           if(res.data.success)
           {
             console.log(res.data.data);
             $scope.users=res.data.data;
             
           }
           
           
         }, function errorCallback(response) {
           console.log("err");
           
         });
 }

$scope.getSearchUser=function()
{ 
  $http({
    method: 'POST',
    data : {search : $scope.searchUser,channel : $scope.channel},
    url: '/channel/searchUser'
  }).then(function successCallback(res) {
      if(res.data.success)
      {
        console.log(res.data.data);
        $scope.users=res.data.data;
      }
      

      
    }, function errorCallback(response) {
      console.log("err");
      
    });

}

$scope.addUser=function(user)
{
   //console.log($scope.channelName,$scope.description);
    

    $http({
        method: 'POST',
        data : {user : user,channel : $scope.channel},
        url: '/channel/addUser'
      }).then(function successCallback(res) {
          if(res.data.success)
          {
            alert("User Added");
            //$scope.getUsers();
            for(let i=0;i<$scope.users.length;i++)
            {
              if($scope.users[i]==user)
              {
                $scope.users.splice(i,1);
                break;
              }
            }
          }
          

          
        }, function errorCallback(response) {
          console.log("err");
          
        });
    
}

$scope.getCurrentUser=function()
{
  if($scope.currentUser)
  {

  }
  else
  {
    $http({
        method: 'GET',
        data : {user : user,channel : $scope.channel},
        url: '/channel/currentUser'
      }).then(function successCallback(res) {
          if(res.data.success)
          {
            $scope.currentUser=res.data.data;
          }
          
        }, function errorCallback(response) {
          console.log("err");
          
        });
  }
    
}


  $scope.setChannel=setChannel;
  $scope.addChannel=addChannel;
  $scope.getChannel();
  //$scope.getUsers();
  
}]);

