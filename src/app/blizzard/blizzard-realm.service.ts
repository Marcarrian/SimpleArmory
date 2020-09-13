import { Injectable } from '@angular/core';
import EuServers from '../../assets/data/servers.eu.json';
import UsServers from '../../assets/data/servers.us.json';
import { Realm } from './realm';

@Injectable({
  providedIn: 'root',
})
export class BlizzardRealmService {

  constructor() {
  }

  euRealms(): Realm[] {
    return EuServers.realms.map(realm => ({...realm, region: 'eu'}));
  }

  usRealms(): Realm[] {
    return UsServers.realms.map(realm => ({...realm, region: 'us'}));
  }
}
