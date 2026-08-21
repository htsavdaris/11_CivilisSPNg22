import { HttpInterceptorFn } from '@angular/common/http';
import { LocalAuthService } from '../services/local-auth-service';
import { inject } from '@angular/core';
import { UserStoreService } from '../services/user-store-service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localAuthService = inject(LocalAuthService);
  const userStoreService = inject(UserStoreService);

  const accessToken = userStoreService.state().accessToken;

  const urlsNotUseInterceptor: Array<string> = [
    'https://localhost:44330/api/user/authenticate',
    'https://localhost:44330/api/user/refresh',
    'https://localhost:44330/api/user/register',
    'https://localhost:44330/api/user/reenter',
    'https://civilisapp2024.azurewebsites.net/api/user/authenticate',
    'https://civilisapp2024.azurewebsites.net/api/user/refresh',
    'https://civilisapp2024.azurewebsites.net/api/user/register'];

  const isUrlExcluded: boolean = urlsNotUseInterceptor.some(url => req.url.includes(url));

  // Skip adding the Authorization header for excluded URLs
  if (isUrlExcluded) {
    return next(req);
  } else {
    // Add the Authorization header for other requests
    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
      });
      return next(cloned);
    } else {
      return next(req);
    }
  }
};
