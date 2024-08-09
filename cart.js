document.addEventListener("DOMContentLoaded", function() {
  var buyNowButton = document.querySelector(".bnb .buy-xx");
  var orderFormContainer = document.getElementById("order-form-container");

  buyNowButton.addEventListener("click", function(event) {
      event.preventDefault();
      orderFormContainer.style.display = "block";
      orderFormContainer.scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var orderForm = document.getElementById("order-form");

  orderForm.addEventListener("submit", function(event) {
      event.preventDefault();

      var name = document.getElementById("name").value;

      var welcomeMessageDiv = document.getElementById("welcome-message");
      welcomeMessageDiv.innerHTML = `<p>Thank you for your order, <strong>${name}</strong>! Your order is being processed.</p>`;
  });

});
