import { Component, Inject } from '@angular/core';
import { ApplicationService } from '../../application/application.service';
import { Observable } from 'rxjs';
import { WOWHEAD_URL } from '../../shared/wowhead-url';
import { MountSummary } from './mount.model';
import { MountService } from './mount.service';

@Component({
  selector: 'app-mount',
  templateUrl: './mount.component.html',
  styleUrls: ['./mount.component.scss'],
})
export class MountComponent {

  mountSummary$: Observable<MountSummary>;

  constructor(private mountsService: MountService,
              public applicationService: ApplicationService,
              @Inject(WOWHEAD_URL) public wowheadUrl) {
    this.mountSummary$ = this.mountsService.mountSummary$();
  }
}

