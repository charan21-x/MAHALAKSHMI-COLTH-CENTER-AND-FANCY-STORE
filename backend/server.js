// ==========================
// IMPORT PACKAGES
// ==========================

const express = require("express");
const cors = require("cors");

const app = express();
app.get("/", (req, res) => {
    res.send('MAHALAKSHMI CLOTH CENTER AND FANCY STORE');
});

// ==========================
// MIDDLEWARE
// ==========================

app.use(cors());
app.use(express.json());


// ==========================
// SAMPLE PRODUCTS DATABASE
// ==========================

const products = [

  {
    id: 1,
    name: "Stylish T-Shirt",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800"
  },

  {
    id: 2,
    name: "Fashion Hoodie",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800"
  },

  {
    id: 3,
    name: "Casual Jacket",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800"
  },

  {
    id: 4,
    name: "Modern Jeans",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=800"
  }

];


// ==========================
// HOME ROUTE
// ==========================

app.get("/", (req, res) => {

  res.send("Fashion Store Backend Running");

});


// ==========================
// GET PRODUCTS API
// ==========================

app.get("/products", (req, res) => {

  res.json(products);

});


// ==========================
// ADD PRODUCT API
// ==========================

app.post("/products", (req, res) => {

  const newProduct = req.body;

  products.push(newProduct);

  res.json({
    message: "Product Added Successfully",
    product: newProduct
  });

});


// ==========================
// DELETE PRODUCT API
// ==========================

app.delete("/products/:id", (req, res) => {

  const productId = parseInt(req.params.id);

  const productIndex = products.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {

    products.splice(productIndex, 1);

    res.json({
      message: "Product Deleted Successfully"
    });

  } else {

    res.status(404).json({
      message: "Product Not Found"
    });

  }

});


// ==========================
// SERVER
// ==========================

const PORT = 5000;

app.listen(PORT, () => {

  console.log(`Server Running On Port ${PORT}`);

});