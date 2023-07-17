import { Article } from "./article";
import { Utilisateur } from "./utilisateur";

export class BonDeSortie {
    id?: number;
    dateSortie?: Date;
    quantite?: number;
    article?: Article;
    demandeur?: Utilisateur;
    magasinier?: Utilisateur;
}
