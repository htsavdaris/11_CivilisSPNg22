import { DatePipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { TranslocoModule, TranslocoService, translateSignal } from '@jsverse/transloco';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBriefcase,
  lucideCircleCheck,
  lucideCircleX,
  lucideLoader,
  lucideRefreshCcw,
  lucideSearch,
  lucideShieldCheck,
  lucideUser,
  lucideUserPlus,
  lucideX,
} from '@ng-icons/lucide';
import { ChangeDetectionStrategy } from '@angular/core'
import { createColumnHelper, FlexRender, injectTable, tableFeatures } from '@tanstack/angular-table'
import type { ColumnDef } from '@tanstack/angular-table'



// import { DataTableColumnsManager } from '@shared/datatable/columns-manager/columns-manager';
// import { DataTable, DataTableStateChangeEvent } from '@shared/datatable/table/data-table';
// import { DataTableFeatures } from '@shared/datatable/table/table-features';
import { HlmDialogService } from '@spartan-ng/helm/dialog';

import { Person } from '../../../../models/person';
import { PersonService } from '../../../../services/person-service';
import { debounce, form } from '@angular/forms/signals';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';

const features = tableFeatures({})

// 4. Create a column helper with the table features and row type
const columnHelper = createColumnHelper<typeof features, Person>()

const columns = columnHelper.columns([
  columnHelper.accessor('fldpersonid', {
    header: 'First Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('fldpersonlastname', {
    id: 'lastName',
    header: () => 'Last Name',
    cell:  (info) => info.getValue<string>().toUpperCase(),
  }),
  columnHelper.accessor('fldpersonfirstname', {
    id: 'fldpersonfirstname',
    
    header: () => 'fldpersonfirstname',
   
    cell: (info) => {
              const value = info.getValue<string>();
              const formatted = value.toUpperCase();
                      return "<div style='font-weight: bold;'>" + formatted + "</div>"
                      
  }}),
  columnHelper.accessor('fldpersonemail', {
    header: () => 'fldpersonemail',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('fldpersonmobile', {
    header: 'fldpersonmobile',
    cell: (info) => info.getValue(),
  })
])









@Component({
  selector: 'adm-personlist',
  imports: [
    TranslocoModule,
    // DataTable,
    // DataTableColumnsManager,
    HlmTableImports,
    HlmButtonImports,
    NgIcon,
    HlmInputImports,
    HlmLabelImports,
    HlmInputGroupImports,
    HlmAvatarImports,
    HlmBadgeImports,
    FlexRender,
  ],
  standalone: true,
  templateUrl: './personlist.html',
  styleUrl: './personlist.css',
})
export class Personlist {
  // ==========================================
  // Services
  // ==========================================
  private readonly _translocoService = inject(TranslocoService);
  private readonly _hlmDialogService = inject(HlmDialogService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _personService = inject(PersonService);

  // ==========================================
  // View Children
  // ==========================================

  /**
   * Template references for custom cell rendering.
   * These are accessed via viewChild and passed to TanStack column definitions.
   */
  // protected readonly dataTable = viewChild.required(DataTable<Person>);

  // ==========================================
  // State
  // ==========================================
  // protected readonly table = computed(() => this.dataTable().table);
  // protected readonly pagination = signal<PaginationState>({ pageIndex: 0, pageSize: 10 });
  // protected readonly sorting = signal<SortingState>([]);
  // protected readonly defaultColumnPinning: ColumnPinningState = { start: ['select'], end: ['actions'] };

    personsResource = this._personService.getAllRx();

  //   protected readonly usersResource = rxResource({
  //   params: () => {
  //     const sort = this.sorting()[0];
  //     return {
  //       page: this.pagination().pageIndex,
  //       pageSize: this.pagination().pageSize,
  //       search: this.searchForm.search().value(),
  //       sortField: (sort?.id ?? '') as keyof User | '',
  //       sortOrder: (sort?.desc ? 'desc' : 'asc') as 'asc' | 'desc',
        
  //     };
  //   },
  //   stream: ({ params }) => this._personService.getAll(params),
  // });

  protected readonly activeLanguage = computed(() => this._translocoService.activeLang());
  protected readonly searchForm = form(signal({ search: '' }), (schema) => debounce(schema.search, 300));


  readonly table = injectTable(() => ({
    key: 'basic-inject-table', // needed for devtools
    debugTable: true,
    features,
    columns,
    data: this.personsResource.value() ?? [],
  }))

  

  // ==========================================
  // Public Methods
  // ==========================================
  // protected addUser() {
  //   const dialogRef = this._hlmDialogService.open(UserForm, {
  //     autoFocus: false,
  //     contentClass: 'sm:min-w-lg',
  //   });

  //   dialogRef.closed$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((result) => {
  //     if (result) this.refreshTable();
  //   });
  // }

  // protected handleStateChange(state: DataTableStateChangeEvent) {
  //   this.pagination.set(state.pagination);
  //   this.sorting.set(state.sorting);
  // }

  // ==========================================
  // Private Methods
  // ==========================================

  refreshTable(): void {
    this.personsResource.reload();
  }


}
