import { SERVER_URL } from './../../../config';
import { Oferta } from './../../model/oferta';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaService } from '../oferta.service';
import { Message } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { UnidadeService } from '../../unidade/unidade.service';

@Component({
  selector: 'app-oferta-form',
  templateUrl: './oferta-form.component.html',
  styleUrls: ['./oferta-form.component.css']
})
export class OfertaFormComponent implements OnInit {

  private inscricao           : Subscription;
  private id                  : number;
  public oferta               : Oferta = new Oferta();
  public ptBR                 : any;
  public retornoUnidades      : string[];
  public msgs                 : Message[] = [];
  public ofertaform           : FormGroup;
  private currentFileUpload   : File;
  private selectedFiles       : FileList;
  private bRedimensionandoImg : boolean = false;
  public progressSalvar       : boolean = false;
  public serverUrl            : string = `${SERVER_URL}file/files/`;
  public dirImg               : string;

  constructor(private route: ActivatedRoute,
              private ofertaService: OfertaService,
              private router: Router,
              private fb: FormBuilder,
              private confirmationService: ConfirmationService,
              private unidadeService: UnidadeService) { }

  ngOnInit() {
    this.carregarOferta();
    this.configurarComponenteData();
    this.configurarValidacoes();
  }

  /**
   * Configura os campos obrigatórios
  **/
  configurarValidacoes() {
    this.ofertaform = this.fb.group({      
      'nome'      : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'descricao' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'unidade'   : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'dtinicial' : new FormControl('', Validators.required),
      'dtfinal'   : new FormControl('', Validators.required),
      'preco'     : new FormControl('', Validators.required),
      'precopromo': new FormControl('', Validators.required),
      'ativo'     : new FormControl('', Validators.required)
    });
  }

  /**
   * Carrega a oferta
  **/
  carregarOferta() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.oferta = new Oferta();
        this.oferta.ativo = true;
        this.oferta.preco = 0;
        this.oferta.precopromo = 0;
        this.id = params['id'];
        if (this.ehIdValido(this.id)) {
          this.ofertaService.findById(this.id).subscribe(res => {
            this.oferta = res;
            this.dirImg = this.serverUrl + this.oferta.imagem;
            if (this.oferta) {
              this.tratarDatas(this.oferta);
            } else {
              this.router.navigate(['/promocao']);
            }
          }, error => {
            console.log(error.message);
          });
        } else if (this.id) {
          this.router.navigate(['/promocao']);
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
   * Inicializa as datas.
  **/
  tratarDatas(oferta: Oferta) {
    this.oferta.dtinicial = new Date(oferta.dtinicial);
    this.oferta.dtfinal = new Date(oferta.dtfinal);
  }

  /**
   * Método executado ao selecionar a imagem.
  **/
  selectFile(event) {
    this.currentFileUpload = null;
    const file = event.files[0];
    if (file) {
      let sizeMB = (file.size / 5100).toFixed(2);
      if (!file.type.match('image.*')) {
        this.selectedFiles = undefined;
        this.msgs = [{severity:'error', summary:'Ops!', detail: 'Formato de imagem inválido!'}];
      } else if (+sizeMB > 1020) {
          this.selectedFiles = undefined;
          this.msgs = [{severity:'error', summary:'Ops!', detail: 'Tamanho da imagem superior a 5MB!'}];
      } else {
          this.bRedimensionandoImg = true;
          this.selectedFiles = event.files;
          this.currentFileUpload = this.selectedFiles.item(0);
          this.ofertaService.resize(this.currentFileUpload).subscribe((res: File) => {
            this.currentFileUpload = new File([res], res.name);
            this.bRedimensionandoImg = false;
          }, error => {
            this.bRedimensionandoImg = false;
            this.msgs = [{severity:'error', summary:'Ops!', detail: 'Erro ao redimensionar a imagem!'}];
            console.log('Resize: ' + error.message);
        });
      }
    }
  }

  removeImg() {
    this.selectedFiles = undefined;
    this.currentFileUpload = undefined;
  }

  /**
   * Cancela a inclusão/edição
  **/
  cancelar() {
    this.router.navigate(['/promocao']);
  }

  /**
   * Retorna True se pode pedir confirmação para notificar ao salvar uma nova oferta.
  **/
  podeNotificar(oferta: Oferta) {
    let dataAtual = new Date();
    return ( (oferta.notificacoes.length <= 0) && 
             (oferta.ativo) &&
             (oferta.dtinicial <= dataAtual) && 
             (oferta.dtfinal > dataAtual) );
  }

  /**
   * Veririca se deve notificar a nova oferta e invoca o método responsável por salvar no banco.
  **/
  salvar(oferta: Oferta) {
    if ((this.isPrecoValido(oferta)) && (this.isDatasValidas(oferta))) {
      oferta.isNotificar = false;
      if (this.podeNotificar(oferta)) {
        this.confirmationService.confirm({
          message: 'Deseja enviar notificação desta oferta para os clientes do aplicativo?',
          header: 'Confirmação de Notificação!',
          acceptLabel: 'Sim',
          rejectLabel: 'Não',
          icon: 'fa fa-bell',
          accept: () => {
            oferta.isNotificar = true;
            this.salvarOferta(oferta);
          },
          reject: () => {            
            this.salvarOferta(oferta);
          }
        });
      } else {
        this.salvarOferta(oferta);
      }
    }
  }

  /**
   * Salva a oferta no banco.
  **/
  salvarOferta(oferta: Oferta) {
    this.progressSalvar = true;
    this.ofertaService.salvar(oferta)
      .subscribe((resOferta: Oferta) => {
        if (this.currentFileUpload) {
          this.upload(resOferta, this.currentFileUpload);
        } else {
          this.router.navigate(['/promocao']);
        }
      }, error => {
        this.progressSalvar = false;
        this.msgs = [{severity:'error', summary:'Ops!', detail: 'Erro ao salvar a oferta!'}];
        console.log('oferta: ' + error.message);
    });
  }

  /**
   * Verifica se as datas vigêntes são válidas.
  **/
  isDatasValidas(oferta: Oferta) {
    if (oferta.dtinicial >= oferta.dtfinal) {
      this.msgs = [{severity:'error', summary:'Ops!', detail: 'A vigência final deve ser maior que a inicial!'}];
      return false;
    } else {
      return true;
    }
  }

  /**
   * Faz upload da imagem da oferta.
  **/
  upload(oferta: Oferta, file: File) {
    this.ofertaService.upload(this.currentFileUpload, oferta.id)
      .subscribe((resUpload: any) => {
        this.router.navigate(['/promocao']);
      }, error => {
        this.progressSalvar = false;
        console.log('upload: ' + error.message);
        this.router.navigate(['/promocao']);
    });
  }

  /**
   * Verifica se os preços informados são válidos.
  **/
  isPrecoValido(oferta: Oferta) {
    if ((!oferta.preco) || (oferta.preco == 0)) {
        this.msgs = [{severity:'error', summary:'Ops!', detail: 'Informe um preço válido!'}];
        return false;
    } else if ((!oferta.precopromo) || (oferta.precopromo == 0)) {
        this.msgs = [{severity:'error', summary:'Ops!', detail: 'Informe um preço promocional válido!'}];
        return false;
    } else if (oferta.precopromo >= oferta.preco) {
        this.msgs = [{severity:'error', summary:'Ops!', detail: 'Informe um preço promocional menor que o preço!'}];
        return false;
    } else {
        return true;
    }
  }

  /**
   * Define se irá habilitar o botão salvar.
  **/
  habilitarSalvar(bAtivo: boolean) {
    return ((bAtivo) && (this.oferta.preco > 0) && (this.oferta.precopromo > 0));
  }

  /**
   * Inicializar valores de preços.
  **/
  inicializarValores() {
    if (!this.oferta.preco) {
      this.oferta.preco = 0;
    }
    if (!this.oferta.precopromo) {
      this.oferta.precopromo = 0;
    }
  }

  /**
   * Carregar as unidades.
  **/
  pesquisarUnidades(descricao: any) {
    this.unidadeService.findDescricaoUnidade(descricao.query).subscribe(res => {
      this.retornoUnidades = res;
    }, error => {
      console.log(error.message);
      this.msgs = [{severity:'error', summary:'Ops!', detail: 'Não foi possível carregar as unidades!'}];
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

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }
}