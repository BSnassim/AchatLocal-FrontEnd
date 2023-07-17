import { Role } from "./role";

export class Utilisateur {
    id?:number;
    email?:string;
    password?:string;
    prenom?:string;
    nom?:string;
    role?:Role;
}
