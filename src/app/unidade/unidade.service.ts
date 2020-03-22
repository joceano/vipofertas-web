/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Service: UnidadeService, serviço de unidades de Medida.
 * data: 14/08/2018
 **/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './../login/token.service';
import { SERVER_URL, AUTH_TOKEN } from '../../config';
import 'rxjs/Rx';

@Injectable()
export class UnidadeService {

    constructor(private http: HttpClient, 
                private tokenService: TokenService) { }

    /**
     * Executa lógica para carregar as unidades
    **/
    findDescricaoUnidade(descricao: any): Observable<any>  {
        if ( (descricao) && (descricao != '') ) {
            return this.findDescricao(descricao);
        } else {
            return this.findAll();
        }
    }

    /**
     * Retorna as unidades com base na descrição.
    **/
    findDescricao(descricao: any): Observable<any>  {
        return this.http
            .get(`${SERVER_URL}/unidade/`+descricao, this.tokenService.header())
            .map(res => res);
    }

    /**
     * Retorna todas as unidades.
    **/
    findAll(): Observable<any>  {
        return this.http
            .get(`${SERVER_URL}/unidade/`, this.tokenService.header())
            .map(res => res);
    }
}