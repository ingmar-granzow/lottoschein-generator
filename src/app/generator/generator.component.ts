import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LottoscheinComponent } from '../lottoschein/lottoschein.component';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  @ViewChild(LottoscheinComponent)
  private lottoscheinComponent!: LottoscheinComponent;

  generatorForm = new FormGroup({
    anzahl: new FormControl('', [ Validators.required, Validators.min(1), Validators.max(12) ]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    let anzahl = this.generatorForm.value.anzahl;
    this.lottoscheinComponent.generate(anzahl);
  }
}
