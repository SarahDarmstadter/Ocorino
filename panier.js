/* 1. récuperer les données du local storage pour savoir quels produits sont ajoutés au panier.
2. afficher les produits au panier (nom du produit, personnalisation, prix)
3. calculer un montant total et l'afficher
4. afficher un formulaire de commande en respectant les champs (  Nom / prenom/ adresse/ date de naissance) 
    validation des attributs dans le HTML. 
    regex online 
5. bouton commander qui renvoie vers une page de remerciement qui affiche un numero de commande generer par le serveur ? */ 



// Recupération des données du local Storage. 

let articlesAuPanier = JSON.parse(localStorage.getItem("achats"));
//console.log(articlesAuPanier);

let listeArticles = document.getElementById("panier__articles");
//console.log(listeArticles)

// ---------- creation d'une fonction pour récuperer chaque données de chaque tableau 

function getDataStored (localStorage) {

    for (let i =0; i < articlesAuPanier.length; i++) {
    
    let imgProduit = document.createElement("img");
        imgProduit.classList.add("produit__img");
        imgProduit.src = articlesAuPanier[i].imageUrl;

    let divArticle = document.createElement("div");
        divArticle.classList.add("div_produit");
        divArticle.id = "div_produit"
        divArticle.appendChild(imgProduit);
    listeArticles.appendChild(divArticle);
        
    let divTexte = document.createElement("div");
        divTexte.classList.add("div_produit__texte");
    divArticle.appendChild(divTexte);

    let articleNom = document.createElement("p");
        articleNom.classList.add("article_nom");
        articleNom.textContent = articlesAuPanier[i].name;
        divTexte.appendChild(articleNom);

    let articleDescription = document.createElement("p");
        articleDescription.classList.add("article_description");
        articleDescription.textContent = articlesAuPanier[i].description;
        divTexte.appendChild(articleDescription);

    let articlePrice = document.createElement("p");
        articlePrice.classList.add("article_price");
        articlePrice.textContent = articlesAuPanier[i].price / 100 + " euros";
        divTexte.appendChild(articlePrice);
        
    let retirerDuPanier = document.createElement("button");
        retirerDuPanier.id = "supprimer"+i;
        retirerDuPanier.classList.add("supprimer");
        retirerDuPanier.innerText = "Supprimer";
        divTexte.appendChild(retirerDuPanier);
        
    supprimerArticle(i);
    prixTotal();
panierVide()
//-------- fermeture boucle for ---------
}
//------- fermeture GetDataStored
};

//---------------- creation d'une fonction qui affiche que le panier est vide ----------

function panierVide() {
    let lePanierVide = document.getElementById("panier-vide");
    let formulaireCommande = document.getElementById("formulaire");
    if (articlesAuPanier === null) {
        formulaireCommande.style.display ="none";
    }
        if (articlesAuPanier.length > 0){
            lePanierVide.style.display = "none";
        }   
    }


//------------creation d'une fonction pour retirer un article du panier -----------------------------------

function supprimerArticle(i){
    console.log(i);

    let retirerDuPanier = document.getElementById("supprimer"+i);
    let storage = articlesAuPanier;
    let articleSupprimé = document.getElementById("div_produit");

    retirerDuPanier.addEventListener("click", function(event){
        event.preventDefault();
        
        storage.splice(i, 1)
        console.log(storage)
        localStorage.setItem('achats', JSON.stringify(storage))

        articleSupprimé.style.display = "none";
    
    // ----------- fermeture event listener --------------------------
    });
};

getDataStored();

// ------------------ Calcul du montant total à afficher --------------------

function prixTotal() {
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
};
//----- fin de la fonction Prix total ------------------
// ----------------- Il faut que mon formulaire soit ok pour que je puisse l'envoyer----------
    
//---------------------- EVENT LISTENER ENVOIE DU FORMULAIRE  -------------------------

let boutonCommander = document.getElementById("commander");
let formulaire = document.getElementById("formulaire");

// --- evenement sur le formulaire ------ 
 formulaire.addEventListener("submit", function(event){
     event.preventDefault();
     let contact = {
        firstName : document.getElementById("firstname").value,
        lastName : document.getElementById("lastname").value,
        email : document.getElementById("email").value,
        address : document.getElementById("adress").value,
        city : document.getElementById("city").value,
        }
        console.log(contact)

        let products = articlesAuPanier;
//------------creation d'un objet pour stocker les informations à envoyer au serveur
        let order = {
         contact,
         products
        }

        fetch("http://localhost:3000/api/cameras/order", {
             method: "POST",
             headers : {
                 Accept : "application/json", 
                 "Content-type" : "application/json"
             },
             mode : "cors",
             body: JSON.stringify(order)})
         .then (function(response) {
             console.log(response.json()) })

// ------- fermeture de l'event listener sur le bouton commander -----
    });
 


  

        




   

      