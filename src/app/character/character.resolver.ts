import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Character } from './character';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CharacterService } from './character.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterResolver implements Resolve<void> {

  constructor(private characterService: CharacterService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Promise<void> | void {
    const region = route.paramMap.get('region');
    const realm = route.paramMap.get('realm');
    const name = route.paramMap.get('character');
    const character: Character = {region, realm, name};
    this.characterService.characterChange(character);
  }
}
