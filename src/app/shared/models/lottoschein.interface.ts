import { Tippfeld } from './tippfeld.interface';

export interface Lottoschein {
  id?: number;
  tippfelder: Tippfeld[];
}
