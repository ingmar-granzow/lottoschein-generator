import { Component, Input } from '@angular/core';

import { Lottoschein } from '../shared/models/lottoschein.interface';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent {

  @Input() lottoscheine: Lottoschein[] = [];

  constructor() { }
}
