const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar"); 

if (bar) {
 bar.addEventListener('click', () => {
  nav.classList.add("active")
 })
} ;

if (close) {
 close.addEventListener('click', () => {
  nav.classList.remove("active")
 })
} 

// Cart Working JS

if (document.readyState == "loading") {
 document.addEventListener("DOMContentLoaded", ready);
} else {
 ready ();
}

// Making Function

function ready () {
 // Remove Items from Cart

 let removeCartButtons = document.getElementsByClassName('far fa-times-circle');

 for (let i = 0; i < removeCartButtons.length; i++) {
  let button = removeCartButtons[i];
  button.addEventListener('click', removeCartItem);
 }

 // quantity changes

 let quantityInputs = document.getElementsByClassName('cart-quantity');

 for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener ("change", quantityChanged);
 }

 // Add to Cart

 let addCart = document.getElementsByClassName('add-cart');
 for (let i = 0; i < addCart.length; i++) {
  let button = addCart[i];
  button.addEventListener("click", addCartClicked)
 }
}

// remove item from cart 

function removeCartItem (e) {
 let buttonClicked = e.target;
 buttonClicked.parentElement.parentElement.remove();
 updateTotal()
}

// quantity Changes

function quantityChanged (e) {
 let input = e.target;
 if (isNaN(input.value) || input.value <= 0) {
  input.value = 1
 }

 updateTotal();
}

// add to Cart

function addCartClicked (e) {
 let button = e.target;
 let shopProducts = button.parentElement;
 let title = shopProducts.getElementsByClassName('product-title') [0].innerText;
 let price = shopProducts.getElementsByClassName('price') [0].innerText;
 let productImg = shopProducts.getElementsByClassName('product-image')[0].src;
 addProductToCart(title, price, productImg);
 updateTotal();
}

function addProductToCart(title, price, productImg) {
 let cartShopBox = document.createElement('tr')
 cartShopBox.classList.add('cart-item');
 let cartItems = document.getElementsByClassName('cart-items')[0];
 let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

  for (let i = 0; i < cartItemsNames.length; i++) {
   if (cartItemsNames[i].innerText == title) {
   alert ("You have already added this item to cart");
   return;
  }
 }

let cartBoxContent = `         
          <td><i class="far fa-times-circle cart-remove"></i></td>
          <td><img src="${productImg}" alt=""></td>
          <td class="cart-product-title">${title}</td>
          <td class="cart-price">${price}</td>
          <td><input type="number" value="1" class="cart-quantity"></td>
          <td class="total-price">$350.00</td>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// Update Total 

function updateTotal () {
 let cartItems = document.getElementsByClassName('cart-items') [0];
 let cartItem = document.getElementsByClassName('cart-item');
 let total = 0;

 for (let i = 0; i < cartItem.length; i++) {
  let item = cartItem[i];
  let priceElement = item.getElementsByClassName('cart-price') [0];
  let quantityElement = item.getElementsByClassName('cart-quantity') [0];
  let price = parseFloat(priceElement.innerText.replace("$", ""))
  let quantity = quantityElement.value;
  total = total + (price * quantity);
 }
  // if price contain some cents value

  total = Math.round(total * 100) / 100;

  document.getElementsByClassName ('total-price') [0].innerText = '$' + total;
 
}