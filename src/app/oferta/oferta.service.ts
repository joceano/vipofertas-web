/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Service: OfertaService, serviço de ofertas.
 * data: 25/02/2018
 **/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './../login/token.service';
import { SERVER_URL, AUTH_TOKEN } from '../../config';
import { Oferta } from './../model/oferta';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import 'rxjs/Rx';

@Injectable()
export class OfertaService {

    constructor(private http: HttpClient, 
                private tokenService: TokenService,
                private ng2ImgToolsService: Ng2ImgToolsService) { }

    /**
     * Retorna a oferta pelo ID.
    **/
    findById(id: number): Observable<any>  {
        return this.http
            .get(`${SERVER_URL}/oferta/`+id, this.tokenService.header())
            .map(res => res);
    }
    
    /**
     * Retorna todas as ofertas.
    **/
    findAll(): Observable<any>  {
        return this.http
            .get(`${SERVER_URL}/oferta/`, this.tokenService.header())
            .map(res => res);
    }

    /**
     * Faz o upload da imagem da oferta.
    **/
    upload(file: File, id: number) {
        let formdata: FormData = new FormData();
        formdata.append('file', file);
        return this.http
            .post(`${SERVER_URL}/file/`+id, formdata, this.tokenService.header())
            .map(res => res);
    }

    /**
     * Redimensiona a imagem em 80x80 px.
    **/
    resize(file: File) {
        return this.ng2ImgToolsService.resize([file], 80, 80).map(res => res);
    }

    /**
     * Salva a oferta.
    **/
    salvar(oferta: Oferta) {
        return this.http
            .post(`${SERVER_URL}/oferta/`, oferta, this.tokenService.header())
            .map(res => res);
    }

    /**
     * Monta a ordenação da lista de ofertas.
    **/
    reordenar(ofertas: Oferta[]) {
        return this.http
            .post(`${SERVER_URL}/oferta/reorder/`, ofertas, this.tokenService.header())
            .map(res => res);
    }

    /**
     * Exclui a oferta.
    **/
    excluir(id: number) {
        return this.http
            .delete(`${SERVER_URL}/oferta/`+id, this.tokenService.header())
            .map(res => res);
    }
}