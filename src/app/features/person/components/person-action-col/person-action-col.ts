import { Component, inject, input } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleFadingArrowUp, lucideSquarePen, lucideCircleX } from '@ng-icons/lucide';
import { CellContext, injectFlexRenderContext } from '@tanstack/angular-table';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { PersonForm } from '../person-form/person-form';
import { PersonFormDialogCont } from '../person-form-dialog-cont/person-form-dialog-cont';

@Component({
  selector: 'adm-person-action-col',
  imports: [HlmButtonImports, NgIcon,],
  providers: [provideIcons({ lucideCircleFadingArrowUp, lucideSquarePen, lucideCircleX })],
  template: `
		<button hlmBtn size="icon" variant="outline" (click)="onEditPerson()">
			<ng-icon name="lucideSquarePen" />
		</button>
    <button hlmBtn size="icon" variant="outline" (click)="onDeletePerson()">
			<ng-icon name="lucideCircleX" />
		</button>
	`,
  styleUrl: './person-action-col.css',
})
export class PersonActionCol {
  readonly context = injectFlexRenderContext<CellContext<any, any, any>>()
  //fldpersonid = input<number>();
   private readonly _hlmDialogService = inject(HlmDialogService);

  onEditPerson() {
    let curfldpersonid = this.context.row.original.fldpersonid;
    console.log('Edit user with ID:', curfldpersonid);
    const dialogRef = this._hlmDialogService.open(PersonFormDialogCont, {
          context: { fldpersonid: curfldpersonid },
          
          autoFocus: 'dialog',
          contentClass: 'min-w-3xl w-full', //class="sm:max-w-md w-full" or  sm:min-w-lg
        });
  }

  onDeletePerson() {
    throw new Error('Method not implemented.');
  }
}
