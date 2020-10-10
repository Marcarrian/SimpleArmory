import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PetSummary } from '../companion/pets';
import { ApplicationService } from '../../application/application.service';
import { WOWHEAD_URL } from '../../shared/wowhead-url';
import { BattlepetService } from './battlepet.service';

@Component({
  selector: 'app-battlepet',
  templateUrl: './battlepet.component.html',
  styleUrls: ['./battlepet.component.scss'],
})
export class BattlepetComponent {

  battlepetSummary$: Observable<PetSummary>;
  showLevel = true;

  constructor(private battlepetService: BattlepetService,
              public applicationService: ApplicationService,
              @Inject(WOWHEAD_URL) public wowheadUrl) {
    this.battlepetSummary$ = this.battlepetService.battlepetSummary$();
  }
}
