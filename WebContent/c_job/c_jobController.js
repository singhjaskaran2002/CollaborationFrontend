myApp.controller("c_jobController", function($location, $scope, $rootScope, $http, $route)
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
					console.log("job delete succesfully");
					$route.reload();
				},
				function(response)
				{
					alert("Someone applied for this job")
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
				},
				function(response)
				{
					$rootScope.ismyjobApplications = undefined;
				});
	}
	jobApplicationList();
	
	function jobApplications()
	{
		console.log("Applied jobs displaying");
		$http.get('http://localhost:8086/collaborationRestService/job/appliedJobs')
		.then(function(response)
				{
					$rootScope.jobapplications = response.data;
				},
				function(response)
				{
					$rootScope.isalljobApplications = undefined;
				});
	}
	jobApplications();
	
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
	
	$scope.deletejobapplication = function(jobappid)
	{
		$http.delete('http://localhost:8086/collaborationRestService/application/delete/'+jobappid)
		.then(function(response)
				{
					$route.reload();
				});
	}
	
	$scope.approveApplication = function(jobappid)
	{
		$http.get('http://localhost:8086/collaborationRestService/job/approveApplication/'+jobappid)
		.then(function(response)
				{
					console.log("Approved");
					$route.reload();
				});
	}
	
	$scope.rejectApplication = function(jobappid)
	{
		$http.get('http://localhost:8086/collaborationRestService/job/rejectApplication/'+jobappid)
		.then(function(response)
				{
					console.log("Rejected");
					$route.reload();
				});
	}
	
	$scope.updatejob = function(jobid)
	{
		$http.put('http://localhost:8086/collaborationRestService/job/update/'+jobid)
		.then(function(response)
				{
					console.log("job closed succesfully");
					$route.reload();
				});	
	}
	
});