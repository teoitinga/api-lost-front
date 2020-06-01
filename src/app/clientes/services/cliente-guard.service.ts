import { AccountService } from './../../shared/service/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ClienteGuardService implements CanActivate{

  constructor(
    private accountService: AccountService,
    private router: Router
    ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.accountService.isLoggedIn){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }
}
