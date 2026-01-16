import { BaseModel } from './base.entity';

export interface ISpecies extends BaseModel {
  id: string;
  name: string;
  level: number;
  skill: string;
}