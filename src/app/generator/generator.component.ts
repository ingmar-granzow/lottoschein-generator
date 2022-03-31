import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LottoscheinService } from '../shared/services/lottoschein.service';
import { Lottoschein } from '../shared/models/lottoschein.interface';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  lottoschein: Lottoschein = { tippfelder: [] };
  lottoscheine: Lottoschein[] = [];

  generatorForm = new FormGroup({
    anzahl: new FormControl('', [ Validators.required, Validators.min(1), Validators.max(12) ]),
  });

  constructor(
    private lottoscheinService: LottoscheinService
  ) { }

  ngOnInit(): void {
    this.getLotteryTickets();
  }

  onSubmit() {
    let anzahl = this.generatorForm.value.anzahl;
    this.generate(anzahl);
    this.persist();
  }

  private getLotteryTickets() {
    this.lottoscheinService.getLotteryTickets().subscribe(
      (data: Lottoschein[]) =>
        (this.lottoscheine = data)
    );
  }

  private generate(amount: number) {
    this.lottoschein = { tippfelder: [] };

    for (let i = 0; i < amount; i++) {
      this.lottoschein.tippfelder[i] = {id: i+1, numbers: this.generateTippfeld()};
    }
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
      .subscribe(lottoschein => {
        this.lottoschein = lottoschein;
        this.lottoscheine.push(lottoschein);
      });
  }
}
