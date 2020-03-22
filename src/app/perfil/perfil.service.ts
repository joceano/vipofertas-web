/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Service: PerfilService, serviço do perfil do usuário.
 * data: 12/03/2018
 **/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './../login/token.service';
import { SERVER_URL, AUTH_TOKEN } from '../../config';
import 'rxjs/Rx';
import { Usuario } from '../model/usuario';

@Injectable()
export class PerfilService {

    constructor(private http: HttpClient, 
                private tokenService: TokenService) { }

    /**
     * Retorna o perfil do usuário.
    **/
    findByUsuario(): Observable<any>  {
        return this.http
            .get(`${SERVER_URL}/perfil/`, this.tokenService.header())
            .map(res => res);
    }

    /**
     * Salva o perfil do usuário.
    **/
    salvarDados(usuario: Usuario) {
        return this.http
            .post(`${SERVER_URL}/perfil/`, usuario, this.tokenService.header())
            .map(res => res);
    }

    /**
     * Salva a nova senha.
    **/
    salvarNovaSenha(senhaAtual, novaSenha, novaSenhaRep) {
        return this.http
            .post(`${SERVER_URL}/perfil/novasenha/`, { senhaAtual, novaSenha, novaSenhaRep }, this.tokenService.header())
            .map(res => res);
    }
}