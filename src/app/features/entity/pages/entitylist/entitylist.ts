import { DatePipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';

import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import {
  CellContext,
  ColumnDef,
  ColumnPinningState,
  flexRenderComponent,
  PaginationState,
  SortingState,
} from '@tanstack/angular-table';
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
import { DataTableColumnsManager } from '@shared/datatable/columns-manager/columns-manager';
import { DataTable, DataTableStateChangeEvent } from '@shared/datatable/table/data-table';
import { DataTableFeatures } from '@shared/datatable/table/table-features';
import { HlmDialogService } from '@spartan-ng/helm/dialog';

import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

import { ActionDropdown } from '../../components/action-dropdown/action-dropdown';
import { Entity } from '../../../../models/entity';
import { EntityService } from '../../../../services/entity-service';
import { EntityView } from '../../../../models/entityview';
import { EntityViewService } from '../../../../services/entity-view-service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'adm-entitylist',
  imports: [
    HlmButtonImports,
    NgIcon,
    HlmInputImports,
    HlmLabelImports,
    HlmInputGroupImports,
    HlmAvatarImports,
    HlmBadgeImports,
    //UsersCardSection,
    TranslocoModule,
    //CountryDisplay,
    DataTable,
    DataTableColumnsManager,
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
  //private readonly _entityService = inject(EntityService);
  private readonly _entityViewService = inject(EntityViewService);

  // ==========================================
  // View Children
  // ==========================================

  /**
   * Template references for custom cell rendering.
   * These are accessed via viewChild and passed to TanStack column definitions.
   */
  protected readonly dataTable = viewChild.required(DataTable<EntityView>);

  // ==========================================
  // State
  // ==========================================
  protected readonly table = computed(() => this.dataTable().table);
  protected readonly pagination = signal<PaginationState>({ pageIndex: 0, pageSize: 10 });
  protected readonly sorting = signal<SortingState>([]);
  //protected readonly selectedRoles = signal<UserRole[]>([]);
  //protected readonly selectedStatuses = signal<UserStatus[]>([]);
  //protected readonly defaultColumnPinning: ColumnPinningState = { start: ['select'], end: ['actions'] };


  //protected readonly entityResource = this._entityService.getAllRx();
  protected readonly entityViewResource = this._entityViewService.getAllRx();
  protected readonly activeLanguage = computed(() => this._translocoService.activeLang());
  protected readonly searchForm = form(signal({ search: '' }), (schema) => debounce(schema.search, 300));

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
