import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);
  const router = inject(Router);
  
  if (sellerService.isSellerLoggedIn) {
    localStorage.setItem('sellerLoggedIn', JSON.stringify(sellerService.isSellerLoggedIn.value));
      if(localStorage.getItem('seller')){
      return true;
    }
    return false;
  }
  
  return router.createUrlTree(['/seller-login']);
};
