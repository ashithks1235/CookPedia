import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  const isAuthorised = sessionStorage.getItem("token")
  if(isAuthorised){
    return true;
  }else{
    alert("unauthorised access....")
    router.navigateByUrl('/login')
    return false
  }
};
