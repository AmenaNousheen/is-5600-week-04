const fs = require('fs').promises;
const path = require('path');
const Products = require('./products');

/**
 * Handle the root route
 */
function handleRoot(req, res) {
  console.log('handleRoot called');
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List products with filters
 */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  try {
    const products = await Products.list({ offset: Number(offset), limit: Number(limit), tag });
    res.json(products);
  } catch (err) {
    console.error('Error listing products:', err);
    res.status(500).json({ error: 'Failed to list products' });
  }
}

/**
 * Get a single product by ID
 */
async function getProduct(req, res, next) {
  const { id } = req.params;
  try {
    const product = await Products.get(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error retrieving product:', err);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
}

/**
 * Create a new product
 */
async function createProduct(req, res) {
  console.log('Request body:', req.body);
  res.status(201).json(req.body); // Simulates product creation
}

/**
 * Update a product
 */
async function updateProduct(req, res) {
  const { id } = req.params;
  const updatedData = req.body;
  console.log(`Product with ID: ${id} updated with data:`, updatedData);
  res.status(200).json({ message: `Product with ID: ${id} updated successfully` });  // Simulates updating product
}

/**
 * Delete a product
 */
// async function deleteProduct(req, res) {
//   const { id } = req.params;
//   console.log(`Product with ID: ${id} deleted.`);
//   res.status(202).json({ message: `Product with ID: ${id} deleted successfully` });  // Simulates deleting product
// }
// 
async function deleteProduct(req, res) {
  const { id } = req.params; // Retrieve the product ID from the URL
  console.log(`Simulating removal of product with ID: ${id}`);
  res.status(202).json({ message: `Product with ID: ${id} deleted successfully` });
}



module.exports = {
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,  // Export new updateProduct function
  deleteProduct,  // Export new deleteProduct function
};
