require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
//const winston = require('winston');
const cors = require('cors')
const helmet = require('helmet')
 //const { v4: uuid } = require('uuid');
const { NODE_ENV } = require('./config')
// const cardRouter = require('./card/card-router')
const { response } = require('express')

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


  const bookmarks = [

      {
          id: 1,
          title:'Thinkful',
          url:'htpps://www.thinkful.com',
          description:'Think outside the classroom',
          rating:5
      },
      {
        id: 2,
        title:'Google',
        url:'htpps://www.google.com',
        description:'Where we find everything else',
        rating:4
    },
    {
      id:3,
      title:'MDN',
      url:'htpps://www.developer.mozilla.org.com',
      description:'The only place to find web documentation',
      rating:1
  }
  ]

  app.get('/bookmarks', (req, res)=>{
    res.json(bookmarks)
  });

  app.post('/bookmarks', (req,  res)=>{
    const {title, url, description, rating} = req.body;
    if (!title) {
      return res
        .status(400)
        .send('title required');
    }
    
    if (!isWebUrl(url)) {
      return res
        .status(400)
        .send('url required');
    }
    
    if (!description) {
      return res
        .status(400)
        .send('description required');
    }
    if (!Number.isInteger(rating)|| rating<0 || rating>5) {
      return res
        .status(400)
        .send('rating must be a number between 0 and 5');
    }


  })


  app.get('/bookmarks/:id', (req, res)=>{
    const {id} = req.parasms;
    const bookmark = bookmarks.find(b =>b.id == id);
    //find the bookmarks
    if(!bookmark){
   logger.error(`Bookmark with id ${id} not found`);
   return res
   .status(404)
   .send('Bookmark Not Found')
    }
    res.json(bookmark)
  });

  app.delete('/bookmark/:id', (req, res)=>{
    const {id} = req.parasms;
    const bookmarkIndex = bookmarks.findIndex(b => b.id == id);

    if(bookmarkIndex === -1){
      logger.error(`List with id ${id} not found`);
      return res
        .status(404)
        .send('Not Found');
    }
    bookmarks.splice(bookmarkIndex, 1)
    Logger.info(`List with id ${id} deleted.`)
    res
      .status(204)
      .end()

   
  })
  


app.get('/', (req, res)=>{
    res.send('Hello, boilerplate!')
})
app.use(function errorHandler(error, req, res, next){
    let response
    if(NODE_ENV ==='production'){
        response = { error: { message: 'server error' } }
    }else{
        console.error(error)
        response = {message: error.message.error}
    }
    res.status(500).json(response)
})



module.exports = app