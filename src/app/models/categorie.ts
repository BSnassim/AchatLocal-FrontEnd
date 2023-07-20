import { Article } from "./article";

export class Categorie {
    id?: number;
    libelle?: string;
    typeImportation?: string;
    articles?: Article[];
}
