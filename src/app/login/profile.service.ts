import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from './character';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  readonly endpoint = 'https://armorystats.info/';

  constructor(private settingsService: SettingsService,
              private httpClient: HttpClient) {
  }

  getProfileMedia$(region: string, realm: string, character: string): Observable<any> {
    const url = this.endpoint + region + '/' + realm + '/' + character + '/character-media';
    return this.httpClient.get(url);
  }

  getProfile$(character: Character): Observable<Profile> {
    const url = this.endpoint + character.region + '/' + character.realm + '/' + character.name + '/';
    return this.httpClient.get<Profile>(url);
  }

// getProfile($routeParams) {
//   // don't fetch if we've already got it
//   var sameUser = this.checkIfSameUser($routeParams.region, $routeParams.pRegion, $routeParams.realm, $routeParams.character);
//   if (sameUser && profileCached) {
//     return $q.when(profileCached);
//   }
//
//   // notify others to clear their caches
//   if (!sameUser) {
//     for (var i = 0; i < callbacks.length; i++) {
//       callbacks[i]('logged in');
//     }
//   }
//
//   $log.log('Fetching ' + $routeParams.character + ' from server ' + $routeParams.realm + '...');
//
//   return $http.get(
//     SettingsService.apiUrl($routeParams),
//     {cache: true})
//     .error(getProfileError)
//     .then(getProfileComplete);
//
//   function getProfileError() {
//     $log.error('Trouble fetching character from battlenet');
//
//     // let's figure out what the errors are
//     $window.ga('send', 'event', 'LoginError', $routeParams.region + ':' + $routeParams.realm + ':' + $routeParams.character);
//
//     $location.url('error/' + $routeParams.realm + '/' + $routeParams.character);
//   }
// }

// public getProfileComplete(data) {
//   // lets figure out who uses the site
//   $window.ga('send', 'event', 'Login', $routeParams.region + ':' + $routeParams.realm + ':' + $routeParams.character);
//
//   profileCached = data.data;
//
//   // add region and faction to character
//   profileCached.region = $routeParams.region;
//   profileCached.realm = $routeParams.realm;
//   profileCached.faction = [
//     '',
//     'A',  // Human
//     'H',  // Orc
//     'A',  // Dwarf
//     'A',  // Night Elf
//     'H',  // Undead
//     'H',  // Tauren
//     'A',  // Gnome
//     'H',  // Troll
//     'H',  // Goblin
//     'H',  // Blood Elf
//     'A',  // Draenei
//     '', '', '', '', '', '', '', '', '', '',
//     'A',  // Worgen
//     '',
//     '',
//     'A',  // Pandaren Alliance
//     'H',  // Pandaren Horde
//     'H',  // Nightborne
//     'H',  // Highmountain Tauren
//     'A',  // Void Elf
//     'A',  // Lightforged Draenei
//     'H',  // Zandalari Troll
//     'A',  // Kul Tiran
//     '',
//     'A',  // Dark Iron Dwarf
//     'H',  // Vulpera
//     'H',  // Mag'har Orc
//     'A',  // Mechagnome
//   ][profileCached.race.id];
//
//   pRegion = $routeParams.region;
//   pRealm = $routeParams.realm;
//   pCharacter = $routeParams.character;
//
//   return profileCached;
// }

  private checkIfSameUser(region, pRegion, realm, pRealm, character, pCharacter): boolean {
    if ((region && pRegion && region.toLowerCase() === pRegion.toLowerCase()) &&
      (realm && pRealm && realm.toLowerCase() === pRealm.toLowerCase()) &&
      (character && pCharacter && character.toLowerCase() === pCharacter.toLowerCase())) {
      return true;
    }
    return false;
  }
}

export interface Profile {
  achievement_points: number;
  faction: Faction;
  race: string;
  class: string;
}

export interface Faction {
  name: any;
  type: 'HORDE' | 'ALLIANCE';
}
