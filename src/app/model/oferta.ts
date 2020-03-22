import { Notificacao } from "./notificacao";

/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Classe: Oferta, classe modelo de oferta.
 * data: 25/02/2018
 **/
export class Oferta {
    id           : number; 
    nome         : string;
    descricao    : string;
    unidade      : string;
    dtinicial    : Date;
    dtfinal      : Date;
    preco        : number;
    precopromo   : number;
    imagem       : string;
    ativo        : boolean;
    ordem        : number;
    isNotificar  : boolean;
    notificacoes : Notificacao[] = [];
}