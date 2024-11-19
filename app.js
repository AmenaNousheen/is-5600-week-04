const express = require('express');
const api = require('./api');
const middleware = require('./middleware');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(middleware.cors);
app.use(bodyParser.json());

// Routes
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.post('/products', api.createProduct);
app.put('/products/:id', api.updateProduct);  // New route for updating product
app.delete('/products/:id', api.deleteProduct);  // New route for deleting product
app.get('/', api.handleRoot);

// Error Handling
app.use(middleware.notFound);
app.use(middleware.handleError);

// Start Server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
