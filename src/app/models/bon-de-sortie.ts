import { DemandeArticle } from "./demande-article";
import { Utilisateur } from "./utilisateur";

export class BonDeSortie {
    id?: number;
    dateSortie?: Date;
    demandeArticle?: DemandeArticle;
    magasinier?: Utilisateur;
}
