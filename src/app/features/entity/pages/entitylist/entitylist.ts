import { DatePipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';

import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import {
  createColumnHelper, columnFilteringFeature,
  globalFilteringFeature, FlexRender, injectTable, tableFeatures,
  createFilteredRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  createPaginatedRowModel,
  columnSizingFeature,
  flexRenderComponent,
} from '@tanstack/angular-table';
import type { PaginationState } from '@tanstack/angular-table';
import { createAtom } from '@tanstack/angular-store';
import { debounce, form, FormField } from '@angular/forms/signals';
import { translateSignal } from '@jsverse/transloco';
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
import { CountryDisplay } from '@shared/components/country-display/country-display';

import { HlmDialogService } from '@spartan-ng/helm/dialog';

import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

import { ActionDropdown } from '../../components/action-dropdown/action-dropdown';
import { Entity } from '../../../../models/entity';
import { EntityService } from '../../../../services/entity-service';
import { EntityView } from '../../../../models/entityview';
import { EntityViewService } from '../../../../services/entity-view-service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';


@Component({
  selector: 'adm-entitylist',
  imports: [
    HlmButtonImports,
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
    TranslocoModule,    
    FormField
],
  templateUrl: './entitylist.html',
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
    }),
  ],
  styleUrl: './entitylist.css',
})
export class Entitylist {
  // ==========================================
  // Services
  // ==========================================

  private readonly _translocoService = inject(TranslocoService);
  private readonly _hlmDialogService = inject(HlmDialogService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _entityService = inject(EntityService);
  private readonly _entityViewService = inject(EntityViewService);

  // ==========================================
  // View Children
  // ==========================================

  /**
   * Template references for custom cell rendering.
   * These are accessed via viewChild and passed to TanStack column definitions.
   */

  // ==========================================
  // State
  // ==========================================
  protected readonly entityResource = this._entityService.getAllRx();
  protected readonly entityViewResource = this._entityViewService.getAllRx()

  protected readonly activeLanguage = computed(() => this._translocoService.activeLang());
  protected readonly searchForm = form(signal({ search: '' }), (schema) => debounce(schema.search, 300));
  protected readonly globalFilterAtom = createAtom<string>('');
  protected readonly paginationAtom = createAtom<PaginationState>({
    pageIndex: 0, // initial page index
    pageSize: 10, // default page size
  });

  protected readonly features = tableFeatures({
    columnSizingFeature ,
    columnFilteringFeature,
    globalFilteringFeature,
    filteredRowModel: createFilteredRowModel(),
    filterFns: { includesString: filterFn_includesString },
    rowPaginationFeature,
    paginatedRowModel: createPaginatedRowModel()
  });


  // Create a column helper with the table features and row type
  protected readonly columnHelper = createColumnHelper<typeof this.features, EntityView>();

  protected readonly columns = this.columnHelper.columns([
      this.columnHelper.accessor('fldentityid', {
        header: 'First Name',
        cell: (info) => `<strong><a href="/entities/form/${info.getValue()}">${info.getValue()}</a></strong>`,
        enableGlobalFilter: true,
        size: 8,      
      }),
      this.columnHelper.accessor('fldentityname', {
        id: 'lastName',
        header: () => 'Last Name',
        enableGlobalFilter: true,
        cell: (info) =>`<strong>${info.getValue()}</strong>`,
        size: 18,      
      }),
      this.columnHelper.accessor('fldentitytypedesc', {
        id: 'fldentitytypedesc',
        enableGlobalFilter: true,
        header: () => 'fldentitytypedesc',
        cell: (info) => info.getValue(),
      }),
      this.columnHelper.accessor('fldcity', {
        header: () => 'fldcity',
        cell: (info) => info.getValue(),
      }),
      this.columnHelper.accessor('fldmail', {
        header: () => 'fldmail',
        cell: (info) => info.getValue(),
      }),
      this.columnHelper.accessor('fldmobile', {
        header: 'fldmobile',
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
    ]);


  protected readonly columns: ColumnDef<DataTableFeatures, EntityView>[] = [
    {
      id: 'fldentityid',
      accessorKey: 'fldentityid',
      header: translateSignal(`list.columns.fldentityid`),
      meta: { translationKey: 'entities.list.columns.fldentityid' },
      cell: (info) => info.getValue(),
      size: 10,
    },
    {
      id: 'fldentityname',
      accessorKey: 'fldentityname',
      header: translateSignal(`list.columns.fldentityname`),
      meta: { translationKey: 'entities.list.columns.fldentityname' },
      cell: (info) => info.getValue(),
    },
    {
      id: 'fldentitytypedesc',
      accessorKey: 'fldentitytypedesc',
      header: translateSignal('list.columns.fldentitytypedesc'),
      meta: { translationKey: 'entities.list.columns.fldentitytypedesc' },
      enableSorting: false,
      cell: (info) => info.getValue(),
    },
    {
      id: 'fldcity',
      accessorKey: 'fldcity',
      header: translateSignal('list.columns.fldcity'),
      meta: { translationKey: 'entities.list.columns.fldcity' },
      enableSorting: false,
      cell: (info) => info.getValue(),
    },
    {
      id: 'fldmail',
      accessorKey: 'fldmail',
      header: translateSignal('list.columns.fldmail'),
      meta: { translationKey: 'entities.list.columns.fldmail' },
      enableSorting: false,
      cell: (info) => info.getValue(),
    },
    {
      id: 'fldmobile',
      accessorKey: 'fldmobile',
      header: translateSignal('list.columns.fldmobile'),
      meta: { translationKey: 'entities.list.columns.fldmobile' },
      enableSorting: false,
      cell: (info) => info.getValue(),
    },
    // {
    //   id: 'status',
    //   accessorKey: 'status',
    //   header: translateSignal('list.columns.status'),
    //   meta: { translationKey: 'users.list.columns.status' },
    //   cell: () => this.statusCell(),
    //   filterFn: (row, columnId, filterValue: UserStatus[]) => {
    //     // If no filter is selected, show all rows
    //     if (!filterValue || filterValue.length === 0) {
    //       return true;
    //     }
    //     const rowValue = row.getValue(columnId) as UserStatus;
    //     return filterValue.includes(rowValue);
    //   },
    // },

    {
      id: 'actions',
      header: translateSignal('list.columns.actions'),
      enableHiding: false,
      enableResizing: false,
      enablePinning: true,
      size: 30,
      cell: () =>
        flexRenderComponent(ActionDropdown, {
          inputs: {
            onSuccess: () => this.refreshTable(),
          },
        }),
    },
  ];

  public readonly table = injectTable(() => ({
    key: 'persons-table', // needed for devtools
    debugTable: false,
    features: this.features,
    columns: this.columns,
    data: this.entityViewResource.value() ?? [],
    globalFilterFn: 'includesString',
    atoms: {
      pagination: this.paginationAtom,
      globalFilter: this.globalFilterAtom, // table.setGlobalFilter now updates globalFilterAtom
    },
  }));

  // ==========================================
  // Public Methods
  // ==========================================

  protected addEntity() {
    // const dialogRef = this._hlmDialogService.open(UserForm, {
    //   autoFocus: false,
    //   contentClass: 'sm:min-w-lg',
    // });

    // dialogRef.closed$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((result) => {
    //   if (result) this.refreshTable();
    // });
  }

  protected handleStateChange(state: DataTableStateChangeEvent) {
    this.pagination.set(state.pagination);
    this.sorting.set(state.sorting);
  }

  // ==========================================
  // Private Methods
  // ==========================================

  refreshTable(): void {
    this.entityViewResource.reload();
  }
}
