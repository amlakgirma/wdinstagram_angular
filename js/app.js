"use strict";
(function(){

var  instdata = [
  {id: 1, photo_url:"1 ", author: "amlak", body: "one"},
  {id: 2, photo_url:"2 ", author: "andres", body: " two"},
  {id: 3, photo_url:"3 ", author: "omar", body: " three"},
  {id: 4, photo_url:"4 ", author: "mim", body: " four"},
  {id: 5, photo_url:"5 ", author: "tush", body: "five "},
  {id: 6, photo_url:" 6", author: "nunu", body: "six "}
]
angular
    .module("instaApp", ["ui.router", "ngResource"])
    .config(["$stateProvider", RouterFunction])
    .factory("EntryFactory", ["$resource", EntryFactoryFunction])
    .controller("entriesIndexController", ["EntryFactory", entriesIndexControllerFunction])
    .controller("entryShowController", ["EntryFactory", "$stateParams", entryShowControllerFunction])

    function RouterFunction($stateProvider) {
      $stateProvider
        .state("index", {
          url: "/entries",
          templateUrl: "js/ng-views/index.html",
          controller: "entriesIndexController",
          controllerAs: "vm"
        })
        .state("show", {
          url: "/entries/:id",
          templateUrl: "js/ng-views/show.html",
          controller: "entryShowController",
          controllerAs: "vm"
        })
    }

    function EntryFactoryFunction($resource) {
      return $resource("http://localhost:3000/entries/:id");
    }

    function entriesIndexControllerFunction(EntryFactory) {
      this.entries = EntryFactory.query();
    }

    function entryShowControllerFunction(EntryFactory, $stateParams) {
      this.entry = EntryFactory.get({id: $stateParams.id})
    }
})();
