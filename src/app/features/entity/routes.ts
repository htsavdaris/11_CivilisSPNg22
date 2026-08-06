import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@jsverse/transloco';


export default [
  {
    path: '',
    providers: [provideTranslocoScope('entities')],
    loadComponent: () => import('./pages/entitylist/entitylist').then(c=> c.Entitylist),
  },
] as Routes;
