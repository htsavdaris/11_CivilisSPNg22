import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@jsverse/transloco';

export default [
  {
    path: '',
    providers: [provideTranslocoScope('persons')],
    loadComponent: () => import('./pages/personlist'),
  },
] as Routes;
