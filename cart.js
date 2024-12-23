// Initialize cart from sessionStorage
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Function to update the cart count on all pages
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
}

// Function to update the cart items display
function updateCartDisplay() {
  const cartItemsContainer = document.querySelector(".cart-items-container");
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
    <div class="item-image">
      <img src="img/${item.name}.jpg" alt="${item.name}">
    </div>
    <div class="item-details">
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <div class="item-quantity-controls">
        <button class="quantity-decrease" data-id="${item.id}">-</button>
        <span class="item-quantity">${item.quantity}</span>
        <button class="quantity-increase" data-id="${item.id}">+</button>
      </div>
    </div>
    <div class="item-total">
      <p>Total: $${itemTotal.toFixed(2)}</p>
    </div>
    <button class="remove-item" data-id="${item.id}">Remove</button>
  `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Update total price
  document.getElementById("total-price").textContent = `$${total.toFixed(2)}`;

  // Event listeners for removing items
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach(button => {
    button.addEventListener("click", removeItem);
  });

  // Event listeners for updating quantities
  const increaseButtons = document.querySelectorAll(".quantity-increase");
  const decreaseButtons = document.querySelectorAll(".quantity-decrease");

  increaseButtons.forEach(button => {
    button.addEventListener("click", increaseQuantity);
  });
  
  decreaseButtons.forEach(button => {
    button.addEventListener("click", decreaseQuantity);
  });
}

// Function for adding an item
function addToCart(event) {
  const button = event.target;
  const id = button.getAttribute("data-id");
  const name = button.getAttribute("data-name");
  const price = parseFloat(button.getAttribute("data-price"));

  const existingItem = cart.find(item => item.id == id);

  if (existingItem) {
    // Increase quantity if item exist
    existingItem.quantity++;
  } else {
    // Add to cart if item doesn't exist
    cart.push({ id, name, price, quantity: 1 });
  }

  // Save to SessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart on all pages
  updateCartCount();
}

// Function to remove an item
function removeItem(event) {
  const id = event.target.getAttribute("data-id");
  cart = cart.filter(item => item.id != id);

  // Save to sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Re-render the cart display
  updateCartDisplay();

  // Update the cart count
  updateCartCount();
}

// Function to increase quantity
function increaseQuantity(event) {
  const id = event.target.getAttribute("data-id");
  const item = cart.find(item => item.id == id);

  if (item) {
    item.quantity++;
    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
  }
}

// Function to decrease quantity
function decreaseQuantity(event) {
  const id = event.target.getAttribute("data-id");
  const item = cart.find(item => item.id == id);

  if (item && item.quantity > 1) {
    item.quantity--;
    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
  }
}

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", addToCart);
});

// updates cart
document.addEventListener("DOMContentLoaded", function () {
  // Update cart display
  if (window.location.pathname.includes("cart.html")) {
    updateCartDisplay();
  }

  // Update the cart count on other pages
  updateCartCount();
});

// Function to clear the cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");

  updateCartCount();

  // clear the cart display
  if (window.location.pathname.includes("cart.html")) {
    updateCartDisplay();
    
    alert("Your cart has been cleared.");
  }
}

// Function to handle order submission
function submitOrder() {+

  console.log("Order submitted successfully!");

  // Display a confirmation message to the user
  alert("Your order has been submitted. Thank you!");

  // Clear the cart after submitting the order
  clearCart();
}

// Listen for changes in sessionStorage
window.addEventListener("storage", () => {
  cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  if (window.location.pathname.includes("cart.html")) {
    updateCartDisplay();
  } else {
    updateCartCount();
  }
});

// Event listener for the form submission
document.getElementById("contact-form")?.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get values from the form
  const name = document.getElementById("name").value;
  const email = document.getElementById("c-email").value;
  const message = document.getElementById("message").value;
  const commentType = document.querySelector('select[name="commenttype"]').value;

  // Validate that all required fields are filled
  if (!name || !email || !message || !commentType) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  console.log("Form submitted:", { name, email, message, commentType });

  // Store in sessionStorage
  const formData = { name, email, message, commentType };
  localStorage.setItem("contact-form-data", JSON.stringify(formData));

  // Display a success message
  alert("Your message has been received. Thank you for contacting us!");

  // Reset the form
  document.getElementById("contact-form").reset();
});

  // Event listener for the form submission
  document.getElementById("subscribe-form")?.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the email value
  const email = document.getElementById("s-email").value;

  console.log("Subscribed with email:", email);

  // Display Thank you message
  alert("Thank you for subscribing!");
  
  // Clear form
  document.getElementById("s-email").value = '';
});