require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
 const logger = require('./logger')
const { NODE_ENV } = require('./config')
const bookmarksRouter = require('./bookmarks/bookmarks-router')


const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
  


  app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
  
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
      logger.error(`Unauthorized request to path: ${req.path}`);
      return res.status(401).json({ error: 'Unauthorized request' })

    }
    // move to the next middleware
    next()
  })

  app.use(bookmarksRouter);
  


app.get('/', (req, res)=>{
    res.send('Hello, bookmarks-server!')
})


module.exports = app
