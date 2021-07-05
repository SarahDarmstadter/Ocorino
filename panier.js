/* 1. récuperer les données du local storage pour savoir quels produits sont ajoutés au panier.
2. afficher les produits au panier (nom du produit, personnalisation, prix)
3. calculer un montant total et l'afficher
4. afficher un formulaire de commande en respectant les champs (  Nom / prenom/ adresse/ date de naissance) 
    validation des attributs dans le HTML. 
    regex online 
5. bouton commander qui renvoie vers une page de remerciement qui affiche un numero de commande generer par le serveur ? */ 



// Recupération des données du local Storage. 

let articlesAuPanier = JSON.parse(localStorage.getItem("achats"));
console.log(articlesAuPanier);

let listeArticles = document.getElementById("panier__articles");
let section = document.getElementById("le_panier");

// ---------- creation d'une fonction pour récuperer chaque données de chaque tableau 

function getDataStored (localStorage) {
console.log(articlesAuPanier);
    for (let i =0; i < articlesAuPanier.length; i++) {
    
    let imgProduit = document.createElement("div");
        imgProduit.classList.add("img__produit");
        imgProduit.classList.add("img__produit" + "--" + articlesAuPanier[i].id + ")");
        imgProduit.style.backgroundImage = "url(" +  articlesAuPanier[i].imageUrl + ")"; 
        imgProduit.style.backgroundRepeat = "no-repeat"; 

        console.log(articlesAuPanier[i].imageUrl)

    let divArticle = document.createElement("div");
        divArticle.classList.add("newCard");
        divArticle.id = "div_produit"+i;
        divArticle.appendChild(imgProduit);
    listeArticles.appendChild(divArticle);
        
    let divTexte = document.createElement("div");
        divTexte.classList.add("description__produit");
    divArticle.appendChild(divTexte);

    let articleNom = document.createElement("p");
        articleNom.classList.add("name");
        articleNom.textContent = articlesAuPanier[i].name;
        divTexte.appendChild(articleNom);
    console.log(articlesAuPanier[i].name);

    let articleDescription = document.createElement("p");
        articleDescription.classList.add("description");
        articleDescription.textContent = articlesAuPanier[i].description;
        divTexte.appendChild(articleDescription);
console.log(articlesAuPanier[i].description);

    let articlePrice = document.createElement("p");
        articlePrice.classList.add("price");
        articlePrice.textContent = articlesAuPanier[i].price / 100 + " euros";
        divTexte.appendChild(articlePrice);
        
    let retirerDuPanier = document.createElement("button");
        retirerDuPanier.id = "supprimer"+i;
        retirerDuPanier.classList.add("produit__bouton");
        retirerDuPanier.innerText = "Supprimer";
        divTexte.appendChild(retirerDuPanier);   
   
    supprimerArticle(i);
    
//-------- fermeture boucle for ---------
}
//------- fermeture GetDataStored
};

//---------------- creation d'une fonction qui affiche que le panier est vide ----------

function panierVide() {
    let lePanierVide = document.getElementById("panier-vide");        
        if (articlesAuPanier.length > 0){
            lePanierVide.style.display = "none";
        }   
    }
// -------------- fonction pour afficher ou non le formulaire ------------------------
    function displayFormulaire(){
        let formulaire = document.getElementById("formulaire");
        let lePanierVide = document.getElementById("panier-vide");   
            if (lePanierVide.style.display != "none") {
            formulaire.style.display ="none";
            }     
    }

    function displayMontant(){
        let totalAffiché = document.getElementById("prix-total");
        let lePanierVide = document.getElementById("panier-vide");
        if (lePanierVide.style.display != "none") {
            totalAffiché.style.display ="none";
        }
    }
// --------------fin de la fonction pour afficher ou non le formulaire ------------------------

//------------creation d'une fonction pour retirer un article du panier -----------------------------------

function supprimerArticle(i){
    let retirerDuPanier = document.getElementById("supprimer"+i);
    let storage = articlesAuPanier;
    let articleSupprimé = document.getElementById("div_produit"+i);
    
    retirerDuPanier.addEventListener("click", function(event){
        storage.splice(i, 1)
        localStorage.setItem('achats', JSON.stringify(storage))
        articleSupprimé.style.display = "none";   

    window.location.reload();

    // ----------- fermeture event listener --------------------------
    });
};



// ------------------ Calcul du montant total à afficher --------------------

function prixTotal() { 
    let x = [];
    for (let i = 0; i < articlesAuPanier.length; i++) { 
        let prixArticle = articlesAuPanier[i].price /100;
        x.push(prixArticle)
    }
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let total = x.reduce(reducer, 0);

    let totalAffiché = document.createElement("p");
        totalAffiché.classList.add("prix-total");
        totalAffiché.id = "prix-total";
        totalAffiché.textContent = "Montant à payer " + total + " euros";
    
    listeArticles.appendChild(totalAffiché);         
};
//----- fin de la fonction Prix total ------------------
// ----------------- Il faut que mon formulaire soit ok pour que je puisse l'envoyer----------
    
//---------------------- EVENT LISTENER ENVOIE DU FORMULAIRE  -------------------------
function envoieFormulaire(){
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
        let products = articlesAuPanier.map(elt => elt.id);

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
         .then ((response) => {
            return response.json()})
         .then((json) => {
             window.open("confirmation.html?=" + json.orderId)
            console.log(json.orderId)
             })  
// ------- fermeture de l'event listener sur le bouton commander -----
    });
}
 
    getDataStored();
    prixTotal();
    panierVide();
    displayFormulaire();
    displayMontant();
    envoieFormulaire();






   

      