import { Component, inject, OnInit, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required, submit, validate } from '@angular/forms/signals';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';

import { toast } from '@spartan-ng/brain/sonner';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmFieldImports } from '@spartan-ng/helm/field';

import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';

import { Person } from '../../../../models/person';
import { PersonService } from '../../../../services/person-service';
import { PersonAttribute } from '../../../../models/personattribute';
import { PersonAttributeService } from '../../../../services/person-attribute-service';
import { PersonAttributeView } from '../../../../models/personattributeview';
import { PersonAttributeViewService } from '../../../../services/person-attribute-view-service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'adm-person-form',
  imports: [HlmDialogImports,
    HlmLabelImports,
    HlmInputImports,
    HlmFieldImports,
    HlmButtonImports,
    HlmSpinnerImports,
    HlmSelectImports,
    TranslocoModule,
    FormField,
    FormRoot],
  host: {
    class: 'flex flex-col gap-4',
  },
  templateUrl: './person-form.html',
  styleUrl: './person-form.css',
})
export class PersonForm implements OnInit  {
 

  // ==========================================
  // Services
  // ==========================================

  private readonly _transloco = inject(TranslocoService);
  private readonly _dialogRef = inject<BrnDialogRef>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<{ person?: Person }>();
  private readonly _personService = inject(PersonService);
  private readonly _personAttributeService = inject(PersonAttributeService);
  private readonly _personAttributeViewService = inject(PersonAttributeViewService);
  private readonly _route = inject(ActivatedRoute);
  // ==========================================
  // State
  // ==========================================

  protected readonly person = this._personService.getOneRx(this._dialogContext.person?.fldpersonid ?? 0);
  protected readonly personAttributes = this._personAttributeService.getAllRx();
  protected readonly isEditMode = signal<boolean>(!!this._dialogContext.person);
  protected readonly isDialog = signal<boolean>(false);

  private readonly personModel = signal<Person>({
    fldpersonid: 0,
    fldpersonlastname: '',
    fldpersonfirstname: '',
    fldpersongender: '',
    fldpersonprefix: '',
    fldpersonstreet1: '',
    fldpersonnumber1: '',
    fldpersontk1: '',
    fldpersonmobile: '',
    fldpersonemail: '',
    fldprofession: '',
    fldxorikidomiid: '',
    flddatasource: '',
    fldcomment: '',
    fldcity: '',
    fldofficevisit: false,
    fldcommunucationconsent: false,
    fldmobilizationconsent: false,
    fldcreatedby: 0,
    fldupdatedby: 0,
    fldcreatedat: new Date(),
    fldupdatedat: new Date(),
  });


  protected readonly personForm = form(this.personModel, (schema) => {
    required(schema.fldpersonlastname);
    required(schema.fldpersonfirstname);
    required(schema.fldpersongender);
    required(schema.fldpersonprefix);
    required(schema.fldpersonstreet1);
    required(schema.fldpersonnumber1);
    required(schema.fldpersontk1);
  });

  // ==========================================
  // Public Methods
  // ==========================================

 ngOnInit(): void {
    throw new Error('Method not implemented.');
    this._route.data.subscribe(data => {
    console.log('mode:', data['mode']);
  });
  }


  // ==========================================
  // Private Methods
  // ==========================================  
  
}
