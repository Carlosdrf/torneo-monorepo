import { Module } from '@nestjs/common';
import { ApiLibModule } from '@morning-value/api-lib';
import { SpeciesController } from './species';
import { CombatsController } from './combats';

@Module({
  imports: [ApiLibModule],
  controllers: [SpeciesController, CombatsController],
  providers: [],
})
export class AppModule {}
