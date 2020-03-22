/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Módulo: NotificacaoModule, Módulo de notificação.
 * data: 25/02/2018
 **/
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificacaoService } from './notificacao.service';
import { NotificacaoDeactivateGuard } from './../guards/notificacao-deactivate.guard';
import { NotificacaoComponent } from './notificacao.component';
import { NotificacaoRoutingModule } from './notificacao.routing.module';
import { NotificacaoFormComponent } from './notificacao-form/notificacao-form.component';

import { DataTableModule } from 'primeng/datatable';
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

@NgModule({
    declarations: [
        NotificacaoComponent,
        NotificacaoFormComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NotificacaoRoutingModule,
        DataTableModule,
        ProgressSpinnerModule,
        GrowlModule,
        ButtonModule,
        RouterModule,
        PanelModule,
        CardModule,
        InputTextModule,
        InputTextareaModule,
        ConfirmDialogModule,
        ProgressBarModule
    ],    
    providers: [
        NotificacaoDeactivateGuard,
        NotificacaoService,
        ConfirmationService
    ],
    exports: [],
})

export class NotificacaoModule { }