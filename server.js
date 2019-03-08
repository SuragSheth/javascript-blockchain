const express = require('express');
const routes = require('./config/routes');

// =============================================================================
// Server Configuation
// =============================================================================
const app = express();
const PORT = process.env.PORT || 800;

// app.use(express.static(`${__dirname}/dist`));
// app.set('view engine', 'ejs');

// =============================================================================
// Routing
// =============================================================================
app.use('/', routes);

// =============================================================================
// Start Server
// =============================================================================
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
