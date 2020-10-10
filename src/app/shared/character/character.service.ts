import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Character } from './character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {

  private _character$ = new ReplaySubject<Character>(1);

  constructor() {
  }

  public characterChange(character: Character): void {
    this._character$.next(character);
  }

  public get character$(): Observable<Character> {
    return this._character$.asObservable();
  }
}
