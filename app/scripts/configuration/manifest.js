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
        views: { "a": {
                    "name" : "mock 1",
                    "view": "a",
                    "templateUrl": "views/_mock.html",
                    "controller": "MainCtrl",
                    "options": {
                        "width": "50%",
                        "className": "mock"
                    }
                },
                "b": {
                    "name" : "mock 2",
                    "view": "b",
                    "templateUrl": "views/_mock_1.html",
                    "controller": "MainCtrl",
                    "options": {
                        "width": "50%",
                        "className": "mock_2"
                    }
                },
                "c": {
                    "view": "c",
                    "name" : "mock 3",
                    "templateUrl": "views/_mock.html",
                    "controller": "MainCtrl"
                }
            }
    }
}};

angular.module('testApp').constant("MANIFEST", manifest);

angular.module('testApp').service("ManifestService", function($rootScope, $state, MANIFEST, runtimeStates){
    this.module = {};

    this.createAndInsert = function(index, params){
        var module = create(params);

        console.info("the module is ");
        console.info(module);
        runtimeStates.addState(module.name, module);
        insert(index, module);
        console.info($state.get("app.dashboard"));
    };

    var counter = 0;

    function create(params){
        var name = "newView_" + counter++;
        var module = {
                "name": name + counter,
                "view": name,
                "templateUrl": "views/_mock.html",
                "controller": "SecondCtrl",
                "options": {
                    "width": "50%",
                    "className": "mock"
                }
            };

        return module;
    };

    function insert(where, data){
        var currentState = getCurrentView(),
            temp = _.values(MANIFEST.states[currentState].views),
            views = {};

        temp.splice((where + 1),0,data);

        temp.forEach(function(v,i,a){
          views[v.view] = v;
        });

        MANIFEST.states[currentState].views = views;

        $rootScope.$broadcast("MANIFEST:UPDATE", currentState);

    }

    function getCurrentView(){
        return $state.current.name
    }
});