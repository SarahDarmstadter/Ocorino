/* 1. récuperer les données du local storage pour savoir quels produits sont ajoutés au panier.
2. afficher les produits au panier (nom du produit, personnalisation, prix)
3. calculer un montant total et l'afficher
4. afficher un formulaire de commande en respectant les champs (  Nom / prenom/ adresse/ date de naissance)
5. bouton commander qui renvoie vers une page de remerciement qui affiche un numero de commande generer par le serveur ? */ 

// Recupération des données du local Storage. 

let articlesAuPanier = JSON.parse(localStorage.getItem("achats"));
console.log(articlesAuPanier);

let listeArticles = document.getElementById("panier__articles");
console.log(listeArticles)

// ---------- creation d'une fonction pour récuperer chaque données de chaque tableau 

function getDataStored (localStorage) {

    for (let i =0; i < articlesAuPanier.length; i++) {

    let divArticle = document.createElement("div");
        divArticle.classList.add("div_produit");
        listeArticles.appendChild(divArticle);
        
        let articleNom = document.createElement("p");
            articleNom.classList.add("article_nom");
            articleNom.textContent = articlesAuPanier[i].nomProduit;
        divArticle.appendChild(articleNom);
        

        let articleOption = document.createElement("p");
            articleOption.classList.add("article_option");
            articleOption.textContent = articlesAuPanier[i].optionProduit;
        divArticle.appendChild(articleOption);

        let articlePrice = document.createElement("p");
        articlePrice.classList.add("article_price");
        articlePrice.textContent = articlesAuPanier[i].prixProduit / 100 + " euros";
        divArticle.appendChild(articlePrice);
        
    }
  
};

// ------------------ Calcul du montant total à afficher --------------------

function prixTotal(localStorage) {
    let x = [];
    for (let i = 0; i< articlesAuPanier.length; i++) { 
        let prixArticle = articlesAuPanier[i].prixProduit /100;
        x.push(prixArticle)
    }
    let y = (accumulator, currentValue) => accumulator + currentValue;
    let total = x.reduce(y);
    
  
    let totalAffiché = document.createElement("p");
    totalAffiché.classList.add("prix-total");
    totalAffiché.textContent = "Montant à payer " + total + " euros";
    listeArticles.appendChild(totalAffiché);
console.log(totalAffiché);
}



getDataStored();
prixTotal();