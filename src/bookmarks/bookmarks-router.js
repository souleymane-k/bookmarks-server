const express = require('express')
//const { v4: uuid } = require('uuid')
const logger = require('../logger')
const {bookmarks} = require('../store')
//const {isWebUri} = require('valid-url')
const bookmarksRouter = express.Router()
const xss = require('xss')
const BookmarksService = require('./bookmarks-service')
//const bodyParser = express.json()
const jsonParser = express.json()

//  bookmarksRouter
//  .route('/bookmarks')
//  .get((req, res,)=>{
//     res.json(bookmarks)
//   })
//   .post(jsonParser, (req, res) => {
//     const {title, url, description, rating} = req.body;
//     if (!title) {
//       return res
//         .status(400)
//         .send('title required');
//     }
    
//     if (!isWebUri(url)) {
      
//       return res
//         .status(400)
//         .send('url required');
//     }
    
//     if (!description) {
//       return res
//         .status(400)
//         .send('description required');
//     }
//     if (!Number.isInteger(rating)|| rating<0 || rating>5) {
//       return res
//         .status(400)
//         .send('rating must be a number between 0 and 5');
//     }

//    //get an id

//         const id = uuid();

//         const bookmark = {
//           id,
//           title,
//           url,
//           description,
//           rating
//         };

//         bookmarks.push(bookmark);


//     //Finally, log the Bookmark creation and send a response including a location header.

//         logger.info(`Bookmark with id ${id} created`);

//           res
//             .status(201)
//             .location(`http://localhost:8001/bookmark/${id}`)
//             .json(bookmark);

//   });


// bookmarksRouter
//      .route('/bookmarks/:id')
//      .get((req, res)=>{
//     const {id} = req.params;
//     const bookmark = bookmarks.find(b =>b.id == id);

//     //find the bookmarks
//     if(!bookmark){
//    logger.error(`Bookmark with id ${id} not found`);
//    return res
//    .status(404)
//    .send('Bookmark Not Found')
//     }
//     res.json(bookmark)
//   })

//   .delete((req, res)=>{
//     const {id} = req.params;
//     const bookmarkIndex = bookmarks.findIndex(b => b.id === id);

//     if(bookmarkIndex === -1){
//       logger.error(`Bookmar with id ${id} not found.`);
//       return res
//         .status(404)
//         .send('Bookmark Not Found');
//     }
   
//     bookmarks.splice(bookmarkIndex, 1)
//     logger.info(`Bookmark with id ${id} deleted.`)
//     res
//       .status(204)
//       .end()

//   })
// /////////////////////////////////////////////////


//   bookmarksRouter
//   .route('/')
//   .get((req, res, next) => {
//     BookmarkssService.getAllBookmarks(
//       req.app.get('db')
//     )
//       .then(bookmarks => {
//         res.json(bookmarks)
//       })
//       .catch(next)
//   })
//   .post(jsonParser, (req, res, next) => {
//     const {title, url, description, rating} = req.body;
//     const newBookmark = { title, url, description, rating }

//     for (const [key, value] of Object.entries(newBookmark)) {
//            if (value == null) {
//              return res.status(400).json({
//                error: { message: `Missing '${key}' in request body` }
//              })
//            }
//          }

//     BookmarksService.insertBookmark(
//       req.app.get('db'),
//       newBookmark
//     )
//       .then(bookmark => {
//         res
//           .status(201)
//           .location(`/bookmarks/${bookmark.id}`)
//           .json(bookmark)
//       })
//       .catch(next)
//   })

// bookmarksRouter
//   .route('/:bookmark_id')
//   .all((req, res, next) => {
//          BookmarksService.getById(
//            req.app.get('db'),
//            req.params.bookmark_id
//          )
//   .then(bookmark => {
//         if (!bookmark) {
//         return res.status(404).json({
//           error: { message: `Bookmark doesn't exist` }
//           })
//         }
//         res.bookmark = bookmark // save the bookmark for the next middleware
//         next() // don't forget to call next so the next middleware happens!
//       })
//     .catch(next)
//   })
//   .get((req, res, next) => {

//     res.json({
//                  id: res.bookmark.id,
//                  url: res.bookmark.url,
//                  title: xss(res.bookmark.title), // sanitize title
//                  description: xss(res.bookmark.description), // sanitize content
//                  rating:bookmark.rating
//                })

//     // const knexInstance = req.app.get('db')
//     // BookmarksService.getById(knexInstance, req.params.bookmark_id)
//     //   .then(bookmark => {
//     //     if (!bookmark) {
//     //       return res.status(404).json({
//     //         error: { message: `Bookmark doesn't exist` }
//     //       })
//     //     }
//     //     //title, url, description, rating
//     //     res.json({
//     //                  id: bookmark.id,
//     //                  url: bookmark.url,
//     //                  title: xss(bookmark.title), // sanitize title
//     //                  description: xss(bookmark.description), // sanitize content
//     //                  rating: bookmark.rating
//     //                })
//     //   })
//     //   .catch(next)
//   })
//   .delete((req, res, next) => {
//     BookmarksService.deleteBookmark(
//            req.app.get('db'),
//            req.params.bookmark_id
//          )
//            .then(() => {
//              res.status(204).end()
//            })
//            .catch(next)
//   })


//   module.exports = bookmarksRouter

  
  
const serializeBookmark = bookmark => ({
  id: bookmark.id,
  title: xss(bookmark.title),
  url: bookmark.url,
  description: xss(bookmark.description),
  rating: Number(bookmark.rating),
})

bookmarksRouter
  .route('/')

  .get((req, res, next) => {
    BookmarksService.getAllBookmarks(req.app.get('db'))
      .then(bookmarks => {
        res.json(bookmarks.map(serializeBookmark))
      })
      .catch(next)
  })

  .post(jsonParser, (req, res, next) => {
    const { title, url, description, rating } = req.body
    const newBookmark = { title, url, description, rating }

    for (const field of ['title', 'url', 'rating']) {
      if (!newBookmark[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        })
      }
    }

    const error = getBookmarkValidationError(newBookmark)

    if (error) return res.status(400).send(error)

    BookmarksService.insertBookmark(
      req.app.get('db'),
      newBookmark
    )
      .then(bookmark => {
        logger.info(`Bookmark with id ${bookmark.id} created.`)
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `${bookmark.id}`))
          .json(serializeBookmark(bookmark))
      })
      .catch(next)
  })


bookmarksRouter
  .route('/:bookmark_id')

  .all((req, res, next) => {
    const { bookmark_id } = req.params
    BookmarksService.getById(req.app.get('db'), bookmark_id)
      .then(bookmark => {
        if (!bookmark) {
          logger.error(`Bookmark with id ${bookmark_id} not found.`)
          return res.status(404).json({
            error: { message: `Bookmark Not Found` }
          })
        }

        res.bookmark = bookmark
        next()
      })
      .catch(next)

  })

  .get((req, res) => {
    res.json(serializeBookmark(res.bookmark))
  })

  .delete((req, res, next) => {
    const { bookmark_id } = req.params
    BookmarksService.deleteBookmark(
      req.app.get('db'),
      bookmark_id
    )
      .then(numRowsAffected => {
        logger.info(`Bookmark with id ${bookmark_id} deleted.`)
        res.status(204).end()
      })
      .catch(next)
  })

  .patch(jsonParser, (req, res, next) => {
    const { title, url, description, rating } = req.body
    const bookmarkToUpdate = { title, url, description, rating }

    const numberOfValues = Object.values(bookmarkToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      logger.error(`Invalid update without required fields`)
      return res.status(400).json({
        error: {
          message: `Request body must content either 'title', 'url', 'description' or 'rating'`
        }
      })
    }

    const error = getBookmarkValidationError(bookmarkToUpdate)

    if (error) return res.status(400).send(error)

    BookmarksService.updateBookmark(
      req.app.get('db'),
      req.params.bookmark_id,
      bookmarkToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = bookmarksRouter