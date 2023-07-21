import { DemandeArticle } from "./demande-article";
import { Utilisateur } from "./utilisateur";

export class BonDeCommande {
    id?: number;
    dateCommande?: Date;
    demandeArticle?: DemandeArticle;
    magasinier?: Utilisateur;
}
