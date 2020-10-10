import { Component, ContentChild, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { WOWHEAD_URL } from '../../wowhead-url';
import { ApplicationService } from '../../../application/application.service';
import { Category } from '../../model/category';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  categories: Category[];

  @ContentChild('subcategoryTemplate', {static: false})
  subcategoryTemplateRef: TemplateRef<any>;

  @ContentChild('barTemplate', {static: false})
  barTemplateRef: TemplateRef<any>;

  constructor(public applicationService: ApplicationService,
              @Inject(WOWHEAD_URL) public wowheadUrl) {
  }

  ngOnInit(): void {
  }

}
