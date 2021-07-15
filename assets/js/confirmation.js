function getOrderIdFromUrl() {
        let url = window.location.toString();
        let splitUrl = url.split("\=");
        let orderId = splitUrl[1];
     return orderId
};

function getPrixTotal(){
    let panier = JSON.parse(localStorage.getItem("achats"));
    let x = [];
        for (let i = 0; i < panier.length; i++) { 
            let prix = panier[i].price /100;
            x.push(prix);
        }
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let total = x.reduce(reducer, 0);
    let totalOk = total.toString().replace(/(\d)(?=(\d{3})+\b)/g,'$1 ');
    return totalOk;
};

getPrixTotal();

function displayMessage() {
    let orderId = getOrderIdFromUrl();
    let confirmation = document.getElementById("confirmation");    
    let message = document.createElement("p");
    message.classList.add("message");
    message.textContent = "L'equipe d'Ocorino vous remercie pour votre confiance. Le montant de vos achat s'élève à " + getPrixTotal() + " euros.";
    
    let suiviCommande = document.createElement("p");
    suiviCommande.classList.add("message");
    suiviCommande.textContent = "Vous pouvez suivre votre colis grâce au numéro de commande suivant : " + getOrderIdFromUrl() + ".";

    let auRevoir = document.createElement("p");
    auRevoir.classList.add("message");
    auRevoir.textContent = "A bientôt sur Ocorino.fr !"

    confirmation.appendChild(message);
    confirmation.appendChild(suiviCommande);
    confirmation.appendChild(auRevoir);
};

displayMessage();