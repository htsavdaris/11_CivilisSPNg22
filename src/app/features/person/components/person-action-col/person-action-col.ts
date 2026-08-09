import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleFadingArrowUp,lucideSquarePen , lucideCircleX } from '@ng-icons/lucide';
@Component({
  selector: 'adm-person-action-col',
  imports: [HlmButtonImports, NgIcon,  ],
  providers: [provideIcons({ lucideCircleFadingArrowUp, lucideSquarePen, lucideCircleX })],
  template: `
		<button hlmBtn size="icon" variant="outline">
			<ng-icon name="lucideSquarePen" />
		</button>
    <button hlmBtn size="icon" variant="outline">
			<ng-icon name="lucideCircleX" />
		</button>
	`,
  styleUrl: './person-action-col.css',
})
export class PersonActionCol {}
