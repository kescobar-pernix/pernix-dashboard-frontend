(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('NavController', NavController);

  /* @ngInject */
  function NavController($state, UserService, ngNotify) {
    var vm = this;
    vm.user = {};
    vm.visible = UserService.getPermissions();
    vm.getUser = getUser;
    vm.isActive = isActive;
    vm.logout = logout;
    vm.adminFunctions = adminFunctions;
    activate();
    getUser();

    function activate() {

    }

    function isActive(viewLocation) {
      return viewLocation === $state.current.name;
    }

    function getUser() {
      vm.user = UserService.getCurrentUser();
    }

    function logout() {
      UserService.clearCurrentUser();
      $state.go('login');
    }

    function adminFunctions() {
      if (UserService.getPermissions()) {
        $state.go('home.user');
      } else {
        ngNotify.set('Insufficient permissions', 'error');
      }
    }
  }
})();
