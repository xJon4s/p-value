import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jStat from 'jstat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pvalue';
  h0!: number;
  actual!: number;
  n!: number;
  onesided!: boolean;

  constructor() { 
    this.h0 = 0.5;
    this.actual = 0.6;
    this.n = 100;
    this.onesided = true;
  }

  calculate() {
    let pValue = 0;
    if (this.onesided) {
      pValue = this.calculateOneSidedPValue();
    } else {
      pValue = this.calculateTwoSidedPValue();
    }
    console.log(pValue);
  }

  calculateOneSidedPValue() {
    console.log("calculating one sided p value");
    let pValue = 0;
    if (this.h0 < this.actual) {
      pValue = this.calculateUpperTailPValue();
    } else {
      pValue = this.calculateLowerTailPValue();
    }
    return pValue;
  }

  calculateUpperTailPValue() {
    return jStat.studentt.cdf(this.getZValue(), this.n - 1);
  }

  calculateLowerTailPValue() {
    console.log("calculating lower tail p value");
    return 1 - jStat.studentt.cdf(this.getZValue(), this.n - 1);
  }

  calculateTwoSidedPValue() {
    return 2 * Math.min(this.calculateLowerTailPValue(), this.calculateUpperTailPValue());
  }

  getZValue():number {
    var ret = (this.actual - this.h0) / Math.sqrt((this.h0 * (1 - this.h0)) / this.n);
    return ret;
  }

}
