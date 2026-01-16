import { Injectable } from '@nestjs/common';
import { ResponseData, ICombats } from 'packages/api-lib/src/models';
import { v7 as uuid } from 'uuid';
import { CreateCombatDto } from '../dto/create-combats.dto';

@Injectable()
export class CombatsProvider {
  private data = new Map<string, ICombats>();

  /**
   *
   * @returns list combats
   */
  findAll(): ResponseData<ICombats[]> {
    return {
      data: Array.from(this.data.values()),
    };
  }

  /**
   *
   * @param id combats identifier
   * @returns specified combats
   */
  findOne(id: string): ResponseData<ICombats | null> {
    return {
      data: this.data.get(id) ?? null,
    };
  }

  /**
   *
   * @param input create input
   * @returns created combats
   */
  create(input: CreateCombatDto): ResponseData<ICombats> {
    const combats: ICombats = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: uuid(),
    };
    this.data.set(combats.id, combats);
    const response = this.data.get(combats.id);
    if (!response) throw new Error('error while creating element');
    return {
      data: response,
    };
  }

  /**
   *
   * @param id combats identifier
   * @param input update data
   * @returns updated combats
   */
  update(id: string, input: Partial<CreateCombatDto>): ResponseData<ICombats> {
    return {
      data: undefined,
      error: 'You are not allowed to edit a combat result',
    };
  }

  /**
   *
   * @param id combats id
   * @returns removed combats
   */
  remove(id: string): ResponseData<ICombats> {
    return {
      data: undefined,
      error: 'You cannot remove a combat result',
    };
  }

  /**
   * 
   * @param speciesId species identifier
   * @returns species combats
   */
  findbySpecies(speciesId: string) {
    return Array.from(this.data.values()).some(
      c => c.winnerId === speciesId || c.loserId === speciesId
    );
  }
}
