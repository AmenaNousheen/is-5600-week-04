
/**
 * CORS Middleware
 */
function cors(req, res, next) {
  console.log('CORS middleware triggered for:', req.method, req.url); // Added for debugging
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
}
/**
 * 404 Not Found Middleware
 */
function notFound(req, res) {
  res.status(404).json({ error: 'Not Found' });
}
/**
 * Error Handling Middleware
 */
function handleError(err, req, res, next) {
  console.error('Error middleware triggered:', err); // Log the error details
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: 'Internal Server Error' });
}
module.exports = {
  cors,
  handleError,
  notFound,
};
