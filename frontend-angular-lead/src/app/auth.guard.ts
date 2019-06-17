import {CanActivate, 
    Router, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AccountService} from '../app/login.account.service';

@Injectable({
    providedIn:'root'
})
export class NeedAuthGuard implements CanActivate {
    constructor(private accountService:AccountService,
        private router:Router){
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const redirectUrl = next['_routerState']['url'];

        return new Promise((resolve: Function, reject: Function) => {
            if (this.accountService.isLogged()) {
               
                resolve(true)
            } else {
                
                resolve(false)
                this.router.navigateByUrl(
                    this.router.createUrlTree(
                      ['/login'], {
                        queryParams: {
                          redirectUrl
                        }
                      }
                    )
                  );
            }
        });
    }
   

}