
const products = [
  {id: 1, name: "Smartphone", price: 15000, category: "Electronics", icon: "📱"},
  {id: 2, name: "Headphones", price: 2500, category: "Electronics", icon: "🎧"},
  {id: 3, name: "Laptop", price: 65000, category: "Electronics", icon: "💻"},
  {id: 4, name: "Sneakers", price: 3500, category: "Fashion", icon: "👟"},
  {id: 5, name: "Jacket", price: 2800, category: "Fashion", icon: "🧥"},
  {id: 6, name: "Watch", price: 1800, category: "Accessories", icon: "⌚"},
  {id: 7, name: "Backpack", price: 2200, category: "Accessories", icon: "🎒"},
  {id: 8, name: "Sunglasses", price: 1200, category: "Accessories", icon: "🕶️"}
];

let cart = [];
let category = "All";

const productContainer = document.getElementById("productContainer");
const cartItems = document.getElementById("cartItems");

function displayProducts() {
  const search = document.getElementById("searchInput").value.toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(search) &&
    (category === "All" || product.category === category)
  );

  productContainer.innerHTML = "";

  if (filtered.length === 0) {
    productContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach(product => {
    productContainer.innerHTML += `
      <div class="product-card">
        <div class="product-icon">${product.icon}</div>
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p><strong>KSh ${product.price.toLocaleString()}</strong></p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const item = cart.find(product => product.id === id);

  if (item) {
    item.quantity++;
  } else {
    const product = products.find(product => product.id === id);
    cart.push({...product, quantity: 1});
  }

  displayCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(product => product.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== id);
  }

  displayCart();
}

function displayCart() {
  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  }

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} × ${item.quantity}</span>
        <span>KSh ${(item.price * item.quantity).toLocaleString()}</span>
        <div>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
          <button onclick="changeQuantity(${item.id}, -1)">−</button>
        </div>
      </div>
    `;
  });

  document.getElementById("total").textContent = total.toLocaleString();
  document.getElementById("cartCount").textContent = count;
}

document.getElementById("searchInput")
  .addEventListener("input", displayProducts);

document.querySelectorAll(".filters button").forEach(button => {
  button.addEventListener("click", () => {
    category = button.dataset.category;
    displayProducts();
  });
});

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your shopping cart is empty!");
    return;
  }

  alert("Demo checkout successful! Your total is KSh " +
    document.getElementById("total").textContent);

  cart = [];
  displayCart();
});

displayProducts();
displayCart();
