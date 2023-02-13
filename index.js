'use strict';
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const categoryRoutes = require('./src/routes/categoryRoutes');
const conditionRoutes = require('./src/routes/conditionRoutes');
const adTypeRoutes = require('./src/routes/adTypeRoutes');
const statusRoutes = require('./src/routes/statusRoutes');
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', categoryRoutes.routes);
app.use('/api', conditionRoutes.routes);
app.use('/api', adTypeRoutes.routes);
app.use('/api', statusRoutes.routes);

app.listen(config.port, () => console.log('App is listening on url http://localhost:'+config.port))
