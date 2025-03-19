document.addEventListener("DOMContentLoaded", function () {
  // alert("Welcome to Sneaker Store! Enjoy your shopping.");

  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  updateCart();

  $("#cart-link").on("click", function (event) {
    event.preventDefault();
    showCart();
  });

  $(".shoes-add-to-cart").on("click", function () {
    const productElement = $(this).closest(".shoes-product");
    const productName = $(this).data("name");
    const productPrice = parseFloat($(this).data("price"));
    const productSize = productElement.find(".shoes-size").val();
    const productColor = productElement.find(".shoes-color").val();
    const productImg = $(this).data("img");
    addToCart(productName, productPrice, productSize, productColor, productImg);
  });

  // Close modal when clicking outside of it
  $(window).on("click", function (event) {
    if ($(event.target).is("#cart-modal")) {
      closeCart();
    }
  });
});

function addToCart(
  productName,
  productPrice,
  productSize,
  productColor,
  productImg
) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  cart.push({
    name: productName,
    price: productPrice,
    size: productSize,
    color: productColor,
    img: productImg,
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(
    `${productName} (${productSize}, ${productColor}) has been added to your cart.`
  );
  updateCart();
}

function updateCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let cartItems = $("#cart-items");
  let totalPrice = 0;

  cartItems.empty();

  cart.forEach((item, index) => {
    let li = $("<li></li>").html(
      `<img src="${item.img}" alt="${item.name}" class="cart-thumb"> ${
        item.name
      } (Size: ${item.size}, Color: ${item.color}) - $${item.price.toFixed(2)}
      <button class="remove-item" data-index="${index}">Remove</button>`
    );
    cartItems.append(li);
    totalPrice += item.price;
  });

  $("#cart-count").text(cart.length);
  $("#total-price").text(totalPrice.toFixed(2));

  // Add event listener for remove buttons
  $(".remove-item").on("click", function () {
    const index = $(this).data("index");
    removeFromCart(index);
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart(); // Update the cart display
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

// JavaScript to handle the dropdown menu functionality
document.addEventListener("DOMContentLoaded", (event) => {
  const dropdown = document.querySelector(".dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdown.addEventListener("mouseover", () => {
    dropdownContent.style.display = "block";
  });

  dropdown.addEventListener("mouseout", () => {
    dropdownContent.style.display = "none";
  });
});
