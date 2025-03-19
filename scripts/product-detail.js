// Get data URL
const params = new URLSearchParams(window.location.search);
const productName = params.get("name");
const productPrice = params.get("price");
const productImg = params.get("img");
const productDescription = params.get("description");

// Show Data
document.getElementById("product-name").textContent = productName;
document.getElementById("product-price").textContent = `$${productPrice}`;
document.getElementById("product-img").src = productImg;
document.getElementById("product-description").textContent = productDescription;
