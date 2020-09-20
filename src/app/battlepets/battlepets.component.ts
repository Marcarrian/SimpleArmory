import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PetSummary } from '../companions/pets';
import { ApplicationService } from '../application/application.service';
import { WOWHEAD_URL } from '../shared/wowhead-url';
import { BattlepetService } from './battlepet.service';

@Component({
  selector: 'app-battlepets',
  templateUrl: './battlepets.component.html',
  styleUrls: ['./battlepets.component.scss'],
})
export class BattlepetsComponent {

  battlepetSummary$: Observable<PetSummary>;
  showLevel = true;

  constructor(private battlepetService: BattlepetService,
              public applicationService: ApplicationService,
              @Inject(WOWHEAD_URL) public wowheadUrl) {
    this.battlepetSummary$ = this.battlepetService.battlepetSummary$();
  }
}
