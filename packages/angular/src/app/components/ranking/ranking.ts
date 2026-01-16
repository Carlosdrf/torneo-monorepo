import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NoDataFound } from '../../ui-components/no-data-found/no-data-found';
import { MatIcon } from '@angular/material/icon';
import { ICombats, IRanking, ISpecies } from 'packages/ui-data/src/lib/models';
import {
  CombatsService,
  SpeciesService,
} from 'packages/ui-data/src/lib/services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ranking',
  imports: [NoDataFound, MatIcon],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css',
})
export class Ranking implements OnInit {
  ranking: IRanking[] = [];

  private combats: ICombats[] = [];

  private species: ISpecies[] = [];

  private speciesService = inject(SpeciesService);

  private combatsService = inject(CombatsService);

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    forkJoin({
      species: this.speciesService.list(),
      combats: this.combatsService.list(),
    }).subscribe({
      next: ({ species, combats }) => {
        this.species = species.data;
        this.combats = combats.data;
        console.log(species);
        console.log(combats);
        this.generateRanking();
        this.cdr.detectChanges();
      },
    });
  }

  generateRanking() {
    const map = new Map<string, IRanking>();

    this.species.forEach((s) => {
      map.set(s.id.toString(), {
        ...s,
        wins: 0,
        losses: 0,
      });
    });

    this.combats.forEach((c) => {
      const winner = map.get(c.winnerId.toString());
      const loser = map.get(c.loserId.toString());

      if (winner) winner.wins += 1;
      if (loser) loser.losses += 1;
    });

    this.ranking = Array.from(map.values()).sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;

      if (b.level !== a.level) {
        return b.level - a.level;
      }

      return a.name.localeCompare(b.name);
    });
  }
}
