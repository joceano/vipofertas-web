import { Usuario } from "../model/usuario";

/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Classe: Notificacao, classe modelo de notificação.
 * data: 12/03/2018
 **/
export class Notificacao {
    id        : number; 
    titulo    : string;
    descricao : string;
    data      : Date;
    usuario   : Usuario;
}