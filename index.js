if (process.env.NODE_ENV !== 'production') require('dotenv').load();
const express = require('express');
const Joi = require('joi');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./app/schema/schema');

app.use(express.json());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const port = process.env.PORT;
app.listen(port, () => console.log(`Graphql server running on port ${port}...`));
