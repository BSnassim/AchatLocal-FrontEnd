import { Article } from "./article";
import { Utilisateur } from "./utilisateur";

export class DemandeAchat {
    id?: number;
    dateAchat?: Date;
    quantite?: number;
    article?: Article;
    demandeur?: Utilisateur;
    magasinier?: Utilisateur;
}
