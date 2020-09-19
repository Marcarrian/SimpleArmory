import { Component, Inject } from '@angular/core';
import { ApplicationService } from '../application/application.service';
import { Observable } from 'rxjs';
import { MountsService } from './mounts.service';
import { MountSummary } from './mounts';
import { WOWHEAD_URL } from '../shared/wowhead-url';

@Component({
  selector: 'app-mounts',
  templateUrl: './mounts.component.html',
  styleUrls: ['./mounts.component.scss'],
})
export class MountsComponent {

  mountSummary$: Observable<MountSummary>;

  constructor(private mountsService: MountsService,
              public applicationService: ApplicationService,
              @Inject(WOWHEAD_URL) public wowheadUrl) {
    this.mountSummary$ = this.mountsService.mountSummary$();
  }
}

