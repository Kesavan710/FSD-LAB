const express = require("express");
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Root
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Static product data
let products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone",  price: 499 },
];

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET single product
app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// POST add product
app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
app.put("/products/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  product.name  = req.body.name  || product.name;
  product.price = req.body.price || product.price;
  res.json(product);
});

// DELETE product
app.delete("/products/:id", (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: "Product deleted" });
});

// Start server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));