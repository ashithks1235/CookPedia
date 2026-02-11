import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  let router = inject(Router)
  const isAuthorised = !!sessionStorage.getItem("token")
  if(isAuthorised){
    return true;
  }else{
    alert("unauthorised access....")
    router.navigateByUrl('/login')
    return false
  }
  
};
