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
    bookmarks.splice(bookmarkIndex, 1)
    Logger.info(`List with id ${id} deleted.`)
    res
      .status(204)
      .end()

  })

  module.exports = bookmarksRouter

  ///////////////




// cardRouter
//   .route('/card')
//   .get((req, res) => {
//     res.json(cards);

//   })
//   .post(bodyParser, (req, res) => {
//     const { title, content } = req.body

//     if (!title) {
//         logger.error(`Title is required`);
//         return res
//           .status(400)
//           .send('Invalid data');
//       }
      
//       if (!content) {
//         logger.error(`Content is required`);
//         return res
//           .status(400)
//           .send('Invalid data');
//       }

  // get an id
        // const id = uuid();

        // const card = {
        //   id,
        //   title,
        //   content
        // };

        // cards.push(card);


    //Finally, log the card creation and send a response including a location header.

  //       logger.info(`Card with id ${id} created`);

  //         res
  //           .status(201)
  //           .location(`http://localhost:8000/card/${id}`)
  //           .json(card);

  // })


// cardRouter
//   .route('/card/:id')
//   .get((req, res) => {
    // move implementation logic into here
  // const { id } = req.params;
  // const card = cards.find(c => c.id == id);

   // make sure we found a card
  //  if (!card) {
  //    logger.error(`Card with id ${id} not found.`);
  //    return res
  //     .status(404)
  //     .send('Card Not Found');
  // }
  // res.json(card);

  // })
  // .delete((req, res) => {
    // move implementation logic into here

  //   const { id } = req.params;

  //  const cardIndex = cards.findIndex(c => c.id == id);

  //  if (cardIndex === -1) {
  //   logger.error(`Card with id ${id} not found.`);
  //    return res
  //      .status(404)
  //      .send('Not found');
  //  }

   //remove card from lists
   //assume cardIds are not duplicated in the cardIds array
//    lists.forEach(list => {
//      const cardIds = list.cardIds.filter(cid => cid !== id);
//      list.cardIds = cardIds;
//    });

//    cards.splice(cardIndex, 1);
//    logger.info(`Card with id ${id} deleted.`);

//    res
//      .status(204)
//     .end();
//   })

  
// module.exports = cardRouter
  
