import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LottoscheinService } from '../shared/services/lottoschein.service';
import { Lottoschein } from '../shared/models/lottoschein.interface';
import { Distribution } from '../shared/models/distribution.interface';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  lottoschein: Lottoschein = { tippfelder: [] };
  lottoscheine: Lottoschein[] = [];

  distribution: number[] = Array(49);

  generatorForm = new FormGroup({
    anzahl: new FormControl('', [ Validators.required, Validators.min(1), Validators.max(12) ]),
    superzahl: new FormControl(''),
  });

  constructor(
    private lottoscheinService: LottoscheinService
  ) { }

  ngOnInit(): void {
    this.getLotteryTickets();
    this.getDistribution();
  }

  onSubmit() {
    let anzahl = this.generatorForm.value.anzahl;
    let superzahl: boolean = this.generatorForm.value.superzahl;

    this.generate(anzahl, superzahl);
    this.persistLottoschein();
    this.updateDistribution();
    this.saveDistribution();
  }

  private getLotteryTickets() {
    this.lottoscheinService.getLotteryTickets().subscribe(
      (data: Lottoschein[]) =>
        (this.lottoscheine = data)
    );
  }

  private generate(amount: number, superzahl: boolean) {
    this.lottoschein = { tippfelder: [] };

    for (let i = 0; i < amount; i++) {
      this.lottoschein.tippfelder[i] = {id: i+1, numbers: this.generateTippfeld()};
    }

    if (superzahl) {
      this.lottoschein.superzahl = this.drawNumber(10);
    }
  }

  private generateTippfeld() {
    let numbers: number[] = [];
    let num: number;

    for (let i = 0; i < 6; i++) {
      num = this.drawNumber(49) + 1;
      while (numbers.includes(num)) {
        num = this.drawNumber(49) + 1;
      }
      numbers.push(num);
    }

    return numbers;
  }

  private drawNumber(max: number) {
    return Math.floor(Math.random() * max);
  }


  private persistLottoschein() {
    this.lottoscheinService
      .save(this.lottoschein)
      .subscribe(lottoschein => {
        this.lottoschein = lottoschein;
        this.lottoscheine.push(lottoschein);
      });
  }

  private getDistribution() {
    this.lottoscheinService.getDistribution().subscribe(
      (data: Distribution) =>
        (this.distribution = data.values)
    );
  }

  private saveDistribution() {
    this.lottoscheinService
      .saveDistribution({id: 1, values: this.distribution})
      .subscribe();
  }

  private updateDistribution() {
    for (let tippfeld of this.lottoschein.tippfelder) {
      for (let num of tippfeld.numbers) {
        this.distribution[num-1]++;
      }
    }
  }
}
