import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Notificacao } from '../../model/notificacao';
import { NotificacaoService } from '../notificacao.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Message, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-notificacao-form',
  templateUrl: './notificacao-form.component.html',
  styleUrls: ['./notificacao-form.component.css']
})
export class NotificacaoFormComponent implements OnInit {

  private inscricao      : Subscription;
  private id             : number;
  public notificacao     : Notificacao = new Notificacao();
  public notificacaoform : FormGroup;
  public ehInclusao      : boolean = false;
  public progressSalvar  : boolean = false;
  public msgs            : Message[] = [];

  constructor(private route: ActivatedRoute,
              private notificacaoService: NotificacaoService,
              private router: Router,
              private fb: FormBuilder,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.carregarNotificacao();
    this.configurarValidacoes();
  }

  /**
   * Configura os campos obrigatórios
  **/
  configurarValidacoes() {
    this.notificacaoform = this.fb.group({      
      'titulo'    : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(60)])),
      'descricao' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100)]))
    });
  }

  /**
   * Carrega a notificação
  **/
  carregarNotificacao() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.notificacao = new Notificacao();
        this.id = params['id'];
        if (this.ehIdValido(this.id)) {
          this.notificacaoService.findById(this.id).subscribe(res => {
            this.notificacao = res;
            if (this.notificacao) {
              this.tratarDatas(this.notificacao);
            } else {
              this.router.navigate(['/notificacao']);
            }
          }, error => {
            console.log(error.message);
          });
        } else if (this.id) {
          this.router.navigate(['/notificacao']);
        } else {
          this.ehInclusao = true;
        }
      }
    );
  }

  /**
   * Valida o parâmetro ID da URL.
  **/
  ehIdValido(id: number) {    
    if (id <= 0) {
      return false; //id menor ou igual a zero é inválido

    } else if (isNaN(id) === true) { //id que não é numérico é inválido
      return false;
    
    } else {
      return true;
    }
  }

  /**
   * Inicializa a data.
  **/
  tratarDatas(notificacao: Notificacao) {
    this.notificacao.data = new Date(notificacao.data);
  }

  /**
   * Cancela a inclusão/edição
  **/
  cancelar() {
    this.router.navigate(['/notificacao']);
  }

  /**
   * Envia a notificacao.
  **/
  notificar(notificacao: Notificacao) {
    this.confirmationService.confirm({
      message: 'Deseja realmente enviar essa notificação para os clientes através do aplicativo?',
      header: 'Confirmação de Notificação!',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      icon: 'fa fa-bell',
      accept: () => {
        this.progressSalvar = true;
        this.notificacaoService.notificar(notificacao).subscribe((res: Notificacao) => {
          this.router.navigate(['/notificacao']);
        }, error => {
          this.progressSalvar = false;
          this.msgs = [{severity:'error', summary:'Ops!', detail: 'Erro ao enviar a notificação!'}];
          console.log('notificação: ' + error.message);
        });
      },
      reject: () => {
        
      }
    });
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}