/* eslint-disable @angular-eslint/prefer-signals */
import { Component, inject, OnInit, signal } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { PersonForm } from '../person-form/person-form';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';


@Component({
  selector: 'com-person-form-dialog-cont',
  imports: [
    HlmDialogImports,
    PersonForm
],
  templateUrl: './person-form-dialog-cont.html',
  styleUrl: './person-form-dialog-cont.css',
})
export class PersonFormDialogCont implements OnInit {
  
  // ==========================================
  // Services
  // ==========================================
  private route = inject(ActivatedRoute);
  
  private readonly _dialogRef = inject<BrnDialogRef>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<{ fldpersonid?: number }>();
  
  protected userIdQueryParam = toSignal(
    this.route.queryParamMap.pipe(
      map(params => params.get('fldpersonid'))
    )
  );


  ngOnInit(): void {
    const fldpersonid = this._dialogContext.fldpersonid;
       if (fldpersonid) {
        this.userIdQueryParam = signal(fldpersonid.toString());
        console.log("Ng Init" + this.userIdQueryParam());
       }
  }

}
