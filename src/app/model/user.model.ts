import { role } from './role.model';
export class User {
  id_user ?:number;
   matricule ?:String;
     nom ?:String;
      prenom ?:String;
       datenaissance ?:Date;
        email ?:String;
        telephone ?:String;
    nom_structure ?:String;
   mdp ?:String;
   confirm_mdp ?:String;
   //roles?:Object;
   roles?:role[];

   /*constructor(id_user?:number,matricule ?:String,nom ?:String,prenom ?:String,date_naissance ?:Date,email ?:String,telephone ?:String,nom_structure ?:String,mdp ?:String,confirm_mdp ?:String, )
   {
     this.id_user= id_user||2;
     this.matricule=matricule ||'001';
     this.nom=nom || '';
     this.prenom=prenom|| '';
     this.date_naissance=date_naissance ;
     this.email=email ||'';
     this.telephone=telephone ||'';
     this.nom_structure=nom_structure ||'';
     this.mdp=mdp ||'';
     this.confirm_mdp=confirm_mdp ||'';
    this.roles=[];
   }*/
}