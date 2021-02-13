require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
 const logger = require('./logger')
const { NODE_ENV } = require('./config')
const bookmarksRouter = require('./bookmarks/bookmarks-router')
const BookmarksService = require('./bookmarks-service')
const { bookmarks } = require('./store')


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
  

 app.get('/bookmarks', (req, res, next) => {
  const knexInstance = req.app.get('db')
  BookmarksService.getAllBookmarks(knexInstance)
       .then(bookmarks => {
         res.json(bookmarks)
       })
       .catch(next)
   })

   app.get('/bookmarks/:bookmarks_id', (req, res, next) => {
    const knexInstance = req.app.get('db')
       BookmarksService.getById(knexInstance, req.params.bookmarks_id)
         .then(bookmark => {
          if (!bookmark) {
                     return res.status(404).json({
                       error: { message: `Bookmark doesn't exist` }
                     })
                   }
           res.json(bookmark)
         })
         .catch(next)
   })


app.get('/', (req, res)=>{
    res.send('Hello, bookmarks-server!')
})


module.exports = app
