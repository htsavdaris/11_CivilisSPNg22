import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

import { HlmButtonImports } from '@spartan-ng/helm/button';

import { HlmFieldImports } from '@spartan-ng/helm/field';

import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { createColumnHelper, injectTable, tableFeatures } from '@tanstack/angular-table';

import { Person } from '../../../../models/person';
//import { Attribute } from '../../../../models/attribute';
import { AttributeService } from '../../../../services/attribute-service';
import { PersonService } from '../../../../services/person-service';
//import { PersonAttribute } from '../../../../models/personattribute';
import { PersonAttributeService } from '../../../../services/person-attribute-service';
//import { PersonAttributeView } from '../../../../models/personattributeview';
import { ActivatedRoute } from '@angular/router';
import { PersonAttributeView } from '../../../../models/personattributeview';
import { PersonAttributeViewService } from '../../../../services/person-attribute-view-service';

@Component({
  selector: 'com-person-form',
  imports: [
    HlmLabelImports,
    HlmInputImports,
    HlmFieldImports,
    HlmButtonImports,
    HlmSpinnerImports,
    HlmSelectImports,
    HlmCheckboxImports,
    HlmSeparatorImports,
    HlmTableImports,
    TranslocoModule,
    FormField,
    FormRoot,
  ],
  host: {
    class: 'flex flex-col gap-4',
  },
  templateUrl: './person-form.html',
  styleUrl: './person-form.css',
})
export class PersonForm implements OnInit {
  // ==========================================
  // Services
  // ==========================================

  private readonly _transloco = inject(TranslocoService);
  private readonly _personService = inject(PersonService);
  private readonly _attributeService = inject(AttributeService);
  private readonly _personAttributeService = inject(PersonAttributeService);
  private readonly _personAttributeViewService = inject(PersonAttributeViewService);
  private readonly _route = inject(ActivatedRoute);
  // ==========================================
  // State
  // ==========================================

  protected readonly personAttributes = this._personAttributeService.getAllRx();
  protected readonly attributes = this._attributeService.getAllRx();
  protected readonly isEditMode = signal<boolean>(true);
  protected readonly isDialog = signal<boolean>(false);
  // personid = input<any>({
  //   alias: 'id',
  // });
  public readonly fldpersonid = input<string>();
  public hrefPerson = this._personService.createPersonResource(this.fldpersonid);
  public hrefPersonAttributes = this._personAttributeViewService.getForPersonIdRx2(this.fldpersonid);

   protected readonly editingRowId = signal<string | null>(null);

  /** Working copy of the row being edited; only written back to `data` on save. */
  protected readonly draft = signal<PersonAttributeView | null>(null);


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

  protected readonly features = tableFeatures({});

  // Create a column helper with the table features and row type
  protected readonly columnHelper = createColumnHelper<typeof this.features, PersonAttributeView>();

  protected readonly columns = this.columnHelper.columns([
    this.columnHelper.accessor('fldpersonattrid', { header: '' }),
    this.columnHelper.accessor('fldattributedescription', { header: '' }),
    this.columnHelper.display({ id: 'actions', header: 'Actions' }),
  ]);

  protected readonly table = injectTable(() => ({
    features: this.features,
    columns: this.columns,
    data: this.hrefPersonAttributes.value() ?? [],
    getRowId: (row: PersonAttributeView) => row.fldpersonattrid.toString(),
  }));

  // readonly table = injectTable(() => ({
  //   key: 'persons-table', // needed for devtools
  //   debugTable: false,
  //   features: this.features,
  //   columns: this.columns,
  //   data: this.personsResource.value() ?? [],
  //   globalFilterFn: 'includesString',
  // }))

  // ==========================================
  // Public Methods
  // ==========================================
  constructor() {
    effect(() => {
      const person = this.hrefPerson?.value();
      if (this.hrefPerson?.hasValue() && person) {
        this.personModel.set(person);
      }
    });
  }

  ngOnInit(): void {
    const personId = this._route.snapshot.paramMap.get('id');
    console.log('personId:', personId);
    //let hrefPerson = this._personService.getOneRx(parseInt(personId ?? '0'));

    // if (personId) {
    //   this._personService.getOneRx(+personId).subscribe((person) => {
    //     if (person) {
    //       this.personModel.set(person);
    //     }
    //   });
    // }
    // throw new Error('Method not implemented.');
    //   this._route.data.subscribe(data => {
    //   console.log('mode:', data['mode']);
    // });
  }

  onSubmit() {
    const person = this.personModel();
    this._personService.update(person.fldpersonid, person).subscribe({
      next: (updatedPerson: Person) => {
        console.log('Person updated successfully:', updatedPerson);
        // this.person = updatedPerson;
        // this.globalToastService.showInfoToast('Μήνυμα', 'Επιτυχής ενημέρωση προσώπου');
        // //this.hideDialog();
      },
      error: (error) => {
        console.error('Error updating person:', error);
        //this.globalToastService.showErrorToast('Λάθος ενημέρωσης προσώπου', error);
      },
    });
  }

  public readonly itemToString = (dvalue: number) =>
    this.attributes.value()?.find((item) => item.fldattributeid === dvalue)?.fldattributedescription || '';

  // ==========================================
  // Private Methods
  // ==========================================

    protected startEdit(row: PersonAttributeView): void {
    this.editingRowId.set(row.fldpersonattrid.toString());
    this.draft.set({ ...row });
  }

  protected updateDraft<K extends keyof PersonAttributeView>(field: K, value: PersonAttributeView[K]): void {
    this.draft.update((d) => (d ? { ...d, [field]: value } : d));
  }

  protected save(): void {
    const draft = this.draft();
    if (!draft) return;
    //this.data.update((rows) => rows.map((r) => (r.fldpersonattrid.toString() === draft.fldpersonattrid.toString() ? draft : r)));
    this.cancel();
  }

  protected cancel(): void {
    this.editingRowId.set(null);
    this.draft.set(null);
  }
}
