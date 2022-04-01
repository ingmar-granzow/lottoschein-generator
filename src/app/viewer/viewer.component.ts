import { Component, Input } from '@angular/core';

import { Lottoschein } from '../shared/models/lottoschein.interface';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent {

  @Input() distribution: number[] = Array(49);
  @Input() lottoscheine: Lottoschein[] = [];

  lottoschein: Lottoschein = { tippfelder: [] };

  constructor() { }

  display(lottoschein: Lottoschein) {
     Object.assign(this.lottoschein, lottoschein);
  }

  back() {
    this.lottoschein.id = undefined;
  }
}
