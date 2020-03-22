/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Módulo: PerfilModule, Módulo de perfil de usuário.
 * data: 19/06/2018
 **/
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil.routing.module';
import { PerfilService } from './perfil.service';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';

@NgModule({
    declarations: [
        PerfilComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        PerfilRoutingModule,        
        ProgressSpinnerModule,
        GrowlModule,
        ButtonModule,
        RouterModule,
        PanelModule,
        CardModule,
        InputTextModule,
        InputTextareaModule,
        ConfirmDialogModule,
        ProgressBarModule,
        CalendarModule,
        TabViewModule,
        PasswordModule
    ],    
    providers: [
        PerfilService,
        ConfirmationService
    ],
    exports: [],
})

export class PerfilModule { }