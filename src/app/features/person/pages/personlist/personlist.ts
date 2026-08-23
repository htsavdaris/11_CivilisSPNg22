import { DatePipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, input, signal, TemplateRef, viewChild } from '@angular/core';
import { TranslocoModule, TranslocoService, translateSignal } from '@jsverse/transloco';
import { FormsModule } from '@angular/forms';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
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
  lucideChevronDown,
  lucideChevronFirst,
  lucideChevronLast,
  lucideChevronRight,
  lucideChevronLeft,
} from '@ng-icons/lucide';
import { ChangeDetectionStrategy } from '@angular/core'
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
import type { PaginationState } from '@tanstack/angular-table'
import { createAtom } from '@tanstack/angular-store'
import { debounce, form, FormField } from '@angular/forms/signals';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { CellContext, ColumnDef } from '@tanstack/angular-table'
import { HlmDialogService } from '@spartan-ng/helm/dialog';


// import { DataTableColumnsManager } from '@shared/datatable/columns-manager/columns-manager';
// import { DataTable, DataTableStateChangeEvent } from '@shared/datatable/table/data-table';
// import { DataTableFeatures } from '@shared/datatable/table/table-features';


import { Person } from '../../../../models/person';
import { PersonService } from '../../../../services/person-service';
import { PersonActionCol } from '../../components/person-action-col/person-action-col';


@Component({
  selector: 'adm-personlist',
  imports: [
    TranslocoModule,
    // DataTable,
    // DataTableColumnsManager,

    HlmTableImports,
    HlmSelectImports,
    HlmButtonImports,
    HlmTooltipImports,
    NgIcon,
    HlmInputImports,
    HlmLabelImports,
    HlmInputGroupImports,
    HlmAvatarImports,
    HlmBadgeImports,
    FlexRender,
    FormsModule
  ],
  standalone: true,
  templateUrl: './personlist.html',
  providers: [
    provideIcons({
      lucideRefreshCcw,
      lucideUserPlus,
      lucideSearch,
      lucideX,
      lucideCircleCheck,
      lucideCircleX,
      lucideLoader,
      lucideBriefcase,
      lucideShieldCheck,
      lucideUser,
      lucideChevronDown,
      lucideChevronFirst,
      lucideChevronLast,
      lucideChevronRight,
      lucideChevronLeft,
    }),
  ],
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
  readonly globalFilterAtom = createAtom<string>('')
  readonly paginationAtom = createAtom<PaginationState>({
    pageIndex: 0, // initial page index
    pageSize: 10, // default page size
  })


  public readonly pageSizeOptions = signal([10, 25, 50, 100]);

  protected readonly personlastnameCell = viewChild.required<TemplateRef<CellContext<typeof this.features, Person, string>>>('fldpersonlastname');

  protected readonly features = tableFeatures({
    columnSizingFeature ,
    columnFilteringFeature,
    globalFilteringFeature,
    filteredRowModel: createFilteredRowModel(),
    filterFns: { includesString: filterFn_includesString },
    rowPaginationFeature,
    paginatedRowModel: createPaginatedRowModel()
  })

  // 4. Create a column helper with the table features and row type
  protected readonly columnHelper = createColumnHelper<typeof this.features, Person>()

  protected readonly columns = this.columnHelper.columns([
    this.columnHelper.accessor('fldpersonid', {
      header: 'First Name',
      cell: (info) => `<a href="/persons/form/${info.getValue()}">${info.getValue()}</a>`,
      enableGlobalFilter: true,
      size: 8,      
    }),
    this.columnHelper.accessor('fldpersonlastname', {
      id: 'lastName',
      header: () => 'Last Name',
      enableGlobalFilter: true,
      cell: (info) =>
        `<strong>${info.getValue()}</strong>`,
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
    atoms: {
      pagination: this.paginationAtom,
      globalFilter: this.globalFilterAtom, // table.setGlobalFilter now updates globalFilterAtom
    },
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

  handlePageSizeChange(value: string | number) {
    const size = Number(value);
    if (!Number.isFinite(size) || size <= 0) return;
    this.table.setPagination({ pageIndex: 0, pageSize: size });
  }

  // onEditPerson() {
  //     const person = this._context.row.original;
  //     const dialogRef = this._hlmDialogService.open(UserForm, {
  //       context: { user },
  //       autoFocus: 'dialog',
  //       contentClass: 'sm:min-w-lg',
  //     });
  
  //     dialogRef.closed$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((result) => {
  //       console.log(result);
  //       if (result) {
  //         const refresh = this.onSuccess();
  //         if (refresh) refresh();
  //       }
  //     });
  //   }


}
