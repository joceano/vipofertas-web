import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';
import { TokenService } from './login/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  visibleSidebar : boolean = false;
  mostrarMenu    : boolean = false;
  usuarioLogado  : any;

  constructor(private authService: AuthService, 
              private tokenService: TokenService,
              private router: Router) {}

  ngOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(mostrar => {
      this.mostrarMenu = mostrar;
      if (mostrar) {
        this.retornarUsuarioLogado();
      }
    });
    this.retornarUsuarioLogado();
  }

  /**
   * Faz requisição para retornar o usuário logado.
  **/
  retornarUsuarioLogado() {
    if (this.tokenService.jwt()) {
      this.authService.retornarUsuarioLogado().subscribe(res => {
        this.usuarioLogado = res;
      }, erro => {
        console.log(erro.message);
      });
    }
  }

  /**
   * Retorna True se deve mostrar menú.
  **/
  isMostrarMenu() {
    return (this.authService.usuarioEstaAutenticado() || this.mostrarMenu);
  }

  /**
   * Faz logout do sistema.
  **/
  logout() {
    this.authService.logout();
    this.fecharSideBar();
  }

  fecharSideBar() {
    this.visibleSidebar = false;
  }

  abrirNotificacao() {
    this.router.navigate(['/notificacao']);
    this.fecharSideBar();
  }

  abrirPerfil() {
    this.router.navigate(['/perfil']);
    this.fecharSideBar();
  }

  abrirOferta() {
    this.router.navigate(['/promocao']);
    this.fecharSideBar();
  }
}