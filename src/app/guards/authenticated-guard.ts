import { CanActivateFn } from '@angular/router';
import { LocalAuthService } from '../services/local-auth-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from '../services/user-store-service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const userStoreService = inject(UserStoreService);
  const router = inject(Router);
  const isAuthenticated = userStoreService.state().isLoggedIn;

 if (!isAuthenticated) {
    //console.log('User not authenticated, redirecting to login');
    router.navigate(['/login']);
    return false;
  }
  return true;
};
