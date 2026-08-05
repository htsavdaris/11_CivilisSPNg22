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

import { Entity } from '../../../../models/entity';
import { EntityService } from '../../../../services/entity-service';
import { UserService } from '../../../../services/user-service';


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
    DatePipe,
    //UsersCardSection,
    TranslocoModule,
    //CountryDisplay,
    DataTable,
    DataTableColumnsManager,
    //StatusFilter,
    //RoleFilter,
    //FormField,
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

  // ==========================================
  // View Children
  // ==========================================

  /**
   * Template references for custom cell rendering.
   * These are accessed via viewChild and passed to TanStack column definitions.
   */
  protected readonly dataTable = viewChild.required(DataTable<Entity>);

  // ==========================================
  // State
  // ==========================================
  protected readonly table = computed(() => this.dataTable().table);
  protected readonly pagination = signal<PaginationState>({ pageIndex: 0, pageSize: 10 });
  protected readonly sorting = signal<SortingState>([]);
  //protected readonly selectedRoles = signal<UserRole[]>([]);
  //protected readonly selectedStatuses = signal<UserStatus[]>([]);
  protected readonly defaultColumnPinning: ColumnPinningState = { start: ['select'], end: ['actions'] };

}
