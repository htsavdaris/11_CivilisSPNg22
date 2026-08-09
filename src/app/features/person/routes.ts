import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@jsverse/transloco';
import { Personlist } from './pages/personlist/personlist';
import { PersonForm } from './components/person-form/person-form';

export default [
  { path: '', providers: [provideTranslocoScope('persons')], component: Personlist },
  { path: 'list', providers: [provideTranslocoScope('persons')], component: Personlist },
  { path: 'form', providers: [provideTranslocoScope('persons')], component: PersonForm , data: { mode: 'form' } },
  { path: 'form/:id', providers: [provideTranslocoScope('persons')], component: PersonForm, data: { mode: 'form' } },
  { path: '**', redirectTo: '' }
] as Routes;
