import { Component, Input } from '@angular/core';

import { Lottoschein } from '../shared/models/lottoschein.interface';

@Component({
  selector: 'app-lottoschein',
  templateUrl: './lottoschein.component.html',
  styleUrls: ['./lottoschein.component.scss']
})
export class LottoscheinComponent {

  @Input() lottoschein: Lottoschein = { tippfelder: [] };

  numberRange = new Array(49);

  constructor() { }
}
