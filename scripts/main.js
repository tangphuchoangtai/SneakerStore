document.addEventListener("DOMContentLoaded", function () {
  alert("Welcome to Sneaker Store! Enjoy your shopping.");

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
      `<img src="${item.img}" alt="${item.name}" class="cart-item-img"> ${item.name} 
      <div class="cart-item-info">
         <p> | Size: ${item.size} | Color: ${item.color} | - $${item.price}</p>
      </div>
      <button class="remove-item" data-index="${index}">
      Remove
      </button>`
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
// chức năng search
document.getElementById("search-btn").addEventListener("click", function () {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase(); // Lấy giá trị tìm kiếm và chuyển thành chữ thường
  const products = document.querySelectorAll(".shoes-product"); // Lấy tất cả sản phẩm

  products.forEach((product) => {
    const productName = product.querySelector("h3").textContent.toLowerCase(); // Lấy tên sản phẩm và chuyển thành chữ thường

    if (productName.includes(searchTerm)) {
      product.style.display = "block"; // Hiển thị sản phẩm nếu khớp
    } else {
      product.style.display = "none"; // Ẩn sản phẩm nếu không khớp
    }
  });
});
// nhấn enter để search
document
  .getElementById("search-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      document.getElementById("search-btn").click();
    }
  });

// Danh sách sản phẩm (có thể lấy từ API hoặc định nghĩa sẵn
const products = [
  {
    id: 1,
    name: "Sporty Shoes",
    price: 99.99,
    img: "./images/giay1.jpg",
    description: "High-quality sporty shoes",
    sizes: ["7", "8", "9", "10"],
    colors: ["Red", "Blue", "Black"],
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 79.99,
    img: "./images/giay2.jpg",
    description: "Comfortable running shoes",
    sizes: ["7", "8", "9", "10"],
    colors: ["Red", "Blue", "Black"],
  },
  {
    id: 3,
    name: "Casual Shoes",
    price: 119.99,
    img: "./images/giay3.jpg",
    description: "Comfortable running shoes",
    sizes: ["7", "8", "9", "10"],
    colors: ["Red", "Blue", "Black"],
  },
  {
    id: 4,
    name: "Casual Shoes",
    price: 120.0,
    img: "./images/giay4.jpg",
    description: "Comfortable running shoes",
    sizes: ["7", "8", "9", "10"],
    colors: ["Red", "Blue", "Black"],
  },
  {
    id: 5,
    name: "Model Shoes",
    price: 250.0,
    img: "./images/giay5.jpg",
    description: "Comfortable running shoes",
    sizes: ["7", "8", "9", "10"],
    colors: ["Red", "Blue", "Black"],
  },
  {
    id: 6,
    name: "Classic Shoes",
    price: 179.99,
    img: "./images/giay6.jpg",
    description: "Comfortable running shoes",
    sizes: ["7", "8", "9", "10"],
    colors: ["Red", "Blue", "Black"],
  },
];

// Danh sách sản phẩm dành cho women-shoes.html
const womenProducts = [
  {
    id: 1,
    name: "Elegant Heels",
    price: 129.99,
    img: "./images/ws1.jpg",
    description: "Stylish and comfortable heels for any occasion.",
    sizes: ["5", "6", "7", "8"],
    colors: ["Red", "Black", "Beige"],
  },
  {
    id: 2,
    name: "Casual Flats",
    price: 89.99,
    img: "./images/ws2.jpg",
    description: "Perfect flats for everyday wear.",
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["Blue", "White", "Pink"],
  },
  {
    id: 3,
    name: "Casual Shoes",
    price: 99.99,
    img: "./images/ws3.jpg",
    description: "Lightweight and durable Casual Shoes.",
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["Purple", "Gray", "Black"],
  },
  {
    id: 4,
    name: "Casual Shoes",
    price: 149.99,
    img: "./images/ws4.jpg",
    description: "Trendy ankle boots for a chic look.",
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["Brown", "Black", "Tan"],
  },
  {
    id: 5,
    name: "Nike Shoes",
    price: 79.99,
    img: "./images/ws5.jpg",
    description: "Comfortable sandals for summer days.",
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["Yellow", "White", "Blue"],
  },
  {
    id: 6,
    name: "Puma Shoes",
    price: 139.99,
    img: "./images/ws6.jpg",
    description: "Timeless pumps for formal occasions.",
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["Black", "Red", "Nude"],
  },
];

const otherProduct = [
  {
    id: 1,
    name: "Backpack Sport",
    price: 150.0,
    img: "./images/balo3.jpg",
    description: "Stylish and comfortable heels for any occasion.",
    sizes: ["M", "L", "XL"],
    colors: ["Black"],
  },
  {
    id: 2,
    name: "Backpack Sport",
    price: 150.0,
    img: "./images/balo2.jpg",
    description: "Stylish and comfortable heels for any occasion.",
    sizes: ["M", "L", "XL"],
    colors: ["Black"],
  },
  {
    id: 3,
    name: "Backpack Laptop",
    price: 150.0,
    img: "./images/balo1.jpg",
    description: "Stylish and comfortable heels for any occasion.",
    sizes: ["M", "L", "XL"],
    colors: ["Black"],
  },
];
// Lưu thông tin sản phẩm vào Local Storage khi bấm vào sản phẩm Other product
document.querySelectorAll(".other-product-lines").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
    const productId = parseInt(link.getAttribute("data-id"));
    const product = otherProduct.find((p) => p.id === productId);

    if (product) {
      localStorage.setItem("selectedProduct", JSON.stringify(product)); // Lưu sản phẩm vào Local Storage
      window.location.href = "product-detail.html"; // Chuyển hướng đến trang chi tiết sản phẩm
    }
  });
});

// Lưu thông tin sản phẩm vào Local Storage khi bấm vào sản phẩm
document.querySelectorAll(".product-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
    const productId = parseInt(link.getAttribute("data-id"));
    const product = products.find((p) => p.id === productId);

    if (product) {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product-detail.html"; // Chuyển hướng đến trang chi tiết sản phẩm
    }
  });
});

// Lưu thông tin sản phẩm vào Local Storage khi bấm vào sản phẩm trong women-shoes.html
document.querySelectorAll(".women-product-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
    const productId = parseInt(link.getAttribute("data-id")); // Lấy ID sản phẩm từ thuộc tính data-id
    const product = womenProducts.find((p) => p.id === productId); // Tìm sản phẩm trong danh sách womenProducts

    if (product) {
      localStorage.setItem("selectedProduct", JSON.stringify(product)); // Lưu sản phẩm vào Local Storage
      window.location.href = "product-detail.html"; // Chuyển hướng đến trang chi tiết sản phẩm
    }
  });
});
