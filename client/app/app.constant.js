(function(angular, undefined) {
  angular.module("exploreAroundApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	]
})
.constant("baseURL", "http://localhost:9000/")
;
})(angular);