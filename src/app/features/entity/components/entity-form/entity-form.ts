import { Component, inject, OnInit, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required, submit, validate } from '@angular/forms/signals';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';

import { toast } from '@spartan-ng/brain/sonner';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmFieldImports } from '@spartan-ng/helm/field';

import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';


import { Entity} from '../../../../models/entity';
import { EntityService } from '../../../../services/entity-service';
import { EntityType} from '../../../../models/entitytype';
import { EntityTypeService } from '../../../../services/entity-type-service';


  // export interface EntityFormModel {
  //   name: string;
  //   email: string;
  //   phoneNumber: string;
  //   country: Country | null;
  //   role: UserRole | null;
  // }


@Component({
  selector: 'adm-entity-form',
  imports: [
     HlmDialogImports,
    HlmLabelImports,
    HlmInputImports,
    HlmFieldImports,
    HlmButtonImports,
    HlmSpinnerImports,
    HlmSelectImports,
    TranslocoModule,
    FormField,
    FormRoot,
  ],
  host: {
    class: 'flex flex-col gap-4',
  },
  templateUrl: './entity-form.html',
  styleUrl: './entity-form.css',
})
export class EntityForm implements OnInit {
   // ==========================================
    // Services
    // ==========================================
  
    private readonly _entityService = inject(EntityService);
    private readonly _entityTypeService = inject(EntityTypeService);
    private readonly _transloco = inject(TranslocoService);
    private readonly _dialogRef = inject<BrnDialogRef>(BrnDialogRef);
    private readonly _dialogContext = injectBrnDialogContext<{ entity?: Entity }>();
  
    // ==========================================
    // State
    // ==========================================
  
    protected readonly entityTypes = this._entityTypeService.getAllRx();
    protected readonly isEditMode = signal<boolean>(!!this._dialogContext.entity);
  
  private readonly entityModel = signal<Entity>({
    fldentityid: 0,
    fldentityname: "",
    fldentitytypeid: 0,
    fldaddress: "",
    fldnumber: "",
    fldtk: "",
    fldcity: "",
    fldcountry: "",
    fldfixedphone: "",
    fldmobile: "",
    fldmail: "",
    fldcreatedby: 0,
    fldupdatedby: 0,
    fldcreatedat: new Date(),
    fldupdatedat: new Date()
  });
  
    protected readonly entityForm = form(this.entityModel, (schema) => {
      required(schema.fldentityid);
      required(schema.fldentityname);
      required(schema.fldentitytypeid);
      required(schema.fldaddress);
      required(schema.fldnumber);
      required(schema.fldtk);
      required(schema.fldcity);
      required(schema.fldcountry);
      required(schema.fldfixedphone);
      required(schema.fldmobile);
      required(schema.fldmail);
      
    });
  
    // ==========================================
    // Public Methods
    // ==========================================
  
    ngOnInit(): void {
      const entity = this._dialogContext.entity;
      if (entity) {
        this.entityModel.set({
          ...entity
          //country: countries.find((c) => c.iso === entity.country) || null,
        });
      }
    }
  
    async onSubmit() {
      submit(this.entityForm, async () => {
        if (!this.entityForm().dirty()) {
          this._dialogRef.close(false);
          return;
        }
        this.onSaveEntity();
      });
    }
  
    // ==========================================
    // Private Methods
    // ==========================================
  
    onSaveEntity() {
      const payload = this._mapFormToEntity();
      const entityId = this._dialogContext.entity?.fldentityid;
  
      const request$ =
        this.isEditMode() && entityId ? this._entityService.update(entityId, payload) : this._entityService.insert(payload);
  
      request$.subscribe({
        next: () => {
          this.showToast();
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          toast.error('Save failed');
        },
      });
    }
  
    private _mapFormToEntity(): Entity {
      const val = this.entityForm;
      return {
        fldentityid: val.fldentityid().value(),
        fldentityname: val.fldentityname().value(),
        fldentitytypeid: val.fldentitytypeid().value(),
        fldaddress: val.fldaddress().value(),
        fldnumber: val.fldnumber().value(),
        fldtk: val.fldtk().value(),
        fldcity: val.fldcity().value(),
        fldcountry: val.fldcountry().value(),
        fldfixedphone: val.fldfixedphone().value(),
        fldmobile: val.fldmobile().value(),
        fldmail: val.fldmail().value(),
        fldcreatedby: 0, 
        fldupdatedby: 0,
        fldcreatedat: new Date(), // Set this to the appropriate value based on your application logic
        fldupdatedat: new Date(), // Set this to the appropriate value based on your application logic
      };
    }
  
    showToast() {
      const message = this.isEditMode()
        ? this._transloco.translate('entities.toast.entityUpdated')
        : this._transloco.translate('entities.toast.entityCreated');
      toast.success(message);
    }
  
    protected closeDialog(): void {
      const isDirty = this.entityForm().dirty();
  
      if (isDirty) {
        // TODO: replace with a translation and a proper confirmation dialog
        const confirmDiscard = confirm('You have unsaved changes. Are you sure you want to discard them?');
        if (!confirmDiscard) {
          return;
        }
      }
  
      // If not dirty OR user confirmed discard, close the dialog
      this._dialogRef.close();
    }


}
