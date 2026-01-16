import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { FORMLY_CONFIG, provideFormlyCore } from '@ngx-formly/core';
import { withFormlyMaterial } from '@ngx-formly/material';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { API_BASE_URL } from 'packages/ui-data/src/lib/tokens/api-url.token';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useValue: { formFieldAppearance: 'fill' },
    },
    {
      provide: API_BASE_URL,
      useValue: environment.apiUrl,
    },
    provideFormlyCore([
      ...withFormlyMaterial(),
      {
        validationMessages: [
          {
            name: 'required',
            message: 'Este campo es obligatorio',
          },
          {
            name: 'integer',
            message: 'Este campo solo admite numeros enteros',
          },
        ],
      },
    ]),
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
