import { Article } from "./article";
import { Utilisateur } from "./utilisateur";

export class HistoriqueArticle {
    id?:number;
    entre?:string;
    sortie?:string;
    dateHistorique?: Date;
    article?:Article;
    magasinier?:Utilisateur;
}
