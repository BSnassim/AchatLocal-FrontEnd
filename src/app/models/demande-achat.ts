import { Article } from "./article";
import { Utilisateur } from "./utilisateur";

export class DemandeAchat {
    id?: number;
    dateAchat?: Date;
    quantite?: number;
    article?: Article;
    extraArticle?: string;
    magasinier?: Utilisateur;
}
