
let c = 0; // counter cart
const prods_ = {}; // Object to track product quantities

// get file json
fetch("./produits.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Error Data');
    }
    return response.json();
  })
  .then((data) => {
    const contentDiv = document.getElementsByClassName('content')[0];
    if (!contentDiv) {
      console.error('Element with class "content" not found');
      return;
    }

    data.produits.forEach((v) => {
      const produitDiv = document.createElement('div');
      produitDiv.classList.add('col-3', 'card');
      produitDiv.id = v.id;

      produitDiv.innerHTML = `
        <h5 class="card-header">${v.nom}</h5>
        <img src="${v.image}" alt="${v.nom}" style="width:100%; height:auto;">
        <p class="card-body">${v.description}</p>
        <h6 class="card-footer">
          prix : ${v.prix} DH
          <button class="btn add-to-cart" data-id="${v.id}">+</button>
          <span class="quantity" data-id="${v.id}">0</span>
          <button class="btn rem-to-cart" data-id="${v.id}">-</button>
        </h6>
      `;

      contentDiv.appendChild(produitDiv);

      // Ajouter événement pour le bouton "+"
      const addButton = produitDiv.querySelector('.add-to-cart');
      addButton.addEventListener('click', function() {
        if (!prods_[v.id]) {
          prods_[v.id] = { ...v, quantity: 0 };
        }
        prods_[v.id].quantity++;
        c++;
        document.querySelector('span#c').innerHTML = c;
        produitDiv.querySelector('.quantity').innerText = prods_[v.id].quantity;
      });

      // Ajouter événement pour le bouton "-"
      const remButton = produitDiv.querySelector('.rem-to-cart');
      remButton.addEventListener('click', function() {
        if (prods_[v.id] && prods_[v.id].quantity > 0) {
          prods_[v.id].quantity--;
          c--;
          document.querySelector('span#c').innerHTML = c;
          produitDiv.querySelector('.quantity').innerText = prods_[v.id].quantity;

          // Supprimer le produit si la quantité atteint 0
          if (prods_[v.id].quantity === 0) {
            delete prods_[v.id];
          }
        }
      });
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

document.getElementById('cartShow').addEventListener('click', () => {
  const panierContent = Object.values(prods_).map((v) => 
    `<pre>${v.nom} x ${v.quantity} : ${(v.prix * v.quantity).toFixed(2)} DH</pre>`).join("");

  document.getElementsByClassName('side-right')[0].innerHTML = 
    Object.keys(prods_).length === 0 ? '<h4>Panier Vide</h4>' : `<h4>Panier</h4>${panierContent}`;

  const total = Object.values(prods_).reduce((sum, v) => sum + v.prix * v.quantity, 0);
  document.getElementsByClassName('side-right')[0].innerHTML += `<h5>Total : ${total.toFixed(2)} DH</h5>`;
});
 
//  sortir  panier right
document.getElementById('cartShow').addEventListener('click', () => {
  const sideRight = document.getElementsByClassName('side-right')[0];
  const panierContent = Object.values(prods_).map((v) => 
    `<pre>${v.nom} x ${v.quantity} : ${(v.prix * v.quantity).toFixed(2)} DH</pre>`).join("");

  sideRight.innerHTML = 
    Object.keys(prods_).length === 0 ? '<h4>Panier Vide</h4>' : `<h4>Panier plein</h4>${panierContent}`;

    
    












  const total = Object.values(prods_).reduce((sum, v) => sum + v.prix * v.quantity, 0);
  sideRight.innerHTML += `<h5>Total : ${total.toFixed(2)} DH</h5>`;

  // Add animation class to show the cart
  sideRight.classList.add('show-panier');

  // Remove animation class after 3 seconds to hide the cart
  setTimeout(() => {
    sideRight.classList.remove('show-panier');
  }, 3000);
});



