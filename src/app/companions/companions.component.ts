import { Component, Inject } from '@angular/core';
import { PetService } from './pet.service';
import { Observable } from 'rxjs';
import { PetSummary } from './pets';
import { ApplicationService } from '../application/application.service';
import { WOWHEAD_URL } from '../shared/wowhead-url';

@Component({
  selector: 'app-companions',
  templateUrl: './companions.component.html',
  styleUrls: ['./companions.component.scss'],
})
export class CompanionsComponent {

  companionPetSummary$: Observable<PetSummary>;

  constructor(private petService: PetService,
              public applicationService: ApplicationService,
              @Inject(WOWHEAD_URL) public wowheadUrl) {
    this.companionPetSummary$ = this.petService.companionpetSummary$();
  }
}
