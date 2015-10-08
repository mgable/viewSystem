angular.module('consoleApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/_mock.html',
    "this is {{module.name}}<br/>{{module}}\n" +
    "Hey there!"
  );


  $templateCache.put('views/_mock_1.html',
    "<md-input-container>\n" +
    "\t<label>Enter your name:</label>\n" +
    "\t<input ng-model=\"username\" type=\"text\">\n" +
    "</md-input-container>"
  );


  $templateCache.put('views/directives/views.html',
    "<ul class='viewsHolder' ui-sortable=\"sortableOptions\" ng-model=\"modules\" ng-click=\"addModule($event)\">\n" +
    "\t<li class='viewHolder' ng-repeat='module in modules' ng-style=\"{'width': module.options.width}\">\n" +
    "\t\t<div class=\"module\" ng-class=\"module.options.className\">\n" +
    "\t\t\t<div class=\"handle\"></div>\n" +
    "\t\t\t<md-content md-theme=\"docs-dark\" layout-padding layout=\"row\">\n" +
    "\t\t\t\t<ui-view name='{{module.view}}'/>\n" +
    "\t\t\t</md-content>\n" +
    "\t\t</div>\n" +
    "\t</li>\n" +
    "</ul>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"header\">\n" +
    "\t<h1>Header</h1>\n" +
    "</div>\n" +
    "\n" +
    "<views state=\"{{currentState}}\"></views>\n" +
    "\n" +
    "<div class=\"footer\"><h6>Footer</h6></div>"
  );

}]);
