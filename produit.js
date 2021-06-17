// Creer une fonction qui va lire l'id dans l'url de la page produit. 
// passer l'id en parametre de fetch pour recup les infos de ce produit. 
// display les infos sur la page. 
    


// creer un bouton de personnalisation et stocker le choix du client. 
// ajouter au panier : 
    // envoyer l'info au serveur POST 
    // quand on ajoute au panier ya un 1 qui apparait en haut de la navigation coté panier. 
    // permettre de choisir la quantité à mettre au panier 


/*CREATION D'UNE FONCTION POUR LIRE L'URL et récupérer l'id */
//le programme doit lire l'url 
// récupérer l'id 
// retourner l'id

function getIdFromUrl(){
    let url = window.location.toString();
    let splitUrl = url.split("\=");
    let id = splitUrl[1];
 return id 
}

/*2. FETCH DES INFORMATIONS DU PRODUIT VIA L'ID*/

function getProductInfo() {
// En appelant getIdFromUrl dans la fonction, on evite de l'appeler pour rien en dehors et d'encombrer la stack pour rien. 
    let id = getIdFromUrl();
// Ajout de l'id dans l'url pour qu'il sache où aller et le / car c'est dans les spec. 
    let url = "http://localhost:3000/api/cameras/" + id; 
    fetch(url) 
        .then (function(response) {
            return response.json()
        })
        .then(function(data) {
            fonction1(data);
            console.log(data)
        })
        .catch(function(error) {
            console.log(error);
        });      
}

/* Créer DES fonctions qui afficheront les infos produit sur la page HTML 
et accessoirement créer le HTML*/
//fonction 1 
    //creation div image 
    // creation info "texte"
            //prix nom description 
    // bouton de personnalisation 
        // recuperer les infos du tableau lenses
        // creer les options de la balise select et les afficher
    // ajout au panier 
        // créer le bouton en HTML 
        // allez le chercher via son id 
        // evenement onClick qui genere a chaque clic un tableau [ Nom du produit, prix, option, id ?];
            // stocker ce tableau dans local storage. 




// Puisqu'on a appele fonction1 avec le parametre data, JS comprend que fonction1 a un parametre 
// et ce peu importe son nom. Data ou produit. si c'est la meme fonction c'est le meme parametre        


function fonction1(produit) {

    let select = document.getElementById("produit__personnalisation");
    let imageBox = document.getElementById("produit__image");
    let imgProduit = document.createElement("img");
        imgProduit.classList.add("produit__img");
        imgProduit.src = produit.imageUrl;
    imageBox.appendChild(imgProduit);

    let texteBox = document.getElementById("produit__texte");
    let prixProduit = document.createElement("p");
        prixProduit.classList.add("produit__prix");
    let prix = produit.price;
    let prixEspace = prix.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

        prixProduit.textContent = prixEspace + " euros";
    texteBox.appendChild(prixProduit);
    
    let descriptionProduit = document.createElement("p");
        descriptionProduit.classList.add("produit__description");
        descriptionProduit.textContent = produit.description;
    texteBox.appendChild(descriptionProduit);

    let idProduit = document.createElement("p");
        idProduit.classList.add("produit__id");
        idProduit.textContent = produit._id;
    texteBox.appendChild(idProduit);

    let nomProduit = document.createElement("p");
        nomProduit.classList.add("produit__nom");
        nomProduit.textContent = produit.name;
    texteBox.appendChild(nomProduit);

    let dropdownList = document.getElementById("produit__personnalisation");
    produit.lenses.forEach(function(lentille) {
        let option = document.createElement("option");
        option.value = lentille;
        option.textContent = lentille;
    dropdownList.appendChild(option);
    });


    let boutonPanier = document.getElementById("produit__panier");
    let quantitéProduit = 1;
// Partie EVENT LISTENER -------------------------------------------------------------
    boutonPanier.addEventListener('click', function(event){
    let infoProduit = {
        nomProduit : produit.name,
        idProduit : produit._id,
        prixProduit : produit.price,
    };

// Déclaration d'une variable produitdDansLocalStorage dans laquelle on placera les clés et valeurs du local storage

    let produitDansLocalStorage = JSON.parse(localStorage.getItem("achats"));

    if (produitDansLocalStorage) {
        produitDansLocalStorage.push(infoProduit);
        localStorage.setItem("achats", JSON.stringify(produitDansLocalStorage));
        console.log(produitDansLocalStorage);

    } else {
        produitDansLocalStorage = [];
        produitDansLocalStorage.push(infoProduit);
        localStorage.setItem("achats", JSON.stringify(produitDansLocalStorage))
        console.log(produitDansLocalStorage);

    }


    // localStorage.setItem(1, JSON.stringify(infoProduit))
//console.log(localStorage.getItem(1));
        }); 
        
        boutonPanier.onclick = function ajoutProduit() {
            quantitéProduit++; 
    let articlesAuPanier = document.getElementById("panier__nombre-articles");
        articlesAuPanier.textContent = quantitéProduit-1}; 
 };  

    
getProductInfo();