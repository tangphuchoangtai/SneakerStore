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
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <p>${item.name}</p>
        <p>Size: ${item.size}, Color: ${item.color}</p>
        <p>Price: $${item.price}</p>
      </div>
    `;
    cartItems.appendChild(li);
    totalPrice += parseFloat(item.price);
  });

  // Cập nhật tổng giá tiền
  totalPriceElement.textContent = totalPrice.toFixed(2);
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

  // Cập nhật số lượng giỏ hàng ngay lập tức
  updateCartCount();

  // Cập nhật nội dung giỏ hàng ngay lập tức
  updateCartContent();
});

// Cập nhật số lượng giỏ hàng và nội dung khi tải trang
updateCartCount();
updateCartContent();
