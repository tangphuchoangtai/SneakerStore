// Lấy dữ liệu sản phẩm từ Local Storage
const product = JSON.parse(localStorage.getItem("selectedProduct"));

if (product) {
  // Hiển thị thông tin sản phẩm trên trang
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = `$${product.price}`;
  document.getElementById("product-img").src = product.img;
  document.getElementById("product-description").textContent =
    product.description;

  // Hiển thị danh sách size
  const sizeSelect = document.getElementById("product-size");
  product.sizes.forEach((size) => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    sizeSelect.appendChild(option);
  });

  // Hiển thị danh sách màu sắc
  const colorSelect = document.getElementById("product-color");
  product.colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    colorSelect.appendChild(option);
  });
} else {
  // Nếu không có dữ liệu, chuyển hướng về trang danh sách sản phẩm
  window.location.href = "man-shoes.html";
}

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

// Hàm cập nhật nội dung giỏ hàng
function updateCartContent() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  // Xóa nội dung cũ của giỏ hàng
  cartItems.innerHTML = "";

  // Tính tổng giá tiền
  let totalPrice = 0;

  // Thêm từng sản phẩm vào danh sách giỏ hàng
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <p>${item.name}</p>
        <p>Size: ${item.size}, Color: ${item.color}</p>
        <p>Price: $${item.price}</p>
        <button class="remove-item" data-index="${index}">Remove</button>
      </div>
    `;
    cartItems.appendChild(li);
    totalPrice += parseFloat(item.price);
  });

  // Cập nhật tổng giá tiền
  totalPriceElement.textContent = totalPrice.toFixed(2);

  // Thêm sự kiện xóa sản phẩm
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      removeFromCart(index);
    });
  });
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Xóa sản phẩm tại vị trí index
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartContent();
}

// Thêm sự kiện cho nút "Add to Cart"
document.querySelector(".btn-add-to-cart").addEventListener("click", () => {
  const selectedSize = document.getElementById("product-size").value;
  const selectedColor = document.getElementById("product-color").value;

  if (!selectedSize || !selectedColor) {
    alert("Please select a size and color.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({
    name: product.name,
    price: product.price,
    img: product.img,
    description: product.description,
    size: selectedSize,
    color: selectedColor,
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} has been added to your cart!`);

  // Cập nhật giỏ hàng
  updateCartCount();
  updateCartContent();
});

// Cập nhật giỏ hàng khi tải trang
updateCartCount();
updateCartContent();

// Hàm xử lý khi nhấn nút "Checkout"
function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase!");
  localStorage.setItem("cart", JSON.stringify([])); // Xóa giỏ hàng sau khi thanh toán
  updateCartCount();
  updateCartContent();
}

// Thêm sự kiện cho nút "Checkout"
document.getElementById("checkout-btn").addEventListener("click", checkout);

// Hàm mở modal giỏ hàng
function openCart() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.style.display = "block";
}

// Hàm đóng modal giỏ hàng
function closeCart() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.style.display = "none";
}

// Thêm sự kiện cho liên kết giỏ hàng
document.getElementById("cart-link").addEventListener("click", (event) => {
  event.preventDefault();
  openCart();
});

// Đóng modal khi bấm vào nút "x"
document.querySelector(".close").addEventListener("click", closeCart);

// Đóng modal khi bấm ra ngoài modal
window.addEventListener("click", (event) => {
  const cartModal = document.getElementById("cart-modal");
  if (event.target === cartModal) {
    closeCart();
  }
});
