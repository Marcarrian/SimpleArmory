import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
})
// TODO
// animations
// round corners on right side when 100%
export class ProgressbarComponent implements OnInit, OnChanges {

  @Input()
  completed: number;

  @Input()
  total: number;

  percentage: number;
  minimumBarWidthPercentage = 18;
  barWidthPercentage = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  public ngOnChanges(): void { // TODO navigating the same url doesn't destroy the component and thus not initialize it again
    if (this.completed > this.total) {
      throw new Error(`completed amount ${this.completed} cannot be larger than total amount ${this.total}.`);
    }

    this.percentage = Math.trunc(this.completed / this.total * 100);
    if (this.percentage >= this.minimumBarWidthPercentage) {
      this.barWidthPercentage = this.percentage;
    }
    else {
      this.barWidthPercentage = this.minimumBarWidthPercentage;
    }
  }
}
