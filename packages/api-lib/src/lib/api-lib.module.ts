import { Module } from '@nestjs/common';
import { CombatsProvider } from './combats/providers/combats.provider';
import { SpeciesProvider } from './species/providers/species.provider';

@Module({
  providers: [CombatsProvider, SpeciesProvider],
  exports: [CombatsProvider, SpeciesProvider],
})
export class ApiLibModule {}
