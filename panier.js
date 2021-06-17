/* 1. récuperer les données du local storage pour savoir quels produits sont ajoutés au panier.
2. afficher les produits au panier 
3. calculer un montant total et l'afficher
4. afficher un formulaire de commande en respectant les champs
5. bouton commander qui renvoie vers une page de remerciement. */ 







let infosStockées = [];
infosStockées.push(produit.name, produit.price, produit._id, quantitéProduit, dropdownList.selectedIndex);
localStorage.setItem(1, infosStockées);
console.log(localStorage.getItem(1));