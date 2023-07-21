import { DemandeArticle } from "./demande-article";
import { Utilisateur } from "./utilisateur";

export class DemandeAchat {
    id?: number;
    dateAchat?: Date;
    demandeArticle?: DemandeArticle;
    magasinier?: Utilisateur;
}
