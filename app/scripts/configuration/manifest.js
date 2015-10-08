var manifest = {states: {
    "app": {
        abstract: true,
        name: "app",
        templateUrl: "views/main.html",
        controller: "MainCtrl",
    },
    "app.dashboard": {
        url: "/",
        name: "app.dashboard",
        data : {
            includes: [{
                    "name" : "mock 1",
                    "templateUrl": "views/_mock.html",
                    "options": {
                        "width": "50%",
                        "className": "mock"
                    }},
                    {"name" : "mock 2",
                    "templateUrl": "views/_mock_1.html",
                    "options": {
                        "width": "50%",
                        "className": "mock_2"
                    }},
                    {"name" : "mock 3",
                     "templateUrl": "views/_mock.html"}
                ]
            }
        }
    }
};

angular.module('testApp').constant("MANIFEST", manifest);

angular.module('testApp').service("ManifestService", function($rootScope, $state, MANIFEST){
    this.module = {};

    this.createAndInsert = function(index, params){
        var module = create(params);
        insert(index, module);
    };

    var counter = 0;

    function create(params){
        var name = "newView_" + counter++;
        var module = {
                "name": name,
                "templateUrl": "views/_mock.html",
                "options": {
                    "width": "50%",
                    "className": "mock"
                }
            };

        return module;
    };

    function insert(where, data){
        var currentState = getCurrentView(),
            includes = _.values(MANIFEST.states[currentState].data.includes);

        includes.splice((where + 1),0,data);

        MANIFEST.states[currentState].data.includes = includes;

        $rootScope.$broadcast("MANIFEST:UPDATE", currentState);

    }

    function getCurrentView(){
        return $state.current.name
    }
});