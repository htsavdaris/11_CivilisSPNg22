import { DatePipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { TranslocoModule, TranslocoService, translateSignal } from '@jsverse/transloco';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmLabelImports } from '@spartan-ng/helm/label';
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
import {
  CellContext,
  ColumnDef,
  ColumnPinningState,
  flexRenderComponent,
  PaginationState,
  SortingState,
} from '@tanstack/angular-table';

import { DataTableColumnsManager } from '@shared/datatable/columns-manager/columns-manager';
import { DataTable, DataTableStateChangeEvent } from '@shared/datatable/table/data-table';
import { DataTableFeatures } from '@shared/datatable/table/table-features';
import { HlmDialogService } from '@spartan-ng/helm/dialog';

import { Person } from '../../../../models/person';
import { PersonService } from '../../../../services/person-service';
import { debounce, form } from '@angular/forms/signals';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';



@Component({
  selector: 'adm-personlist',
  imports: [
    TranslocoModule,
    DataTable,
    DataTableColumnsManager,
    HlmButtonImports,
    NgIcon,
    HlmInputImports,
    HlmLabelImports,
    HlmInputGroupImports,
    HlmAvatarImports,
    HlmBadgeImports,
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
  protected readonly dataTable = viewChild.required(DataTable<Person>);

  // ==========================================
  // State
  // ==========================================
  protected readonly table = computed(() => this.dataTable().table);
  protected readonly pagination = signal<PaginationState>({ pageIndex: 0, pageSize: 10 });
  protected readonly sorting = signal<SortingState>([]);
  protected readonly defaultColumnPinning: ColumnPinningState = { start: ['select'], end: ['actions'] };

    protected readonly usersResource = rxResource({
    params: () => {
      const sort = this.sorting()[0];
      return {
        page: this.pagination().pageIndex,
        pageSize: this.pagination().pageSize,
        search: this.searchForm.search().value(),
        sortField: (sort?.id ?? '') as keyof User | '',
        sortOrder: (sort?.desc ? 'desc' : 'asc') as 'asc' | 'desc',
        
      };
    },
    stream: ({ params }) => this._personService.getAll(params),
  });

  protected readonly activeLanguage = computed(() => this._translocoService.activeLang());
  protected readonly searchForm = form(signal({ search: '' }), (schema) => debounce(schema.search, 300));

  protected readonly columns: ColumnDef<DataTableFeatures, Person>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: translateSignal(`list.columns.name`),
      meta: { translationKey: 'users.list.columns.name' },
      cell: () => this.nameCell(),
    },
    {
      id: 'email',
      accessorKey: 'email',
      meta: { translationKey: 'users.list.columns.email' },
      header: translateSignal(`list.columns.email`),
    },
    {
      id: 'country',
      accessorKey: 'country',
      header: translateSignal('list.columns.country'),
      meta: { translationKey: 'users.list.columns.country' },
      enableSorting: false,
      cell: () => this.countryCell(),
    },
    {
      id: 'phoneNumber',
      accessorKey: 'phoneNumber',
      header: translateSignal('list.columns.phoneNumber'),
      meta: { translationKey: 'users.list.columns.phoneNumber' },
      enableSorting: false,
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: translateSignal('list.columns.createdAt'),
      meta: { translationKey: 'users.list.columns.createdAt' },
      cell: () => this.dateCell(),
    },
    {
      id: 'role',
      accessorKey: 'role',
      header: translateSignal('list.columns.role'),
      meta: { translationKey: 'users.list.columns.role' },
      cell: () => this.roleCell(),
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: translateSignal('list.columns.status'),
      meta: { translationKey: 'users.list.columns.status' },
      cell: () => this.statusCell(),
      filterFn: (row, columnId, filterValue: UserStatus[]) => {
        // If no filter is selected, show all rows
        if (!filterValue || filterValue.length === 0) {
          return true;
        }
        const rowValue = row.getValue(columnId) as UserStatus;
        return filterValue.includes(rowValue);
      },
    },

    {
      id: 'actions',
      enableHiding: false,
      enableResizing: false,
      enablePinning: true,
      size: 40,
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
  protected addUser() {
    const dialogRef = this._hlmDialogService.open(UserForm, {
      autoFocus: false,
      contentClass: 'sm:min-w-lg',
    });

    dialogRef.closed$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((result) => {
      if (result) this.refreshTable();
    });
  }

  protected handleStateChange(state: DataTableStateChangeEvent) {
    this.pagination.set(state.pagination);
    this.sorting.set(state.sorting);
  }

  // ==========================================
  // Private Methods
  // ==========================================

  refreshTable(): void {
    this.usersResource.reload();
  }


}
