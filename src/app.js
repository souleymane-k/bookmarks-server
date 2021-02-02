require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const winston = require('winston');
const { NODE_ENV } = require('./config')
// const { response } = require('express')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'info.log' })
    ]
  });
  
  if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }

  const bookmarks =[

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
      id: 3,
      title:'MDN',
      url:'htpps://www.developer.mozilla.org.com',
      description:'The only place to find web documentation',
      rating:1
  }
  ]

  app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
  
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
      looger.error(`Unathorized request to path:${req.path}`);
      return res.status(401).json({ error: 'Unauthorized request' })
    }
    // move to the next middleware
    next()
  })


app.get('/', (req, res)=>{
    res.send('Hello, boilerplate!')
})
// app.use(function errorHandler(error, req, res, next){
//     let response
//     if(NODE_ENV ==='production'){
//         response = { error: { message: 'server error' } }
//     }else{
//         console.error(error)
//         response = {message: error.message.error}
//     }
//     res.status(500).json(response)
// })

module.exports = app