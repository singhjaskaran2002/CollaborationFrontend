myApp.controller("c_jobController", function($location, $scope, $rootScope, $http)
{
	$scope.Job = {jobid:' ', jobtitle:' ', jobdescription:' ', jobsalary:' ', jobqualification:' ', jobstatus:' ', no_of_openings:' ', job_posted_date:' '}
	
	$scope.JobApplication = {jobappid:' ', email:' ', jobid:' ', jobappstatus:' ', applied_date:' ', reason:' ', jobtitle:' ', jobdescription:' '}
	
	$scope.joblist;
	$scope.jobdata;
	
	function jobList()
	{
		console.log('jobs displaying');
		$http.get('http://localhost:8086/collaborationRestService/job/list')
		.then(function(response)
				{
					$scope.joblist = response.data;
					$rootScope.jobs = $scope.joblist;
				});
	}
	jobList();
	
	
	$scope.deletejob = function(jobid)
	{
		$http.delete('http://localhost:8086/collaborationRestService/job/delete/'+jobid)
		.then(function(response)
				{
					alert("job delete succesfully");
					$location.path("/showjobs");
				});				
	}
	
	
	$scope.postjob = function()
	{
		$http.post('http://localhost:8086/collaborationRestService/job/post', $scope.Job)
		.then(function(response)
				{
					alert('job posted successfully')
					$location.path("/showjobs");
				});
	}
	
	function jobApplicationList()
	{
		console.log("Applied jobs displaying");
		$http.get('http://localhost:8086/collaborationRestService/user/appliedJobs')
		.then(function(response)
				{
					$rootScope.myjobs = response.data;
				});
	}
	jobApplicationList();
	
	$scope.applyjobClicked = function(jobid)
	{
		$http.get('http://localhost:8086/collaborationRestService/job/get/'+jobid)
		.then(function(response)
				{
					$rootScope.jobidforapplication = jobid;
					$rootScope.jobdata = response.data;
					$location.path("/applyjob");
				});
	}
	
	$scope.applyjob = function()
	{
		$http.post('http://localhost:8086/collaborationRestService/job/registration', $scope.JobApplication)
		.then(function(response)
				{
					alert('Registered for Job Successfully')
					$location.path("/appliedjobs");
				},
				function(response)
				{
					alert('Already Applied for this job')
					$location.path("/showjobs");
				});
	}
	
});