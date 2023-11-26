import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { PagesServiceService } from '../pages-service/pages.service.service';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: PagesServiceService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // Verifica si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // Si no está autenticado, redirige a la página de inicio de sesión
    this.router.navigate(['/login']);
    return false;
  }
}
