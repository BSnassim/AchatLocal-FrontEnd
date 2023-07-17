import { Article } from "./article";
import { Utilisateur } from "./utilisateur";

export class BonDeCommande {
    id?: number;
    dateCommande?: Date;
    quantite?: number;
    article?: Article;
    demandeur?: Utilisateur;
    magasinier?: Utilisateur;
}
