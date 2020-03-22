import { Component, OnInit } from '@angular/core';
import { NotificacaoService } from './notificacao.service';
import { Notificacao } from '../model/notificacao';
import { Message, LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent implements OnInit {

  public progressCarregar : boolean = false;
  public notificacoes     : Notificacao[];
  public msgs             : Message[] = [];

  constructor(private notificacaoService: NotificacaoService,
              private router: Router) { }

  ngOnInit() {
    this.carregar();
  }

  /**
   * Carrega todas as notificações.
  **/
  carregar() {
    this.progressCarregar = true;    
    this.notificacaoService.findAll()
        .subscribe(res => {
            this.notificacoes = res;
            this.limitarStrings();
            this.progressCarregar = false;
        }, error => {
            console.log(error.message);
            this.progressCarregar = false;
    });
  }

  /**
   * Limita em 20 caracteres nas colunas da Table
  **/
  limitarStrings() {
    for (var i = 0; i < this.notificacoes.length; i++) {
      this.notificacoes[i].descricao = this.notificacoes[i].descricao.slice(0, 17) + '...';
      this.notificacoes[i].titulo = this.notificacoes[i].titulo.slice(0, 17) + '...';
    }
  }

  /**
   * Redireciona para cadastrar um nova Notificação.
  **/
  novo() {
    this.router.navigate(['/notificacao/new']);
  }

  podeDesativar() {
    /*if (this.formMudou) {
        confirm('Certeza que quer sair?')
    }*/
    return true;
  }

}
