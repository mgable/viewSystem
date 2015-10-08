angular.module('testApp').directive("views", function(){
    return {
        restrict: "E",
        templateUrl: "views/directives/views.html",
        replace: true,
        controller: function ($scope, $element, $attrs, MANIFEST, $mdDialog, ManifestService){
            $attrs.$observe("state", function(state){
                $scope.modules = _.values(MANIFEST.states[state].data.includes);
                console.info(state);
            });

            $scope.$on("MANIFEST:UPDATE", function(evt, state){
                $scope.modules = _.values(MANIFEST.states[state].data.includes);
                console.info($scope.modules);
            });

            $scope.sortableOptions = {
               handle: '.handle'
            };

            $scope.addModule = function(evt){
                var i = Array.prototype.indexOf.call(evt.currentTarget.children, evt.target);
                if (evt.shiftKey && i > -1){
                    //showAlert(evt);
                    //showAdvanced(evt);
                    showConfirm(evt).then(
                        function(data){
                           ManifestService.createAndInsert(i);
                        },
                        function(data){console.info("cancel");
                    });
                }
            }

            function showConfirm (ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                      .title('Would you like to add a module?')
                      .content('')
                      .ariaLabel('add module')
                      .targetEvent(ev)
                      .ok('Add')
                      .cancel('Cancel');

                return $mdDialog.show(confirm);
            };


            // function showAlert(ev) {
            //     $mdDialog.show(
            //       $mdDialog.alert()
            //         .parent(angular.element(document.body))
            //         .clickOutsideToClose(true)
            //         .title('This is an alert title')
            //         .content('You can specify some description text in here.')
            //         .ariaLabel('Alert Dialog Demo')
            //         .ok('Got it!')
            //         .targetEvent(ev)
            //     );
            // };

            // function showAdvanced (ev) {
            //     $mdDialog.show({
            //       controller: DialogController,
            //       templateUrl: 'views/directives/addModule.js',
            //       parent: angular.element(document.body),
            //       targetEvent: ev,
            //       clickOutsideToClose:true
            //     })
            //     .then(function(answer) {
            //       $scope.status = 'You said the information was "' + answer + '".';
            //     }, function() {
            //       $scope.status = 'You cancelled the dialog.';
            //     });
            // };


        }
    };
});