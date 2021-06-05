export class Projet {
    id ?:number;
    ref?:string;
    date_debut?:Date;
    date_fin?:Date;
    budget?:number;
    localisation?:string;
    structure?:string;
constructor(id?:number,ref?:string,date_debut?:Date,date_fin?:Date,budget?:number,localisation?:string,structure?:string)
{
    this.id=id || 0;
    this.ref=ref || '';
    this.date_debut=date_debut;
    this.date_fin=date_fin;
    this.budget=budget || 0;
    this.localisation=localisation ||'';
    this.structure=structure ||'';
}

}