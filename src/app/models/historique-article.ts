import { Article } from "./article";
import { Utilisateur } from "./utilisateur";

export class HistoriqueArticle {
    id?:number;
    entre?:number;
    sortie?:number;
    dateHistorique?: Date;
    article?:Article;
    magasinier?:Utilisateur;
}
