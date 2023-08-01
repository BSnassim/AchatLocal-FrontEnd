import { Departement } from "./departement";

export class Utilisateur {
    id?: number;
    email?: string;
    password?: string;
    prenom?: string;
    nom?: string;
    role?: string;
    departement?: Departement;
}
