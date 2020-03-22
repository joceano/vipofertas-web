/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Módulo: OfertaModule, Módulo de ofertas.
 * data: 25/02/2018
 **/
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfertaRoutingModule } from './oferta.routing.module';
import { OfertaComponent } from './oferta.component';
import { OfertaService } from './oferta.service';
import { OfertaDeactivateGuard } from '../guards/oferta-deactivate.guard';
import { OfertaFormComponent } from './oferta-form/oferta-form.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { ConfirmationService } from 'primeng/api';

import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { GrowlModule } from 'primeng/growl';
import { CardModule } from 'primeng/card';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UnidadeService } from '../unidade/unidade.service';

@NgModule({
    declarations: [
        OfertaComponent,
        OfertaFormComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        OfertaRoutingModule,
        OrderListModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        CalendarModule,
        ToolbarModule,
        MatButtonModule,
        MatIconModule,
        GrowlModule,
        CardModule,
        KeyFilterModule,
        ProgressSpinnerModule,
        CurrencyMaskModule,
        InputSwitchModule,
        FileUploadModule,
        CheckboxModule,
        Ng2ImgToolsModule,
        ConfirmDialogModule,
        FieldsetModule,
        PanelModule,
        ProgressBarModule,
        AutoCompleteModule
    ],
    providers: [
        OfertaDeactivateGuard,
        OfertaService,
        ConfirmationService,
        UnidadeService
    ],
    exports: [],
})
export class OfertaModule { }