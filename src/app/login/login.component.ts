import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor() {
  }

  public ModalInstanceCtrl($scope, $modalInstance, BlizzardRealmService, $timeout): void {

    // initialize with select disabled and a loading text
    $scope.realms = [];
    $scope.selectedRealm = {};
    $scope.selectPlaceholder = 'Loading realm list...';

    // turn drop down off until servers come back
    $scope.isDisabled = true;

    // grouping for drop down
    $scope.regionGroupFn = realm => {
      if (realm.region.toLowerCase() === 'us') {
        return 'US';
      }
      else {
        return 'EU';
      }
    };

    BlizzardRealmService.getAllRealms().then(realms => {

      $scope.selectPlaceholder = 'Enter an realm...';
      $scope.isDisabled = false;
      if ($scope.realms.length === 1) {
        $scope.realms = [];
      }
      $scope.realms = realms;
      $scope.$broadcast('SetFocus');
    });

    $scope.ok = () => {
      $modalInstance.close({
        region: $scope.selectedRealm.selected.region,
        realm: $scope.selectedRealm.selected.slug,
        character: $scope.characterName.toLowerCase(), // Blizzard API doesn't place nice with chars like Ä at start of names
      });
    };
  }
}
