import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  produits!: Produit[];
  // categories : Categorie[];

  apiURL: string = 'http://localhost:8080/produits/api';



  constructor(private http : HttpClient){
    // this.categories = [
    //   {idCat : 1, nomCat : "PC"},
    //   {idCat : 2, nomCat : "Imprimante"}
    // ];

    // this.produits = [
    //   {idProduit : 1, nomProduit : "PC Asus", prixProduit : 3000.600, dateCreation : new Date("01/14/2011"), categorie : {idCat : 1, nomCat : "PC"}},
    //   {idProduit : 2, nomProduit : "Imprimante Epson", prixProduit : 450, dateCreation : new Date("12/17/2010"), categorie : {idCat : 2, nomCat : "Imprimante"}},
    //   {idProduit : 3, nomProduit :"Tablette Samsung", prixProduit : 900.123, dateCreation : new Date("02/20/2020"), categorie : {idCat : 1, nomCat : "PC"}}
    // ]
  }

  // Observabke : Toutes les api les retournes (design pattern) facilite la gestion des appels async. Fournis une syntaxe concise.
  listeProduit(): Observable<Produit[]>{
    return this.http.get<Produit[]>(this.apiURL);
  }

  ajouterProduit( prod: Produit):Observable<Produit>{
    return this.http.post<Produit>(this.apiURL, prod, httpOptions);
  }

 supprimerProduit(id : number) {
 const url = `${this.apiURL}/${id}`;
 return this.http.delete(url, httpOptions);
 }

 consulterProduit(id: number): Observable<Produit> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }

  updateProduit(prod :Produit) : Observable<Produit>
  {
  return this.http.put<Produit>(this.apiURL, prod, httpOptions);
  }



// Ancienne maniere de supprimer
/*
  supprimerProduit( prod: Produit){
    const index = this.produits.indexOf(prod, 0);
    if (index > -1) {
    this.produits.splice(index, 1);
    }
  }
 */


// Ancienne maniere de consulter
 /*  consulterProduit(id:number): Produit{
    return this.produits.find(p => p.idProduit == id)!;
    } */


  trierProduits(){
    this.produits = this.produits.sort((n1,n2) => {
    if (n1.idProduit! > n2.idProduit!) {
    return 1;
    }
    if (n1.idProduit! < n2.idProduit!) {
    return -1;
    }
    return 0;
    });
    }

// Ancienne version de l'updateProduit
/*
  updateProduit(p:Produit)
  {
  */
/*    this.supprimerProduit(p);
    this.ajouterProduit(p);
    this.trierProduits(); *//*

  }
 */

  // listeCategories():Categorie[] {
  //   return this.categories;
  //   }


  // consulterCategorie(id:number): Categorie{
  //   return this.categories.find(cat => cat.idCat == id)!;
  //   }
}
