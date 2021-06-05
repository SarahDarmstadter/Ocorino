
/* Template encart produit*/

let cardsProduit = document.getElementsByClassName("cards_produit");

let newCard = document.createElement("div");
    newCard.classList.add("cardJS");
cardsProduit.appendChild(newCard);

let title = document.createElement("h2");
    title.classList.add("nom_produit");
    title.innerHTML="Nom du Produit JS";
newCard.appendChild(title);

let description = document.createElement("p");
    description.classList.add("prix");
    description.innerHTML ="Prix";
newCard.appendChild(description);

let imgProduit = document.createElement("img");
    imgProduit.classList.add("img_produit");
    imgProduit.src = "file:///C:/Users/sarah/OneDrive/Desktop/Ocarino/logo_ocarino.PNG"
newCard.appendChild(imgProduit);



    