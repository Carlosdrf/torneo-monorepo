import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { NoDataFound } from '../../ui-components/no-data-found/no-data-found';
import { Button } from '../../ui-components/button/button';
import { MatIcon } from '@angular/material/icon';
import { SpeciesCard } from '../../ui-components/species-card/species-card';
import { ICombats, ISpecies } from 'packages/ui-data/src/lib/models';
import { CombatsService, SpeciesService } from 'packages/ui-data/src/lib/services';


@Component({
  selector: 'app-combats',
  imports: [NoDataFound, Button, MatIcon, SpeciesCard, NgClass],
  templateUrl: './combats.html',
  styleUrl: './combats.css',
})
export class Combats implements OnInit {
  combats: ICombats[] = [];

  winner?: string;

  species: ISpecies[] = [];

  selectedSpecies: (ISpecies | null)[] = [null, null];

  activeSlot: 0 | 1 = 0;

  message?: string;

  fighting = false;

  cdr = inject(ChangeDetectorRef);

  private combatsService = inject(CombatsService);

  private speciesService = inject(SpeciesService);

  ngOnInit(): void {
    this.speciesService.list().subscribe({
      next: (species) => {
        this.species = species.data;
        this.cdr.detectChanges();
      },
    });
  }

  startMatch() {
    const a = this.selectedSpecies[0];
    const b = this.selectedSpecies[1];

    if (!a || !b) return;
    this.fighting = true;

    setTimeout(() => {
      const result = this.resolveMatch(a, b);
      this.combatsService
        .create({
          loserId: result.loser.id,
          winnerId: result.winner.id,
        })
        .subscribe({
          next: (combats) => {
            console.log(combats);
            this.cdr.detectChanges();
          },
        });

      this.winner = result.winner.name;
      this.fighting = false;
    }, 1200);
  }

  resolveMatch(a: ISpecies, b: ISpecies) {
    if (a.level > b.level) {
      return { winner: a, loser: b };
    }
    if (b.level > a.level) {
      return { winner: b, loser: a };
    }

    const compare = a.name.localeCompare(b.name, undefined, {
      sensitivity: 'base',
    });

    if (compare <= 0) {
      return { winner: a, loser: b };
    }

    return { winner: b, loser: a };
  }

  /**
   *
   * @param species
   * @returns
   */
  handleSelection(species: ISpecies) {
    const otherSlot = this.activeSlot === 0 ? 1 : 0;
    const check = this.selectedSpecies[otherSlot];

    if (check?.id === species.id) {
      this.message = 'select a different species';
      return;
    } else {
      this.message = undefined;
    }

    this.selectedSpecies[this.activeSlot] = species;
  }
}
