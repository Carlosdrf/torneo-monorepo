import { BaseModel } from './base.entity';

export interface ICombats extends BaseModel {
  id: string;
  winnerId: string,
  loserId: string,
}