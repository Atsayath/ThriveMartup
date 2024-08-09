document.addEventListener("DOMContentLoaded", function() {
  var cart = JSON.parse(localStorage.getItem("cart")) || {};
  var favorites = JSON.parse(localStorage.getItem("favorites")) || {};

  

  function updateCartTable() {
      var cartContainers = document.querySelectorAll("#cart-container");
      var totalAmountElements = document.querySelectorAll("#total-amount");
      var totalAmount = 0;

      cartContainers.forEach(function(cartContainer) {
          cartContainer.innerHTML = ""; 

          for (var id in cart) {
              var item = cart[id];
              var row = document.createElement("tr");

              row.innerHTML = `
                  <td>${item.name}</td>
                  <td>Rs. ${item.price}</td>
                  <td>${item.quantity}</td>
                  <td>Rs. ${item.price * item.quantity}</td>
                  <td><button class="remove-item" data-id="${id}">Remove</button></td>
              `;

              cartContainer.appendChild(row);
              totalAmount += item.price * item.quantity;
          }

          totalAmountElements.forEach(function(element) {
              element.textContent = totalAmount;
          });

          var removeButtons = cartContainer.querySelectorAll(".remove-item");
          removeButtons.forEach(function(button) {
              button.addEventListener("click", function() {
                  var id = this.getAttribute("data-id");
                  delete cart[id];
                  saveCart();
                  updateCartTable();
              });
          });
      });
  }

  function addToCart(id, name, price, quantity) {
      if (cart[id]) {
          cart[id].quantity += quantity;
      } else {
          cart[id] = { id: id, name: name, price: price, quantity: quantity };
      }
      saveCart();
      updateCartTable();
  }


  function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
  }

  
  function saveFavorites() {
      localStorage.setItem("favorites", JSON.stringify(cart));
  }

 
  function applyFavorites() {
      cart = JSON.parse(localStorage.getItem("favorites")) || {};
      saveCart();
      updateCartTable();
  }

 
  function resetCart() {
      cart = {};
      saveCart();
      updateCartTable();
  }

  var productBoxes = document.querySelectorAll(".box");
  productBoxes.forEach(function(box) {
      var id = box.getAttribute("data-id");
      var name = box.getAttribute("data-name");
      var price = parseFloat(box.getAttribute("data-price"));
      var input = box.querySelector(".quantity");
      var addButton = box.querySelector(".bi-plus-square-fill");
      var subtractButton = box.querySelector(".bi-dash-square-fill");
      var addToCartButton = box.querySelector(".btn-cart");

      addButton.addEventListener("click", function() {
          input.value = parseInt(input.value) + 1;
      });

      subtractButton.addEventListener("click", function() {
          if (input.value > 0) {
              input.value = parseInt(input.value) - 1;
          }
      });

      addToCartButton.addEventListener("click", function() {
          var quantity = parseInt(input.value);
          if (quantity > 0) {
              addToCart(id, name, price, quantity);
              input.value = 0;
          }
      });
  });

  document.getElementById("add-to-favorites").addEventListener("click", function() {
      saveFavorites();
  });

  document.getElementById("apply-favorites").addEventListener("click", function() {
      applyFavorites();
  });

  document.getElementById("reset-cart").addEventListener("click", function() {
      resetCart();
  });

  updateCartTable();
});
