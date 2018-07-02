myApp.controller("HomeController", function($scope, $rootScope, $location, $http, $route)
{
	$scope.blog = {blogid:'', blogtitle:'', blogcontent:'', user_created:'', blogremarks:'', blogstatus:'', bloglikes:'', blogcreatedDate:''}
	$scope.Job = {jobid:' ', jobtitle:' ', jobdescription:' ', jobsalary:' ', jobqualification:' ', jobstatus:' ', no_of_openings:' ', job_posted_date:' '}
	
	$scope.homejobs;
	$scope.homeblogs;
	
	function getBlogs()
	{
		console.log('blogs displaying at home');
		$http.get('http://localhost:8086/collaborationRestService/blog/list')
		.then(function(response)
				{
					$scope.homeblogs = response.data;
				});
	}
	getBlogs();
	
	function getJobs()
	{
		console.log('jobs displaying at home');
		$http.get('http://localhost:8086/collaborationRestService/job/list')
		.then(function(response)
				{
					$scope.homejobs = response.data;
				});
	}
	getJobs();

});