import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { AuthService } from './auth.service';
import { Message } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario      : Usuario = new Usuario();
  public progressLogar : boolean = false;
  public msgs          : Message[] = [];
  public loginform     : FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.configurarValidacoes();
  }

  /**
   * Configura os campos obrigatórios
  **/
  configurarValidacoes() {
    this.loginform = this.fb.group({
      'username'       : new FormControl('', Validators.compose([Validators.required, Validators.minLength(11)])),
      'password'       : new FormControl('', Validators.required)
    });
  }

  /**
   * Faz a autenticação.
  **/
  fazerLogin(usuario) {
    this.progressLogar = true;
    this.authService.fazerLogin(usuario).subscribe(data => {

    },
    error => {
      this.progressLogar = false;
      if (error.status == '401') {
        this.msgs = [{severity:'error', summary:'Verifique!', detail:'Usuário e/ou Senha incorretos.'}];
      } else {
        this.msgs = [{severity:'error', summary:'Ops!', detail: error.message}];
        console.log(error.message);
      }
    });
  }

  /**
   * Abre a página de redefinição de senha.
  **/
  redefinirSenha() {
    this.router.navigate(['/senha']);
  }
}