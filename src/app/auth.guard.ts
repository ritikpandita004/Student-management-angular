import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';




export const AuthGuard: CanActivateFn=(route,state)=>{

  const router=inject(Router);

  let isLoggedIn =sessionStorage.getItem('jwtToken');
  if (isLoggedIn){
    return true;
  }
  else{
    
    router.navigate(['']);
    return false;
  }

};


