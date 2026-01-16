import { ConflictException, Injectable } from '@nestjs/common';
import { ISpecies, ResponseData } from 'packages/api-lib/src/models';
import { v7 as uuid } from 'uuid';
import { CreateSpeciesDto } from '../dto/create-species.dto';
import { CombatsProvider } from '../../combats';

@Injectable()
export class SpeciesProvider {
  constructor(private readonly combatsService: CombatsProvider) {}
  private data = new Map<string, ISpecies>();

  /**
   *
   * @returns list species
   */
  findAll(): ResponseData<ISpecies[]> {
    return {
      data: Array.from(this.data.values()),
    };
  }

  /**
   *
   * @param id species identifier
   * @returns specified species
   */
  findOne(id: string): ResponseData<ISpecies | null> {
    return {
      data: this.data.get(id) ?? null,
    };
  }

  /**
   *
   * @param input create input
   * @returns created species
   */
  create(input: CreateSpeciesDto): ResponseData<ISpecies> {
    const species: ISpecies = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: uuid(),
    };
    this.data.set(species.id, species);
    const response = this.data.get(species.id);
    if (!response) throw new Error('error while creating element');
    return {
      data: response,
    };
  }

  /**
   *
   * @param id species identifier
   * @param input update data
   * @returns updated species
   */
  update(id: string, input: Partial<CreateSpeciesDto>): ResponseData<ISpecies> {
    let species = this.data.get(id);
    if (!species) {
      throw new Error('could not find specified species');
    }

    const list = Array.from(this.data.values());
    if (input.name) {
      const nameExists = list.some(
        (s) =>
          s.id !== id && s.name.toLowerCase() === input.name?.toLowerCase(),
      );

      if (nameExists) throw new ConflictException('Species name exists');
    }

    species = {
      ...species,
      ...input,
    };

    this.data.set(id, species);

    return {
      data: species,
    };
  }

  /**
   *
   * @param id species id
   * @returns removed species
   */
  remove(id: string): ResponseData<ISpecies> {
    const species = this.data.get(id);

    if (!species) throw new Error('Could not find specified species');
    const xd = this.combatsService.findbySpecies(id);
    console.log(xd);

    this.data.delete(id);
    return {
      data: species,
    };
  }
}
