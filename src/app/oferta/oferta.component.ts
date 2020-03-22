import { Component, OnInit } from '@angular/core';
import { Oferta } from '../model/oferta';
import { OfertaService } from './oferta.service';
import { SERVER_URL } from './../../config';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Message, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  private serverUrl        : string = `${SERVER_URL}file/files/`;
  public ofertas           : Oferta[];
  public progressCarregar  : boolean = true;
  private inscricao        : Subscription;
  public msgs              : Message[] = [];

  constructor(private ofertaService: OfertaService,
              private router: Router,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.carregar();    
  }

  /**
   * Carrega todas as ofertas.
  **/
  carregar() {
    this.progressCarregar = true;
    this.ofertaService.findAll().subscribe(res => {
      this.ofertas = res;            
      this.progressCarregar = false;
    }, error => {   
      console.log(error.message);
      this.progressCarregar = false;
    });
  }

  /**
   * Redireciona para cadastrar um nova Oferta.
  **/
  novo() {
    this.router.navigate(['/promocao/new']);
  }

  /**
   * Atualizar a ordem das ofertas
  **/
  ordenar() {
    for (var i = 0; i < this.ofertas.length; i++) {
      var oferta = this.ofertas[i];
      oferta.ordem = i+1;
    }
    this.salvarOrdem(this.ofertas);
  }

  /**
   * Salva no banco de dados a nova ordem das Ofertas
  **/
  salvarOrdem(ofertas: Oferta[]) {
    this.ofertaService.reordenar(ofertas).subscribe((resOfertas: Oferta[]) => {
      
    }, error => {
      this.msgs = [{severity:'error', summary:'Ops!', detail: 'Não foi possível reordenar as ofertas.'}];
      console.log('reordenar: ' + error.message);
    });      
  }

  /**
   * Exclui a oferta.
  **/
  excluir(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir a oferta?',
      header: 'Confirmação!',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      icon: 'fa fa-trash',
      accept: () => {
        this.ofertaService.excluir(id).subscribe(res => {
          this.removeDaLista(id);
          this.msgs = [{severity:'info', summary:'', detail:'Registro excluído com sucesso!'}];
        }, error => {
          console.log(error.message);
        });
      },
      reject: () => {
        
      }
    });
  }

  /**
   * Remove a oferta da lista.
  **/
  removeDaLista(id: number) {
    let index = this.ofertas.findIndex(d => d.id === id);
    if (index > -1) {
        this.ofertas.splice(index, 1);
    }
  }

  /**
   * Verifica a desativação da rota de guarda.
  **/
  podeDesativar() {
    // if (this.formMudou) {
    //     confirm('Certeza que quer sair?')
    // }
    return true;
  }
}