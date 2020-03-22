/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Service: NotificacaoService, serviço de Notificações.
 * data: 12/03/2018
 **/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './../login/token.service';
import { SERVER_URL, AUTH_TOKEN } from '../../config';
import { Notificacao } from '../model/notificacao';
import 'rxjs/Rx';

@Injectable()
export class NotificacaoService {

    constructor(private http: HttpClient, 
                private tokenService: TokenService) { }

    /**
     * Retorna a notificação pelo ID.
    **/
    findById(id: number): Observable<any>  {
        return this.http
            .get(`${SERVER_URL}/notificacao/`+id, this.tokenService.header())
            .map(res => res);
    }
    
    /**
     * Retorna todas as notificações.
    **/
    findAll(): Observable<any>  {
        return this.http
            .get(`${SERVER_URL}/notificacao/`, this.tokenService.header())
            .map(res => res);
    }

    /**
     * Envia a notificação
    **/
    notificar(notificacao: Notificacao) {
        return this.http
            .post(`${SERVER_URL}/notificacao/`, notificacao, this.tokenService.header())
            .map(res => res);
    }
}