import { PerfilComponent } from './perfil.component';
/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Módulo: PerfilRoutingModule, Módulo de rotas do perfil do usuário.
 * data: 19/06/2018
 **/
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const perfilRoutes: Routes = [
    { path: '', component: PerfilComponent }
];

@NgModule({
    imports: [RouterModule.forChild(perfilRoutes)],
    exports: []
})

export class PerfilRoutingModule {}