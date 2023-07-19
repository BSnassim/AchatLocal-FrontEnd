import { Article } from "./article";
import { Utilisateur } from "./utilisateur";

export class DemandeArticle {
    id?: number;
    dateDa?: Date;
    quantite?: number;
    besoin?: string;
    article?: Article;
    demandeur?: Utilisateur;
    extraDetails?: string;
}
