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
        })
        .catch(function(error) {
        });      
};


// Puisqu'on a appele fonction1 avec le parametre data, JS comprend que fonction1 a un parametre 
// et ce peu importe son nom. Data ou produit. si c'est la meme fonction c'est le meme parametre        

function fonction1(produit) {

    let select = document.getElementById("produit__personnalisation");
    let imageBox = document.getElementById("produit__image");
    let imageUrl = document.createElement("img");
        imageUrl.classList.add("produit__img");
        imageUrl.src = produit.imageUrl;
    imageBox.appendChild(imageUrl);

    let texteBox = document.getElementById("produit__texte");
    let price = document.createElement("p");
        price.classList.add("price");
    let prix = produit.price /100;

        price.textContent = prix + " euros";
    texteBox.appendChild(price);
    
    let description = document.createElement("p");
        description.classList.add("description");
        description.textContent = produit.description;
    texteBox.appendChild(description);

    let id = document.createElement("p");
        id.classList.add("id");
        id.textContent = produit._id;
    texteBox.appendChild(id);

    let name = document.createElement("p");
        name.classList.add("name");
        name.textContent = produit.name;
    texteBox.appendChild(name);

    let dropdownList = document.getElementById("produit__personnalisation");
    produit.lenses.forEach(function(lentille) {
        let option = document.createElement("option");
        option.value = lentille;
        option.textContent = lentille;
    dropdownList.appendChild(option);
    });

/*
ajouter la quantité au clic, utiliser map pour parcourir le tableau et voir si leproduit exite dans le ls, 
et si oui incrementer la qua,tité sinon le pusher.*/



    let boutonPanier = document.getElementById("produit__panier");
    let quantitéProduit = 1;
    
// ------------------------------------Partie EVENT LISTENER -------------------------------------------------------------
    boutonPanier.addEventListener('click', function(event){
    let infoProduit = {
        id : produit._id,
        name : produit.name,
        price : produit.price,
        description : produit.description,
        imageUrl : produit.imageUrl 
    };

// Déclaration d'une variable produitdDansLocalStorage dans laquelle on placera les clés et valeurs du local storage

    let produitDansLocalStorage = JSON.parse(localStorage.getItem("achats"));

    if (produitDansLocalStorage) {
        produitDansLocalStorage.push(infoProduit);
        localStorage.setItem("achats", JSON.stringify(produitDansLocalStorage));
    } else {
        produitDansLocalStorage = [];
        produitDansLocalStorage.push(infoProduit);
        localStorage.setItem("achats", JSON.stringify(produitDansLocalStorage))
    }

    let chiffrePanier = document.getElementById("panier__nombre-articles");
    chiffrePanier.textContent = produitDansLocalStorage.length;
    }); 
    // -------------------- fin event listener ----------------------------
};  

 getProductInfo();   
 
    let chiffrePanier = document.getElementById("panier__nombre-articles");
    let produitDansLocalStorage = JSON.parse(localStorage.getItem("achats"));
    chiffrePanier.textContent = produitDansLocalStorage.length;