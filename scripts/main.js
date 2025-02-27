document.addEventListener("DOMContentLoaded", function () {
  alert("Welcome to Sneaker Store! Enjoy your shopping.");

  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  updateCart();

  $("#cart-link").on("click", function () {
    showCart();
  });

  $(".add-to-cart").on("click", function () {
    const productName = $(this).data("name");
    const productPrice = parseFloat($(this).data("price"));
    addToCart(productName, productPrice);
  });
});

function addToCart(productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  cart.push({ name: productName, price: productPrice });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${productName} has been added to your cart.`);
  updateCart();
}

function updateCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let cartItems = $("#cart-items");
  let totalPrice = 0;

  cartItems.empty();

  cart.forEach((item) => {
    let li = $("<li></li>").text(`${item.name} - $${item.price.toFixed(2)}`);
    cartItems.append(li);
    totalPrice += item.price;
  });

  $("#cart-count").text(cart.length);
  $("#total-price").text(totalPrice.toFixed(2));
}

function closeCart() {
  $("#cart-modal").hide();
}

function showCart() {
  $("#cart-modal").show();
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.length > 0) {
    alert("Thank you for your purchase!");
    localStorage.setItem("cart", JSON.stringify([]));
    updateCart();
    closeCart();
  } else {
    alert("Your cart is empty.");
  }
}
