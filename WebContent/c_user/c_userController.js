myApp.controller("c_userController", function($scope, $http, $rootScope, $location, $route)
{
	$scope.User={username:'', email:'', password:'', mobile:'', address:'', loginname:'', role:''}
	
	$scope.indexpage=false;
	$scope.CurrentUser;
	
	$scope.register = function()
	{
		console.log("register page");
		console.log("email" + $scope.User.email);
		console.log("password" + $scope.User.password);
		
		$http.post('http://localhost:8086/collaborationRestService/user/register', $scope.User)
		.then(function(response)
				{
					console.log("registered successfully");
					console.log(response.statusText);
					$location.path("/login");
				},
				function(response)
				{
					alert("Please Enter Valid Data")
				});
	}
	
	$scope.login = function()
	{
		$http.post('http://localhost:8086/collaborationRestService/user/validate', $scope.User)
		.then(function(response)
				{
					console.log("login function");
					$scope.User = response.data;
					$rootScope.CurrentUser = $scope.User;
					alert('Welcome, '+$rootScope.CurrentUser.username)
					$location.path("/home");
				},
				function(response)
				{
					alert('Invalid Credentials')
				});
	}
	
	$scope.logout = function()
	{
		console.log("Logging Out");
		alert("Logged Out Successfully")
		$location.path("/login");
		$rootScope.CurrentUser = undefined;
		$window.location.reload();
		
	}
});