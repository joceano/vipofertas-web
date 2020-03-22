/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * OfertaDeactivateGuard, desativa guarda rotas da oferta.
 * data: 25/02/2018
 **/
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { OfertaComponent } from './../oferta/oferta.component';

@Injectable()
export class OfertaDeactivateGuard implements CanDeactivate<OfertaComponent> {
                
    canDeactivate(
        component: OfertaComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        return component.podeDesativar ? component.podeDesativar() : true;
    }
}