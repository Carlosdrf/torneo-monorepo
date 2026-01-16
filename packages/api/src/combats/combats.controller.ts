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
  CombatsProvider,
  CreateCombatDto,
  ICombats,
  ResponseData,
} from '@morning-value/api-lib';

@Controller('combats')
export class CombatsController {
  constructor(private readonly combatsService: CombatsProvider) {}

  /**
   *
   * @returns combats data
   */
  @Get()
  findAll(): ResponseData<ICombats[]> {
    const response = this.combatsService.findAll();
    if (!response.data) {
      throw new Error('there was an error');
    }
    return {
      data: response.data ?? [],
    };
  }

  /**
   *
   * @param id The combat identifier
   * @returns combat data
   */
  @Get()
  findOne(@Param('id') id: string): ResponseData<ICombats | null> {
    const response = this.combatsService.findOne(id);
    if (!!response.error) throw new Error(response.error);
    return response;
  }

  /**
   *
   * @param createDto creation input
   * @returns created resource
   */
  @Post()
  create(@Body() createDto: CreateCombatDto): ResponseData<ICombats> {
    const response = this.combatsService.create(createDto);
    if (!!response?.error) {
      throw new Error(response.error);
    }
    return response;
  }

  /**
   *
   * @param id the combat identifier to update
   * @param updateDto update input
   * @returns updated resource
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateCombatDto>,
  ): ResponseData<ICombats> {
    const response = this.combatsService.update(id, updateDto);
    if (!!response?.error) {
      throw new Error(response.error);
    }
    return response;
  }

  /**
   *
   * @param id The combat identifier
   * @returns removed resource
   */
  @Delete(':id')
  remove(@Param('id') id: string): ResponseData<ICombats> {
    const response = this.combatsService.remove(id);
    if (!!response.error) {
      throw new Error(response.error);
    }
    return response;
  }
}
