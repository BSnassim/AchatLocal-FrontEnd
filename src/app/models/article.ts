import { Categorie } from "./categorie";

export class Article {
    id?:number;
    libelle?:string;
    stock?:number;
    caracteristiques?:string;
    marque?:string;
    categorie?:Categorie;
}
