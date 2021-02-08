const express = require('express')
const { v4: uuid } = require('uuid')
const logger = require('../logger')
const {bookmarks} = require('../store')
const {isWebUri} = require('valid-url')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

 bookmarksRouter
 .route('/bookmarks')
 .get((req, res)=>{
    res.json(bookmarks)
  })
  .post(bodyParser, (req, res) => {
    const {title, url, description, rating} = req.body;
    if (!title) {
      return res
        .status(400)
        .send('title required');
    }
    
    if (!isWebUri(url)) {
      
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

   //get an id

        const id = uuid();

        const bookmark = {
          id,
          title,
          url,
          description,
          rating
        };

        bookmarks.push(bookmark);


    //Finally, log the card creation and send a response including a location header.

        logger.info(`Card with id ${id} created`);

          res
            .status(201)
            .location(`http://localhost:8000/card/${id}`)
            .json(bookmark);

  });


bookmarksRouter
     .route('bookmarks/:id')
     .get((req, res)=>{
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
  })

  .delete((req, res)=>{
    const {id} = req.parasms;
    const bookmarkIndex = bookmarks.findIndex(b => b.id == id);

    if(bookmarkIndex === -1){
      logger.error(`List with id ${id} not found`);
      return res
        .status(404)
        .send('Not Found');
    }
    //remove bookmark
    //assume bookmarkIds are not duplicated in the cardIds array
   bookmarks.forEach(list=>{
     const bookmarkIds = list.bookmarkIds.filter(bid => bid !==id);
         list.bookmarkIds = bookmarkIds
   });
   
    bookmarks.splice(bookmarkIndex, 1)
    Logger.info(`Bookmark with id ${id} deleted.`)
    res
      .status(204)
      .end()

  })

  module.exports = bookmarksRouter

  
  
