import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  constructor() {
  }

  public SettingsService($log, $routeParams) {
    var endpoint = 'https://armorystats.info/';

    return {
      'WowHeadUrl': 'wowhead.com',
      'apiEndPoint': endpoint,
      'anchorTarget': '_blank',  // in case we want this to be a setting for _self
      'debug': $routeParams['debug'] && $routeParams['debug'] === '1' ? true : false,
      'jsonFiles': {
        'pets': 'data/pets.json',
        'battlepets': 'data/battlepets.json',
        'mounts': 'data/mounts.json',
        'toys': 'data/toys.json',
        'achievements': 'data/achievements.json',
      },
      apiUrl: function (rp, site) {
        if (site === undefined) {
          site = '';
        }
        return endpoint + rp.region + '/' + rp.realm + '/' + rp.character + '/' + site;
      },
    };
  }
}