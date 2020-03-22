import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { TokenService } from './login/token.service';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth-guard';
import { AppRoutingModule } from './app.routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { SidebarModule } from 'primeng/sidebar';
import { ListboxModule } from 'primeng/listbox';
import { InputMaskModule } from 'primeng/inputmask';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { GrowlModule } from 'primeng/growl';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RedefinirSenhaComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    SidebarModule,
    ListboxModule,
    InputMaskModule,
    CardModule,
    PasswordModule,
    ButtonModule,
    GrowlModule,
    AppRoutingModule,
    ProgressBarModule,
    DialogModule,
    CalendarModule,
    MessagesModule,
    MessageModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
