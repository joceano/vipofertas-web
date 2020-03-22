import { PerfilService } from './perfil.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilform   : FormGroup;
  public senhaform    : FormGroup;
  public usuario      : Usuario = new Usuario();
  public ptBR         : any;
  public msgs         : Message[] = [];
  public senhaAtual   : String;
  public novaSenha    : String;
  public novaSenhaRep : String;
  public progressSalvarDados: boolean = false;
  public progressSalvarSenha: boolean = false;

  constructor(private fb: FormBuilder,
              private perfilService: PerfilService,
              private router: Router) { }

  ngOnInit() {
    this.carregarPerfil();
    this.configurarComponenteData();
    this.configurarValidacoes();
  }

  /**
   * Configura os campos obrigatórios
  **/
  configurarValidacoes() {
    this.perfilform = this.fb.group({
      'nome'        : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'sobrenome'   : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      'email'       : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(60)])),
      'nascimento'  : new FormControl('', Validators.required)
    });

    this.senhaform = this.fb.group({
      'senhaatual'  : new FormControl('', Validators.required),
      'novasenha'   : new FormControl('', Validators.required),
      'repetesenha' : new FormControl('', Validators.required)
    });
  }

  /**
   * Carrega o Perfil
  **/
  carregarPerfil() {
    this.perfilService.findByUsuario().subscribe(res => {
      this.usuario = res;
      if (this.usuario) {
        this.tratarDataNasc(this.usuario);
      }
    }, error => {
      console.log(error.message);
    });
  }

  /**
   * Inicializa a data.
  **/
  tratarDataNasc(usuario: Usuario) {
    this.usuario.nascimento = new Date(usuario.nascimento);
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

  cancelar() {
    this.router.navigate(['/promocao']);
  }

  /**
   * Salva os dados do cadastro do usuário.
  **/
  salvarDados(usuario: Usuario) {
    this.progressSalvarDados = true;
    this.perfilService.salvarDados(usuario)
      .subscribe((res: any) => {
        this.progressSalvarDados = false;
        this.msgs = [{severity:'success', summary:'Sucesso!', detail:'Cadastro salvo com sucesso.'}];
      }, error => {
        this.progressSalvarDados = false;
        console.log('Salvar Dados: ' + error.message);
        this.msgs = [{severity:'error', summary:'Verifique!', detail:'Não foi possível salvar o cadastro.'}];
    });
  }

  /**
   * Salva a nova senha do usuário
  **/
  salvarNovaSenha(senhaAtual, novaSenha, novaSenhaRep) {
    this.progressSalvarSenha = true;
    this.perfilService.salvarNovaSenha(senhaAtual, novaSenha, novaSenhaRep)
      .subscribe((res: any) => {
        this.progressSalvarSenha = false;
        this.msgs = [{severity:'success', summary:'Sucesso!', detail:'Nova senha salva com sucesso.'}];
      }, error => {
        this.progressSalvarSenha = false;
        console.log('Salvar Senha: ' + error.message);
        let msg = 'Não foi possível salvar a nova senha.';
        if (error.error) {
          msg = error.error;
        }
        this.msgs = [{severity:'error', summary:'Verifique!', detail: msg}];
    });
  }

}
