import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent implements OnInit {

  public usuario      : Usuario = new Usuario();
  public redefinirform : FormGroup;
  public ptBR          : any;
  public senhaRedef    : boolean = false;
  public progressRedef : boolean = false;
  public msgs          : Message[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.configurarComponenteData();
    this.configurarValidacoes();
  }

  /**
   * Configura os campos obrigatórios
  **/
  configurarValidacoes() {
    this.redefinirform = this.fb.group({
      'username'   : new FormControl('', Validators.compose([Validators.required, Validators.minLength(11)])),
      'nascimento' : new FormControl('', Validators.required)
    });
  }

  /**
   * Configura o calendário.
  **/
  configurarComponenteData() {
    this.ptBR = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      dayNamesMin: ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],
      monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
      monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  /**
   * Retorna para a página de login.
  **/
  cancelar() {
    this.router.navigate(['/login']);
  }

  /**
   * Executa a redefinição de senha.
  **/
  redefinirSenha(usuario: Usuario) {
    this.progressRedef = true;
    this.authService.redefinirSenha(usuario).subscribe(data => {
      this.senhaRedef = true;
      let response: any = data;
      this.msgs = [];
      this.msgs.push({severity:'success', summary:'Sucesso.', detail:response.message});
      this.progressRedef = false;
    },
    error => {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Atenção.', detail:error.error});
      this.progressRedef = false;
    });
  }
}