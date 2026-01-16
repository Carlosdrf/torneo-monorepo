import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  inject,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Button } from '../../ui-components/button/button';
import { Create, IFormPopulate } from '../create/create';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  CardOptionsTypes,
  SpeciesCard,
} from '../../ui-components/species-card/species-card';
import { AbstractControl } from '@angular/forms';
import { NoDataFound } from '../../ui-components/no-data-found/no-data-found';
import { ISpecies, RequestResponse } from 'packages/ui-data/src/lib/models';
import { SpeciesService } from 'packages/ui-data/src/lib/services';

@Component({
  selector: 'app-species',
  imports: [Button, SpeciesCard, NoDataFound],
  templateUrl: './species.html',
  styleUrl: './species.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Species implements OnInit {
  skills = ['Rayos laser', 'Super fuerza', 'Velocista', 'Volador'];

  formlyForm: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        description: 'Nombre de la especie',
        label: 'Nombre',
        required: true,
      },
    },
    {
      key: 'level',
      type: 'input',
      props: {
        min: 0,
        type: 'number',
        description: 'Nivel de poder de la especie',
        label: 'Poder',
        required: true,
      },
      validators: {
        integer: {
          expression: (c: AbstractControl) =>
            c.value === null ||
            c.value === '' ||
            Number.isInteger(Number(c.value)),
          message: 'Solo se permiten números enteros',
        },
      },
    },
    {
      key: 'skill',
      type: 'select',
      props: {
        description: 'Habilidad especial de la especie',
        label: 'Selecciona habilidad',
        required: true,
        options: this.skills.map((item) => {
          return {
            label: item,
            value: item,
          };
        }),
      },
    },
  ];

  species: ISpecies[] = [];

  private viewContainer = inject(ViewContainerRef);

  cdr = inject(ChangeDetectorRef);

  private speciesService = inject(SpeciesService);

  /**
   *
   */
  ngOnInit(): void {
    this.speciesService.list().subscribe({
      next: (species: RequestResponse<ISpecies[]>) => {
        this.species = species.data;
        this.cdr.detectChanges();
      },
    });
  }

  openSidePanel(selectedSpecies?: ISpecies) {
    const component = this.viewContainer.createComponent(Create);
    if (component) {
      component.instance.fields = this.formlyForm;
      if (selectedSpecies) {
        component.instance.populatedData = {
          ...selectedSpecies,
        };
      }
      component.instance.submitForm.subscribe({
        next: (response: IFormPopulate<Omit<ISpecies, 'id'>>) => {
          console.log(response);
          if (selectedSpecies) {
            this.speciesService
              .update(selectedSpecies.id, response.data)
              .subscribe({
                next: (updated) => {
                  this.species = this.species.map((s) =>
                    s.id === updated.data.id ? updated.data : s,
                  );
                  this.closeComponent(component);
                },
              });
          } else {
            const exists = this.species.find(
              (s) => s.name === response.data.name,
            );
            if (!exists) {
              this.speciesService.create(response.data).subscribe({
                next: (created) => {
                  this.species = [...this.species, created.data];
                  this.closeComponent(component);
                },
              });
            }
          }
        },
      });
      component.instance.closePanel.subscribe(() => {
        this.closeComponent(component);
      });
    }
  }

  /**
   *
   * @param action option action
   * @param element selected species
   */
  handleActionClick(action: CardOptionsTypes, element: ISpecies) {
    if (action === CardOptionsTypes.DELETE) {
      this.species = this.species.filter((s) => s !== element);
      // this.upsertSpecies();
    }
    if (action === CardOptionsTypes.EDIT) {
      this.openSidePanel(element);
    }
  }

  /**
   *
   * @param component
   */
  closeComponent(component: ComponentRef<Create>) {
    this.cdr.detectChanges();
    component.destroy();
    this.viewContainer.clear();
  }
}
