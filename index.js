const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

//Endpoint 1: Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let result = addItem(cart, productId, name, price, quantity);
  res.json({ cartItems: result });
});

function addItem(cart, productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });
  return cart;
}

//Endpoint 2: Edit Quantity of an Item in the Cart
app.get('/cart/edit', (req, res) => {
  let prodId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editCartItems(cart, prodId, quantity);
  res.json({ cartItems: result });
});

function editCartItems(cart, prodId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === prodId) {
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}

//Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  let prodId = parseInt(req.query.productId);
  cart = cart.filter((ele) => DeleteItems(ele, prodId));
  res.json({ cartItems: cart });
});

function DeleteItems(ele, prodId) {
  return ele.productId !== prodId;
}

//Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

//Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = calculateCartQuantity(cart);
  res.json({ totalQuantity: totalQuantity });
});

function calculateCartQuantity(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].quantity;
  }
  return sum;
}

//Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price', (req, res) => {
  let totalPrice = calculateCartPrice(cart);
  res.json({ totalPrice: totalPrice });
});

function calculateCartPrice(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].price;
  }
  return sum;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
