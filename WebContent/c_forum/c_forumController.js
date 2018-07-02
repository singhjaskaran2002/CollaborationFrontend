myApp.controller("c_forumController", function($location, $http, $rootScope, $scope)
{
		$scope.forum = {forumid:'', email:'', forumtitle:'', forumcontent:'', forum_created_date:'', forumlikes:'', forumstatus:''}
		$scope.allForumData;
		
		$scope.addForum = function()
		{
			console.log("adding forum");
			$http.post('http://localhost:8086/collaborationRestService/forum/add', $scope.forum)	
			.then(function(response)
					{
						alert('added successfully')
						$location.path("/showForum");				
					});
		}
		
		function listForum()
		{
			$http.get('http://localhost:8086/collaborationRestService/forum/list')
			.then(function(response)
					{
						console.log("listing forum");
						$scope.allForumData = response.data;
					});
		}
		listForum();

		$scope.deleteForum = function(forumid)
		{
			console.log("deleting forum");
			$http.delete('http://localhost:8086/collaborationRestService/forum/delete/'+forumid)
			.then(function(response)
					{
						
						alert("Forum Deleted Successfully")
						$location.path("/showForum");
					});
		}
		
		$scope.inclike = function(forumid)
		{
			console.log("incrementing like of forum");
			$http.get('http://localhost:8086/collaborationRestService/forum/incLike/'+forumid)
			.then(function(response)
					{
						$location.path('/showForum');
					});
		}
		
		$scope.approveForum = function(forumid)
		{
			console.log("approving forum");
			$http.put('http://localhost:8086/collaborationRestService/forum/approve/'+forumid)
			.then(function(response)
					{
						console.log("forum approved");
						$location.path("/showForum");
					});
		}
		
		$scope.rejectForum = function(forumid)
		{
			console.log("approving forum");
			$http.put('http://localhost:8086/collaborationRestService/forum/reject/'+forumid)
			.then(function(response)
					{
						console.log("forum rejected");
						$location.path("/showForum");
					});
		}
});