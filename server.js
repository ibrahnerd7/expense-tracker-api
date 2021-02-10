require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./api/_middleware/error-handler');
const swaggerUi =require('swagger-ui-express');
const swaggerDocument=require('./api/swagger.config.json')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', require('./api/users/users.controller'));
app.use('/expenses',require('./api/expenses/expense.controller'))

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));