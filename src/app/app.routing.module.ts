/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Módulo: AppRoutingModule, módulo principal de rotas.
 * data: 25/02/2018
 **/
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanLoad } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HomeComponent } from './home/home.component';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';

const appRoutes: Routes = [
    { path: 'notificacao', 
        loadChildren: 'app/notificacao/notificacao.module#NotificacaoModule',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
    },
    { path: 'promocao', 
        loadChildren: 'app/oferta/oferta.module#OfertaModule',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
    },
    { path: 'perfil', 
        loadChildren: 'app/perfil/perfil.module#PerfilModule',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
    },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'senha', component: RedefinirSenhaComponent },
    { path: '', redirectTo: '/promocao', pathMatch: 'full' },
    { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}