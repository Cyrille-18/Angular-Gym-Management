import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifie si l'utilisateur est connecté
  const token = authService.getToken();
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Vérifie les rôles requis
  const userRoles = authService.getUserRoles();
  const requiredRoles = route.data?.['roles'] as string[];

  if (requiredRoles && !requiredRoles.some(role => userRoles.includes(role))) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
