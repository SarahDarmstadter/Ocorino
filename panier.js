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
console.log(listeArticles)

// ---------- creation d'une fonction pour récuperer chaque données de chaque tableau 

function getDataStored (localStorage) {

    for (let i =0; i < articlesAuPanier.length; i++) {
    
    let imgProduit = document.createElement("img");
        imgProduit.classList.add("produit__img");
        imgProduit.src = articlesAuPanier[i].imageProduit;

    let divArticle = document.createElement("div");
        divArticle.classList.add("div_produit");
        divArticle.appendChild(imgProduit);
    listeArticles.appendChild(divArticle);
        
    let divTexte = document.createElement("div");
        divTexte.classList.add("div_produit__texte");
    divArticle.appendChild(divTexte);

    let articleNom = document.createElement("p");
        articleNom.classList.add("article_nom");
        articleNom.textContent = articlesAuPanier[i].nomProduit;
        divTexte.appendChild(articleNom);

    let articleDescription = document.createElement("p");
        articleDescription.classList.add("article_description");
        articleDescription.textContent = articlesAuPanier[i].descriptionProduit;
        divTexte.appendChild(articleDescription);

    let articlePrice = document.createElement("p");
        articlePrice.classList.add("article_price");
        articlePrice.textContent = articlesAuPanier[i].prixProduit / 100 + " euros";
        divTexte.appendChild(articlePrice);
        
    let retirerDuPanier = document.createElement("button");
        retirerDuPanier.id = "supprimer";
        retirerDuPanier.classList.add("supprimer");
        retirerDuPanier.innerText = "Supprimer";
        divTexte.appendChild(retirerDuPanier);

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
panierVide()

// ---------------- creation d'une fonction pour afficher le formulaire de commande -------
 


 // ---- fonction formulaire ------------------------------------




//------------creation d'une fonction pour retirer un article du panier -----------------------------------

function supprimerArticle(localStorage){

    let retirerDuPanier = document.getElementById("supprimer");
        retirerDuPanier.addEventListener("click", function(event){
        for (let i=0; i< articlesAuPanier.length; i++) {
            let nouveauPanier = articlesAuPanier.indexOf(i);
                if (i > -1) {
  articlesAuPanier.splice(i, 1);
}
    console.log(articlesAuPanier);
    }

// ----------- fermeture event listener
});
//----------------- fermeture de la fonction supprimer l'article
}

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
};

//----- fin de la fonction Prix total

getDataStored();
supprimerArticle();
prixTotal();

//-------------------insertion formlaire HTML en JS comme ca il ne s'affiche pas si le panier est vide ----------------------
function insertionFormulaire() {
    let placeDuFormulaire = document.getElementById("panier__articles");

    let formulaire = `
    <form method="POST" class="formulaire" id="formulaire">
                <fieldset>
                    <legend>Contact</legend>
                        <label for="lastname"> Nom</label>
                            <input type="text" id="lastname" name="lastname" required="Veuillez remplir le champs">
                        <label for="firstname"> Prénom </label>
                            <input type="text" id="firstname" name="firstname" required="Veuillez remplir le champs">
                        <label for="email"> Adresse mail</label>
                            <input type="email" id="email" class="email" required="Veuillez renseigner votre email">
                        <label for="telephone">Téléphone</label>
                            <input type="tel" id="telephone" class="telephone" required="Entrez un numéro de telephone">
                
                <fieldset>
                    <legend>Adresse de livraison</legend>
                        <label for="adress">Adresse de livraison</label>
                            <input type="text" class="adress" id="adress" required="Veuillez remplir ce champs">
                        <label for="city">Code postale</label>
                            <input type="text" class="city" id="city" required="Veuillez remplir ce champs">
                        <label for="pays">Pays</label>
                            <input type="text" class="pays" id="pays" required="Veuillez remplir ce champs">
                </fieldset>
                <fieldset>
                    <legend>Moyen de paiement</legend>
                        <input id="visa" name="type_de_carte" type="radio">
                        <label for="visa">VISA</label>

                        <input id="amex" name="type_de_carte" type="radio">
                        <label for="amex">AmEx</label>

                        <input id="mastercard" name="type_de_carte" type="radio">
                        <label for="mastercard">Mastercard</label>

                        <label for="numero_de_carte">Numero de carte</label>
                            <input id="numero_de_carte" name="numero_de_carte" type="number" required="Champs obligatoire">
                        <label for="securite">Code sécurité</label>
                            <input id="securite" name="securite" type="number" required="Champs obligatoire">
                        <label for=name>Nom figurant sur la carte</label>
                            <input id="nom-porteur" name=nom-porteur type="text" required="Champs obligatoire">      
                      </fieldset>

                      <button type="submit" id="commander" class="commander">Commander</button>
                </form> `

                placeDuFormulaire.insertAdjacentHTML("afterend", formulaire);
}

insertionFormulaire(); 

// Au clic sur "commander"; il faut stocker les donnnées du formulaire dans le local storage"

//---------------------- Event Listener sur le clic commander -------------------------

let boutonCommander = document.getElementById("commander");

    boutonCommander.addEventListener("click", function(event) {
    event.preventDefault();
//--------- récupérartion des valeurs des champs du formulaire ------------------
        //------------- creation objet contact-----------------

        let contact = {

        firstname : document.getElementById("firstname").value,
        lastname : document.getElementById("lastname").value,
        email : document.getElementById("email").value,
        adress : document.getElementById("adress").value,
        city : document.getElementById("city").value,
        }
        console.log(contact)

        //---------------------Stockage de contact dans le local storage --------------

        // Pour stocker une valeur dans le local storage il faut utiliser la,methode stringify. 
        localStorage.setItem("contact", JSON.stringify(contact));

        //------------creation d'un objet pour stocker les informations à envoyer au serveur

        let infoAEnvoyer = {
            contact,
            articlesAuPanier
        }

        console.log("infoaenvoyer")
        console.log(infoAEnvoyer);


// ------- fermeture de l'event listener sur le bouton commander -----
    })




    /*VALIDATION DES DONNES DU formulaire
    envoie des données au server
    recuperation d'un id de commande */
