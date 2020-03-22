/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Módulo: OfertaRoutingModule, Módulo de rotas de ofertas.
 * data: 25/02/2018
 **/
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfertaComponent } from './oferta.component';
import { OfertaDeactivateGuard } from './../guards/oferta-deactivate.guard';
import { OfertaFormComponent } from './oferta-form/oferta-form.component';

const ofertaRoutes: Routes = [
    { path: '', canDeactivate: [OfertaDeactivateGuard], component: OfertaComponent },
    { path: 'new', component: OfertaFormComponent },
    { path: 'edit/:id', component: OfertaFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(ofertaRoutes)],
    exports: [RouterModule]
})
export class OfertaRoutingModule {}