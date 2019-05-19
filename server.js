const express = require('express');
const routes = require('./config/routes');
const bodyParser = require('body-parser');
// =============================================================================
// Server Configuration
// =============================================================================
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// =============================================================================
// Routing
// =============================================================================
app.use('/', routes);
require('./config/test');

// =============================================================================
// Start Server
// =============================================================================
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
