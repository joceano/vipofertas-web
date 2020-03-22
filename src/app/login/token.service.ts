/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Service: TokenService, serviço de utilidades do Token.
 * data: 25/02/2018
 **/
import { Injectable } from '@angular/core';
import { AUTH_TOKEN } from './../../config';

@Injectable()

export class TokenService {

	constructor() { }

	/**
     * Retorna o token de autenticação salvo no local storage.
    **/
	jwt() {
		return localStorage.getItem(`${AUTH_TOKEN}`);
	}

	/**
     * Retorna o objeto header com o token de autênticação, usado nas requisições REST.
    **/
	header(): object {
		return {headers: {"X-Auth-Token" : this.jwt()}};
	}
}