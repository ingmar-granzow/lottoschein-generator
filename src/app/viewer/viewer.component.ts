import { Component, OnInit } from '@angular/core';

import { LottoscheinService } from '../shared/services/lottoschein.service';
import { Lottoschein } from '../shared/models/lottoschein.interface';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  lottoscheine: Lottoschein[] = [];

  constructor(
    private lottoscheinService: LottoscheinService
  ) { }

  ngOnInit(): void {
    this.getLotteryTickets();
  }

  getLotteryTickets() {
    this.lottoscheinService.getLotteryTickets().subscribe(
      (data: Lottoschein[]) =>
        (this.lottoscheine = data)
    );
  }
}
