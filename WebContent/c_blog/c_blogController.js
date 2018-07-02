myApp.controller("c_blogController", function($scope, $http, $rootScope, $location, $route)
{
	$scope.blog = {blogid:'', blogtitle:'', blogcontent:'', user_created:'', blogremarks:'', blogstatus:'', bloglikes:'', blogcreatedDate:''}
	$scope.allBlogData;
	
	$scope.addBlog = function()
	{
		console.log("This is add Blog Function");		
		$http.post('http://localhost:8086/collaborationRestService/blog/add', $scope.blog)
		.then(function(response)
				{
					console.log("Addded Successfully");
					$location.path("/myBlog");					
				});
	}
	
	$scope.deleteblog = function(blogid)
	{
		console.log("deleting blog");		
		$http.delete('http://localhost:8086/collaborationRestService/blog/delete/'+blogid)
		.then(function(response)
				{
					console.log("Blog Deleted");
					$route.reload();
				});
	}
	
	function ShowBlog()
	{
		console.log('Blog displaying');
		$http.get('http://localhost:8086/collaborationRestService/blog/list')
		.then(function(response)
		{
			$scope.allBlogData = response.data;
		});
	}
	ShowBlog();
	
	$scope.approveblog = function(blogid)
	{
		console.log('approving blog');
		$http.get('http://localhost:8086/collaborationRestService/blog/approve/'+blogid)
		.then(function(response)
				{

					console.log("blog approved");
					$route.reload();
				});
	}
	
	$scope.rejectblog = function(blogid)
	{
		console.log('rejecting blog');
		$http.get('http://localhost:8086/collaborationRestService/blog/reject/'+blogid)
		.then(function(response)
				{
					console.log("blog rejected");
					$route.reload();
					
				});
	}
	
	$scope.incLike = function(blogid)
	{
		console.log("incrementing likes");
		$http.get('http://localhost:8086/collaborationRestService/blog/incLike/'+blogid)
		.then(function(response)
				{
					$route.reload();
					$scope.isBlogDisabled = true;
					console.log($scope.isBlogDisabled);
				});
		
	}
});