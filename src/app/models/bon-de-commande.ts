import { Article } from "./article";
import { Categorie } from "./categorie";
import { Utilisateur } from "./utilisateur";

export class BonDeCommande {
    id?: number;
    dateCommande?: Date;
    quantite?: number;
    article?: Article;
    extraArticle?: string;
    extraCategorie?: Categorie;
    magasinier?: Utilisateur;
}
