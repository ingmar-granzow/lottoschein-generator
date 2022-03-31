import { Component, OnInit } from '@angular/core';

import { LottoscheinService } from '../shared/services/lottoschein.service';
import { Lottoschein } from '../shared/models/lottoschein.interface';

@Component({
  selector: 'app-lottoschein',
  templateUrl: './lottoschein.component.html',
  styleUrls: ['./lottoschein.component.scss']
})
export class LottoscheinComponent implements OnInit {
  lottoschein: Lottoschein = { tippfelder: [] };

  numberRange = new Array(49);

  constructor(
    private lottoscheinService: LottoscheinService
  ) { }

  ngOnInit(): void {
  }

  generate(amount: number) {
    this.lottoschein = { tippfelder: [] };

    for (let i = 0; i < amount; i++) {
      this.lottoschein.tippfelder[i] = {id: i+1, numbers: this.generateTippfeld()};
    }

    this.persist();
  }

  private generateTippfeld() {
    let numbers = [];

    for (let i = 0; i < 6; i++) {
      numbers.push(this.drawNumber());
    }

    return numbers;
  }

  private drawNumber() {
    return Math.floor(Math.random() * 50);
  }

  private persist() {
    this.lottoscheinService
      .save(this.lottoschein)
      .subscribe(lottoschein => this.lottoschein = lottoschein);
  }

}
