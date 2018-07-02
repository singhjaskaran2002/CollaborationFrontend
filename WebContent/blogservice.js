myApp.service('blogService', function($http)
{
	var blogservice = {};
	var base_url = "http://localhost:8086/collaborationFrontend";
	
	blogservice.getBlogs=function(){
		return $http.get(base_url+"/blog/list")
	}
	return blogservice;
});