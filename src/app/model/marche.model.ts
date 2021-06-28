import { Statut } from './statut.model';
export class Marche {
    id ?:number;
    refMarche?:String;
    designation?:String;
    cout?:number;
    matriculFournisseur?:String;
    etat?:Statut;
    dateSignature?:Date;
    dateDebutExecution?:Date;
    duree?:number;
    annee?:string;
    nature?:string;
    numPlan?:number;
    dateOuverture?:Date;
    dateLancement?:Date;
    dateNotif?:Date;
}