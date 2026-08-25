import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { LOCAL_STORAGE } from '@core/config/tokens';
import { TranslocoModule } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeOff } from '@ng-icons/lucide';
import { svglGithubDark, svglGoogle } from '@ng-icons/svgl';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCard } from '@spartan-ng/helm/card';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { AuthLayout } from '../layout';

import { environment } from '../../../../environments/environment'
import { Userauth } from '../../../models/userauth';
import { UserStoreService } from '../../../services/user-store-service';
import { LocalAuthService } from '../../../services/local-auth-service';

@Component({
  selector: 'adm-login',
  imports: [
    HlmButtonImports,
    NgIcon,
    HlmFieldImports,
    HlmInputImports,
    HlmCheckboxImports,
    HlmLabelImports,
    HlmSpinnerImports,
    HlmCheckboxImports,
    HlmInputGroupImports,
    TranslocoModule,
    HlmCard,
    RouterLink,
    AuthLayout,
    FormField,
    FormRoot,
  ],
  providers: [
    provideIcons({
      svglGithubDark,
      lucideEye,
      lucideEyeOff,
      svglGoogle,
    }),
  ],
  templateUrl: './login.html',
})
export default class Login {

  // ==========================================
  // Services
  // ==========================================

  private readonly _router = inject(Router);
  private readonly _localStorage = inject(LOCAL_STORAGE);
  private readonly _localAuthService = inject(LocalAuthService);

  // ==========================================
  // State
  // ==========================================
  userAuth: Userauth = new Userauth();
  rememberme1: boolean = false;
  protected readonly showPassword = signal(false);

  protected readonly loginModel2 = signal(this.userAuth);

  protected readonly loginForm2 = form(
    this.loginModel2,
    (schema) => {
      required(schema.login);
      required(schema.password);
    },
    {
      submission: {
        action: async () => this.authenticate(),
      },
    }
  );


  // protected readonly loginModel = signal({
  //   email: 'admin@gmail.com',
  //   password: 'admin',
  // });

  // protected readonly loginForm = form(
  //   this.loginModel,
  //   (schema) => {
  //     required(schema.email);
  //     email(schema.email);
  //     required(schema.password);
  //   },
  //   {
  //     submission: {
  //       action: async () => this.onLogin(),
  //     },
  //   }
  // );

  // ==========================================
  // Private Methods
  // ==========================================

  onLogin(): void {
    this._localStorage?.setItem('token', 'dummy-jwt-token');
    this._router.navigate(['/dashboard/dashboard-1']);
  }

  onLogin2(): void {
    this._localStorage?.setItem('token', 'dummy-jwt-token');
    this._router.navigate(['/dashboard/dashboard-1']);
  }

  authenticate(): void {
    //this._localAuthService.authenticate(this.userAuth).subscribe({
    
    this._localAuthService.authenticate(this.loginModel2()).subscribe({
      next: (authresponse) => {
        if (authresponse && authresponse.accesstoken) {
          if (this.rememberme1) {
            //TODO: Set longer e  xpiration for refresh token
          }
          this._localAuthService.afterLogin(authresponse.userid, authresponse.login, authresponse.accesstoken,
            authresponse.refreshtoken, authresponse.personid, authresponse.roles);
          console.log('Authenticate Called2');
          //this._router.navigate(['/dashboard/dashboard-1']);
          console.log('Authenticate Called3');
          this._router.navigate(['/dashboard/dashboard-1']);
        }
      },
      error: (error) => {
        console.error("Authentication error: ", error);
      }
    });
  }
}
