import { inject } from "@angular/core";

import { firstValueFrom, of, switchMap } from "rxjs";
import { UserService } from "./services/user-service";
import { LocalAuthService } from "./services/local-auth-service";
import { UserStoreService, IUserStore } from "./services/user-store-service";
import { Refreshapi } from "./models/refreshapi";
import { Router } from "@angular/router";

export async function appInitializer(): Promise<void> {
  const userService = inject(UserService);
  const localAuthService = inject(LocalAuthService);
  const router = inject(Router);

  if (!localAuthService) {
    
    return;
  }
  if (localStorage.getItem('refreshToken')) {
    localAuthService.reEnterApp().subscribe({
      next: (authresponse) => {
        if (authresponse && authresponse.accesstoken) {
          localAuthService.afterLogin(authresponse.userid, authresponse.login,authresponse.firstname,authresponse.lastname, authresponse.accesstoken,
            authresponse.refreshtoken, authresponse.personid, authresponse.roles);

        }
      },
      error: (error) => {
        console.log('Error : ' + error);
        router.navigate(['/login']);
      },
      complete: () => {
        router.initialNavigation();
        return;
      }
    });
    return;
  } // if refresh token exists
  else { // No refresh token, proceed to login
    router.initialNavigation();
    return;
  }
} // App Initializer