import { Article } from "./article";
import { Categorie } from "./categorie";
import { Utilisateur } from "./utilisateur";

export class DemandeArticle {
    id?: number;
    dateDa?: Date;
    quantite?: number;
    besoin?: string;
    article?: Article;
    demandeur?: Utilisateur;
    etat?: string;
    extraArticle?: string;
    extraCategorie?: Categorie;
}
