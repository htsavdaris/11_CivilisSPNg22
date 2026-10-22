import { Component, computed, input, signal, viewChild } from '@angular/core';
import { provideTranslocoScope, translateSignal, TranslocoModule } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowUpDown,
  lucideCheck,
  lucideChevronDown,
  lucideCircleCheck,
  lucideCircleX,
  lucideCopy,
  lucideLoader,
  lucideMoreHorizontal,
  lucideSearch,
  lucideX,
} from '@ng-icons/lucide';

import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { ColumnDef, flexRenderComponent } from '@tanstack/angular-table';
import { Payment } from '../../model/payment';
import { PaymentsActionDropdown } from './action-dropdown';

@Component({
  selector: 'adm-payments-table',
  imports: [
    HlmTableImports,
    HlmCardImports,
    HlmInputImports,
    HlmInputGroupImports,
    HlmButtonImports,
    NgIcon,
    HlmDropdownMenuImports,
    HlmBadgeImports,
    TranslocoModule,    
  ],
  providers: [
    provideIcons({
      lucideArrowUpDown,
      lucideCheck,
      lucideCopy,
      lucideChevronDown,
      lucideMoreHorizontal,
      lucideSearch,
      lucideX,
      lucideCircleCheck,
      lucideCircleX,
      lucideLoader,
    }),
    provideTranslocoScope({ scope: 'dashboard/dashboard1', alias: 'dashboard1' }),
  ],

  template: `
    <div *transloco="let t; prefix: 'dashboard1.paymentsTable'" hlmCard class="h-full">
      <header hlmCardHeader>
        <h1 hlmCardTitle class="text-base font-semibold">{{ t('title') }}</h1>
        <p hlmCardDescription>{{ t('description') }}</p>
      </header>
      <main hlmCardContent class="flex flex-col gap-4">
      </main>
    </div>
  `,
})
export class PaymentsTable {
  // ==========================================
  // Inputs
  // ==========================================

  public readonly payments = input<Payment[]>([]);

  // ==========================================
  // View Children
  // ==========================================

  protected readonly statusCell = viewChild.required('statusCell');
  

  // ==========================================
  // State
  // ==========================================

  
  protected readonly searchValue = signal('');

  private readonly usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  

  
}
