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
    
    // throw new Error('AuthService is not available');
    return;
  }
  if (localStorage.getItem('refreshToken')) {
        console.log('refreshToken found');
        localAuthService.reEnterApp().subscribe({
      next: (authresponse) => {
        if (authresponse && authresponse.accesstoken) {
           console.log('Response OK');
          localAuthService.afterLogin(authresponse.userid, authresponse.login, authresponse.accesstoken, 
              authresponse.refreshtoken, authresponse.personid, authresponse.roles );
         // router.navigate(['/']);
        }
      },
      error: (error) => {
         console.log('Error : ' + error);
        router.navigate(['/login']);
      },
      complete: () => {
        console.log('Initial Nivigation');
        router.initialNavigation();
         router.navigate(['/']);
        return;
      }
      

    });

      //console.log('App Initializer completed');
    return;
  } // if refresh token exists
  else { // No refresh token, proceed to login
    console.log('No refreshToken found');
    router.initialNavigation();
    return;
  }
} // App Initializer