/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Service: AuthService, serviço de autenticação.
 * data: 25/02/2018
 **/
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './token.service';
import { SERVER_URL, AUTH_TOKEN } from '../../config';
import { Usuario } from '../model/usuario';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
    
    mostrarMenuEmitter = new EventEmitter<boolean>();

    constructor(private router: Router, private http: HttpClient, private tokenService: TokenService) {}

    /**
     * Faz a autenticação.
    **/
    fazerLogin(usuario: Usuario) {
        let username = usuario.username;
        let password = usuario.password;
        return this.http.post(`${SERVER_URL}auth/`, { username, password })
            .map((res: any) => {
                if (res.token) {
                    localStorage.setItem(`${AUTH_TOKEN}`, res.token);
                    this.mostrarMenuEmitter.emit(true);
                    this.router.navigate(['/']);
                }
                return true;
        });
    }

    /**
     * Redefinição da senha do usuário.
    **/
   redefinirSenha(usuario: Usuario) {       
        return this.http
            .post(`${SERVER_URL}auth/redefinir/`, usuario)
            .map(res => res);
    }

    /**
     * Retorna o usuário logado.
    **/
    retornarUsuarioLogado(): Observable<any>  {        
        return this.http
        	.get(`${SERVER_URL}auth/logged/`, this.tokenService.header())
        	.map(res => res);
    }

    /**
     * Faz logout do sistema.
    **/
    logout() {
        localStorage.removeItem(`${AUTH_TOKEN}`);
        this.mostrarMenuEmitter.emit(false);
        this.router.navigate(['/login']);
    }

    /**
     * Retorna True se o usuário está autenticado.
    **/
    usuarioEstaAutenticado(){
        return this.tokenService.jwt() != null;
    }
}