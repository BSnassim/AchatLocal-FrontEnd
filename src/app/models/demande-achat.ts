import { Article } from "./article";
import { Categorie } from "./categorie";
import { Utilisateur } from "./utilisateur";

export class DemandeAchat {
    id?: number;
    dateAchat?: Date;
    quantite?: number;
    article?: Article;
    extraArticle?: string;
    extraCategorie?: Categorie;
    magasinier?: Utilisateur;
}
