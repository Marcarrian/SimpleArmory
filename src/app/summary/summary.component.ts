import { Component, ContentChild, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { WOWHEAD_URL } from '../shared/wowhead-url';
import { ApplicationService } from '../application/application.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  categories: any[];

  @Input()
  totalCollected: number;

  @Input()
  totalPossible: number;

  @ContentChild('subcategoryTemplate', {static: false})
  subcategoryTemplateRef: TemplateRef<any>;

  constructor(public applicationService: ApplicationService,
              @Inject(WOWHEAD_URL) public wowheadUrl) {
  }

  ngOnInit(): void {
  }

}
