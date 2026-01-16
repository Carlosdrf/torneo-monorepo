import { Module } from '@nestjs/common';
import { SpeciesController } from '../species/species.controller';
import { CombatsController } from '../combats/combats.controller';
import { ApiLibModule } from '@morning-value/api-lib';

@Module({
  imports: [ApiLibModule],
  controllers: [SpeciesController, CombatsController],
  providers: [],
})
export class AppModule {}
