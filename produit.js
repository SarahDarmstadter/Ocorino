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
            fonction2(data);
            console.log(data)
        })
        .catch(function(error) {
            console.error(error);
        });      
}

/* Créer DES fonctions qui afficheront les infos produit sur la page HTML 
et accessoirement créer le HTML*/
//fonction 1 
    //creation div image 
    // creation info "texte"
            //prix nom description 
//fonction 2
    // bouton de personnalisation 
        // recuperer les infos du tableau lenses
        // creer les options de la balise select et les afficher
// fonction 3 
    // ajout au panier 
        // créer le bouton en HTML 
        // allez le chercher via son id 
        // evenement onClick qui envoie prix, nom, l'id, la quantité  du produit via l'url de la future page panier. 
            //A creuser 



// Puisqu'on a appele fonction1 avec le parametre data, JS comprend que fonction1 a un parametre 
// et ce peu importe son nom. Data ou produit. si c'est la meme fonction c'est le meme parametre        


function fonction1(produit) {
    let imageBox = document.getElementById("produit__image");
    let imgProduit = document.createElement("img");
        imgProduit.src = produit.imageUrl;
    imageBox.appendChild(imgProduit);

// A TERMINER 
}

function fonction2(produit) {
    let dropdownList = document.getElementById("produit__personnalisation");
    produit.lenses.forEach(function(choix) {
        let option = document.createElement("option");
        option.value = choix;
        option.textContent = choix;
        dropdownList.appendChild(option);
    })






}


getProductInfo();
