const fs = require('fs').promises;
const path = require('path');
const productsFile = path.join(__dirname, 'data/full-products.json');

/**
 * List products with optional filters
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options;
  try {
    const data = await fs.readFile(productsFile, 'utf-8');
    const products = JSON.parse(data);
    // Filter products by tag if provided
    const filteredProducts = products.filter((product) => {
      if (!tag) return true;
      return product.tags && product.tags.some(({ title }) => title === tag);
    });
    // Return paginated results
    return filteredProducts.slice(offset, offset + limit);
  } catch (err) {
    console.error('Error reading products file:', err);
    throw err;
  }
}

/**
 * Get a product by ID
 */
async function get(id) {
  try {
    const data = await fs.readFile(productsFile, 'utf-8');
    const products = JSON.parse(data);
    return products.find((product) => product.id === id) || null;
  } catch (err) {
    console.error('Error reading products file:', err);
    throw err;
  }
}

/**
 * Delete a product (Simulated)
 */
async function remove(id) {
  console.log(`Simulating removal of product with ID: ${id}`);
  
  return true; // Indicating successful deletion
}

/**
 * Update a product (Simulated)
 */
async function update(id, updatedData) {
  console.log(`Simulating update of product with ID: ${id}`);
  console.log('Updated data:', updatedData);
  
  return true; // Indicating successful update
}

module.exports = {
  list,
  get,
  remove,  // Export the remove method
  update,  // Export the update method
};
