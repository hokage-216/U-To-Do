const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userModel = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { signToken } = require('./utils/auth');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const secretKey = 'SECRET'; 

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Home');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  userModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password)
          .then(match => {
            if (match) {
              const token = signToken({ email: user.email, name: user.name, _id: user._id });
              res.json({ token: token });
            } else {
              res.status(401).json({ error: "Incorrect password" });
            }
          })
          .catch(err => res.status(500).json({ error: err.message }));
      } else {
        res.status(401).json({ error: "Invalid credential" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  userModel.create({ username, email, password })
          .then(user => {
            // Send a success response with the created user object
            res.status(201).json(user);
          })
          .catch(err => {
            // Send an error response with the error object
            res.status(500).json(err);
          });
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/u-to-do', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  })
  .catch(err => console.error(err));


const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
