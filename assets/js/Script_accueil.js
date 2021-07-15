/*CREATION FONCTION POUR RECUPERER LES DONNEES*/

fetch('http://localhost:3000/api/cameras') 
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        data.forEach(function(produit){
            createCard(produit)
        })
    })
    .catch(function(error) {
        console.error(error);
    });

let cardsProduit = document.getElementById("cards_produit");
function createCard(data) {

// card sert à créer la div. 
    let card = document.createElement("div");
    card.classList.add("newCard");

// Récuperer le parent qui contient les div que l'on a créées
    let cardsProduit = document.getElementById("cards_produit");
// On met la div dans le DOM. 
    cardsProduit.appendChild(card);

// newCard sert à aller chercher LES div avec comme classe newCard vu que mnt elles sont dans le DOM.
    let newCard = document.getElementsByClassName("newCard");
        
    let lien = document.createElement("a");
        lien.classList.add("lien");
        lien.href = "produit.html?id=" + data._id;
    
    let img = document.createElement("div");
        img.classList.add("img__produit" + "--" + data._id);
        img.classList.add("img__produit");
        img.style.backgroundImage = "url(" + data.imageUrl + ")"; 
        img.style.backgroundRepeat = "no-repeat";

        newCard[newCard.length - 1].appendChild(img)

    let divTexte = document.createElement("div");
        divTexte.classList.add("description__produit");
        newCard[newCard.length - 1].appendChild(divTexte);

    let name = document.createElement("p");
        name.classList.add("name");
        name.textContent = data.name;
        divTexte.appendChild(name);

    let id = document.createElement("p");
        id.classList.add("id");
        id.textContent = data._id;
        divTexte.appendChild(id);
    
    let description = document.createElement("p");
        description.classList.add("description");
        description.textContent = data.description; 
        divTexte.appendChild(description)
    
    let price = document.createElement("p");
        price.classList.add("price");
    let prix = data.price /100;
    let prixEspace = prix.toString().replace(/(\d)(?=(\d{3})+\b)/g,'$1 ');
        price.textContent = prixEspace + " euros"; 
       divTexte.appendChild(price)
    
    let enSavoirPlus = document.createElement("button");
        enSavoirPlus.classList.add("produit__bouton");
        enSavoirPlus.textContent = " En savoir plus";
        enSavoirPlus.addEventListener("click", function(e){
        e.preventDefault();
        window.open("assets/pages/produit.html?id=" + data._id);
        });
        divTexte.appendChild(enSavoirPlus);
};

let chiffrePanier = document.getElementById("panier__nombre-articles");
let produitDansLocalStorage = JSON.parse(localStorage.getItem("achats"));
chiffrePanier.textContent = produitDansLocalStorage.length;