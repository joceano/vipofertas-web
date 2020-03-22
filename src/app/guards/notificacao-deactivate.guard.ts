/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * NotificacaoDeactivateGuard, desativa guarda rotas da notificação.
 * data: 25/02/2018
 **/
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { NotificacaoComponent } from './../notificacao/notificacao.component';

@Injectable()
export class NotificacaoDeactivateGuard implements CanDeactivate<NotificacaoComponent> {
                
    canDeactivate(
        component: NotificacaoComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        return component.podeDesativar ? component.podeDesativar() : true;
    }
}