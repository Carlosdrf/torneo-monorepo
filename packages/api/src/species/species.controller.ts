import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ResponseData,
  SpeciesProvider,
  CreateSpeciesDto,
} from '@morning-value/api-lib';

interface ISpecies {
  name: string;
  level: number;
  skill: string;
}

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesProvider) {}

  @Get()
  findAll(): ResponseData<ISpecies[]> {
    const response = this.speciesService.findAll();
    if (!response.data) {
      throw new Error('there was an error');
    }
    return {
      data: response.data ?? [],
    };
  }

  @Get()
  findOne(@Param('id') id: string): ResponseData<ISpecies | null> {
    const response = this.speciesService.findOne(id);
    if (!!response.error) throw new Error(response.error);
    return response;
  }

  @Post()
  create(@Body() createDto: CreateSpeciesDto): ResponseData<ISpecies> {
    const response = this.speciesService.create(createDto);
    if (!!response?.error) {
      throw new Error(response.error);
    }
    return response;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateSpeciesDto>,
  ): ResponseData<ISpecies> {
    const response = this.speciesService.update(id, updateDto);
    if (!!response?.error) {
      throw new Error(response.error);
    }
    return response;
  }

  @Delete(':id')
  remove(@Param('id') id: string): ResponseData<ISpecies> {
    const response = this.speciesService.remove(id);
    if (!!response.error) {
      throw new Error(response.error);
    }
    return response;
  }
}
