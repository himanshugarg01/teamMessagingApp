
app.controller("discussionController", ["$scope","$rootScope","$http","$location","$routeParams", function ($scope,$rootScope,$http,$location,$routeParams) {
  

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height()+650+$scope.start*150) {
        $scope.getMessages();
        $scope.start+=20;
    }
 });

   $scope.discussionBody="";
   $scope.channel;
   $scope.messages=[];
   $scope.start=0;
   $scope.searchPostString="";
   $scope.prevSearch="";
   console.log($routeParams.id);
    
  $scope.getChannel=function()
  {
    $http({
      method: 'POST',
      data : {id : $routeParams.id},
      url: '/discussion/getChannel'
    }).then(function successCallback(res) {
        if(res.data.success)
        {
          console.log(res.data.data);
          
          $scope.channel=res.data.data;
          $scope.getMessages();
        }
        

        
      }, function errorCallback(response) {
        console.log("err");
        
      });
  
  } 
 
  function sendMessage()
  {
  //    console.log($rootScope.login)
  console.log($scope.discussionBody);
      if($scope.discussionBody==undefined||$scope.discussionBody=="")
      {
        alert("message should not be empty");
      }
      else
      {
       $http({
          method: 'POST',
          data : {discussionBody : $scope.discussionBody,channel : $scope.channel},
          url: '/discussion/sendMessage'
        }).then(function successCallback(res) {
            if(res.data.success)
            {
             // alert("message success");
              $scope.messages=[res.data.data].concat($scope.messages);
              $scope.discussionBody="";
            }
            else
            {
                
            }

            
          }, function errorCallback(response) {
            console.log("err");
            
          });
        }
      
  }

$scope.cancelInvite = function(user)
  {
 
       $http({
          method: 'POST',
          data : {user : user,channel : $scope.channel},
          url: '/discussion/cancelInvite'
        }).then(function successCallback(res) {
            if(res.data.success)
            {
             for(i=0;i<$scope.channel.invites.length;i++)
             {
               if($scope.channel.invites[i]==user)
               {
                $scope.channel.invites.splice(i,1);
               }
             }
            }
           
          }, function errorCallback(response) {
            console.log("err");
            
          });
        
      
  }



$scope.getMessages=function()
  {
  //    console.log($rootScope.login);
      if($scope.prevSearch!=$scope.searchPostString)
      {
        $scope.start=0;
      }
       $http({
          method: 'POST',
          data : {channel : $scope.channel,start : $scope.start,search : $scope.searchPostString},
          url: '/discussion/getMessages'
        }).then(function successCallback(res) {
            if(res.data.success)
            {
              //console.log(res.data.data);
              if($scope.start==0)
              $scope.start+=20;

              if($scope.prevSearch!=$scope.searchPostString)
              {
               // console.log("array cleared");
                
                $scope.messages=[];
              }
              $scope.prevSearch=$scope.searchPostString;

             $scope.messages=$scope.messages.concat(res.data.data); 
            }
            else
            {
                
            }

            
          }, function errorCallback(response) {
            console.log("err");
            
          });
      
  }

  $scope.sendMessage=sendMessage;
  $scope.getChannel();
}]);
