import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
})
// TODO
// animations
// round corners on right side when 100%
export class ProgressbarComponent implements OnInit {

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
    if (this.completed > this.total) {
      throw new Error(`completed amount ${this.completed} cannot be larger than total amount ${this.total}.`);
    }

    if (this.completed === undefined) {
      this.barWidthPercentage = 100;
      return;
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
