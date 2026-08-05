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
import type { CellContext, ColumnDef } from '@tanstack/angular-table'



// import { DataTableColumnsManager } from '@shared/datatable/columns-manager/columns-manager';
// import { DataTable, DataTableStateChangeEvent } from '@shared/datatable/table/data-table';
// import { DataTableFeatures } from '@shared/datatable/table/table-features';
import { HlmDialogService } from '@spartan-ng/helm/dialog';

import { Person } from '../../../../models/person';
import { PersonService } from '../../../../services/person-service';
import { debounce, form } from '@angular/forms/signals';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';


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

  protected readonly activeLanguage = computed(() => this._translocoService.activeLang());
  protected readonly searchForm = form(signal({ search: '' }), (schema) => debounce(schema.search, 300));

  protected readonly personlastnameCell = viewChild.required<TemplateRef<CellContext<typeof this.features, Person, string>>>('fldpersonlastname');

  protected readonly features = tableFeatures({})

  // 4. Create a column helper with the table features and row type
  protected readonly columnHelper = createColumnHelper<typeof this.features, Person>()

  protected readonly columns = this.columnHelper.columns([
    this.columnHelper.accessor('fldpersonid', {
      header: 'First Name',
      cell: (info) => info.getValue(),
    }),
    this.columnHelper.accessor('fldpersonlastname', {
      id: 'lastName',
      header: () => 'Last Name',
      cell: (info) =>
      `<strong>${info.getValue()}</strong>`,
    }),
    this.columnHelper.accessor('fldpersonfirstname', {
      id: 'fldpersonfirstname',
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
    })
  ])







  readonly table = injectTable(() => ({
    key: 'persons-table', // needed for devtools
    debugTable: false,
    features: this.features,
    columns: this.columns,
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
