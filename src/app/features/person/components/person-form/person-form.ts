import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required, submit, validate } from '@angular/forms/signals';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

import { toast } from '@spartan-ng/brain/sonner';
import { HlmButtonImports } from '@spartan-ng/helm/button';

import { HlmFieldImports } from '@spartan-ng/helm/field';

import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmTableImports } from '@spartan-ng/helm/table';
import {
  createColumnHelper, columnFilteringFeature,
  globalFilteringFeature, FlexRender, injectTable, tableFeatures,
  createFilteredRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  createPaginatedRowModel,
  columnSizingFeature,
  flexRenderComponent,
} from '@tanstack/angular-table'


import { Person } from '../../../../models/person';
import { Attribute } from '../../../../models/attribute';
import { AttributeService } from '../../../../services/attribute-service';
import { PersonService } from '../../../../services/person-service';
import { PersonAttribute } from '../../../../models/personattribute';
import { PersonAttributeService } from '../../../../services/person-attribute-service';
import { PersonAttributeView } from '../../../../models/personattributeview';
import { PersonAttributeViewService } from '../../../../services/person-attribute-view-service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'adm-person-form',
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
    FormRoot],
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
  id = input<string>();
  hrefPerson = this._personService.createPersonResource(this.id);



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


  protected readonly features = tableFeatures({
    columnSizingFeature,
    columnFilteringFeature,
    globalFilteringFeature,
    filteredRowModel: createFilteredRowModel(),
    filterFns: { includesString: filterFn_includesString },
    rowPaginationFeature,
    paginatedRowModel: createPaginatedRowModel()
  });

  // Create a column helper with the table features and row type
  protected readonly columnHelper = createColumnHelper<typeof this.features, Person>()

  protected readonly columns = this.columnHelper.columns([
      this.columnHelper.accessor('fldpersonid', {
        header: 'First Name',
        cell: (info) => `<strong><a href="/persons/form/${info.getValue()}">${info.getValue()}</a></strong>`,
        enableGlobalFilter: true,
        size: 8,      
      }),
      this.columnHelper.accessor('fldpersonlastname', {
        id: 'lastName',
        header: () => 'Last Name',
        enableGlobalFilter: true,
        cell: (info) =>`<strong>${info.getValue()}</strong>`,
        size: 18,      
      }),
      this.columnHelper.accessor('fldpersonfirstname', {
        id: 'fldpersonfirstname',
        enableGlobalFilter: true,
        header: () => 'fldpersonfirstname',
        cell: (info) => info.getValue(),
      }),
      this.columnHelper.accessor('fldpersonemail', {
        header: () => 'fldpersonemail',
        cell: (info) => info.getValue(),
      }),
      this.columnHelper.accessor('fldpersonmobile', {
        header: 'fldpersonmobile',
        cell: (info) => info.getValue(),
      }),
      this.columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (ctx) =>  flexRenderComponent(PersonActionCol, {
            inputs: {
              fldpersonid: ctx.row.original.fldpersonid,
             // onSuccess: () => this.refreshTable(),
            },
          }),
      }),
    ])
  
  
    readonly table = injectTable(() => ({
      key: 'persons-table', // needed for devtools
      debugTable: false,
      features: this.features,
      columns: this.columns,
      data: this.personsResource.value() ?? [],
      globalFilterFn: 'includesString',
    }))

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
    //const personId = this._route.snapshot.paramMap.get('id');
    //console.log('personId:', this.personid());
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

        // this.person = updatedPerson;
        // this.globalToastService.showInfoToast('Μήνυμα', 'Επιτυχής ενημέρωση προσώπου');
        // //this.hideDialog();
      },
      error: (error) => {
        //this.globalToastService.showErrorToast('Λάθος ενημέρωσης προσώπου', error);
      }
    });
  }

  public readonly itemToString = (dvalue: number) => this.attributes.value()?.find((item) => item.fldattributeid === dvalue)?.fldattributedescription || '';

  // ==========================================
  // Private Methods
  // ==========================================  


}
