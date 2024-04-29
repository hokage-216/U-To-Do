// import express to handle routes
const express = require('express');

//import Mongoose for database manipulation
const mongoose = require('mongoose');

// import jwt, bcrypt, and sighToken, cors to handle user authentication and session handling
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { signToken } = require('./utils/auth');

// omport apollo server settings
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUserFromToken(token);
    return { user };
  }
});

function getUserFromToken(token) {
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // Return user information decoded from the token
      return decoded;
    }
  } catch (e) {
    // Handle error or return null
    return null;
  }
  return null;
}

// import dotenv to handle environment variables, and setup port and key variables
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_here'; 

// setup our express app
const app = express();
app.use(express.json());
app.use(cors());

// ROOT ROUTE TO HOME
app.get('/', (req, res) => {
  res.send('Home');
});

// LOGIN ROUTE
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      bcrypt.compare(password, user.password)
        .then(match => {
          if (!match) {
            return res.status(401).json({ error: "Incorrect password" });
          }
          const token = signToken({ email: user.email, name: user.name, _id: user._id });
          res.json({ token });
        })
        .catch(err => res.status(500).json({ error: "Server error" }));
    })
    .catch(err => res.status(500).json({ error: "Server error" }));
});

//SIGN UP ROUTE
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10).then(hashedPassword => {
    userModel.create({ username, email, password: hashedPassword })
      .then(user => {
        res.status(201).json({ message: "User registered successfully", user });
      })
      .catch(err => {
        res.status(500).json({ error: "Server error" });
      });
  });
});

// Apollo Server Configuration
const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  
  app.use('/graphql', expressMiddleware(server, { path: '/' }));
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Initialize the apollo server upon start
startApolloServer();

