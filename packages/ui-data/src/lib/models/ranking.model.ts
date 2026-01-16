import { ISpecies } from './species.model';

export interface IRanking extends ISpecies {
  wins: number;
  losses: number;
}
