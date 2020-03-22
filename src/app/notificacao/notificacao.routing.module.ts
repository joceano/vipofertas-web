/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Módulo: NotificacaoRoutingModule, Módulo de rotas de notificação.
 * data: 25/02/2018
 **/
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificacaoComponent } from './notificacao.component';
import { NotificacaoDeactivateGuard } from '../guards/notificacao-deactivate.guard';
import { NotificacaoFormComponent } from './notificacao-form/notificacao-form.component';

const notificacaoRoutes: Routes = [
    { path: '', canDeactivate: [NotificacaoDeactivateGuard], component: NotificacaoComponent },
    { path: 'new', component: NotificacaoFormComponent },
    { path: 'edit/:id', component: NotificacaoFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(notificacaoRoutes)],
    exports: []
})

export class NotificacaoRoutingModule {}