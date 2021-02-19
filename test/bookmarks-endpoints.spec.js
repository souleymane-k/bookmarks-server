const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
//const fixtures = require('./bookmarks-fixtures')
const {makeBookmarksArray, makeMaliciousBookmark } = require('./bookmarks.fixtures')

// describe('Bookmarks Endpoints', function() {
//           let db
//     before('make knex instance', () => {
//         db = knex({
//           client: 'pg',
//           connection: process.env.TEST_DB_URL,
//         })
//         app.set('db', db)
//       })

//       before('clean the table', () => db('bookmarks').truncate())
//       afterEach('cleanup', () => db('bookmarks').truncate())
//       after('disconnect from db', () => db.destroy())
      

//  describe.only(`GET /bookmarks`, () => {
//     context(`Given no bookmarks`, () => {
//             it(`responds with 200 and an empty list`, () => {
//                return supertest(app)
//                  .get('/bookmarks')
//                  .expect(200, [])
//              })
//            })

//     context('Given there are bookmarks in the database', () => {
//       const testBookmarks = makeBookmarksArray()

//       beforeEach('insert bookmarks', () => {
//         return db
//           .into('bookmark')
//           .insert(testBookmarks)
//       })

//       it('responds with 200 and all of the bookmarks', () => {
//         return supertest(app)
//           .get('/bookmark')
//           .expect(200, testBookmarks)
//       })
//     })
//   })

//   describe.only(`GET /bookmarks/:bookmark_id`, () => {
//     context(`Given no bookmarks`, () => {
//             it(`responds with 404`, () => {
//                const bookmarkId = 123456
//                return supertest(app)
//                  .get(`/bookmarks/${bookmarkId}`)
//                  .expect(404, { error: { message: `Bookmark doesn't exist` } })
//             })
//            })


//     context('Given there are bookmarks in the database', () => {
//       const testBookmarks = makeBookmarksArray()

//       beforeEach('insert bookmarks', () => {
//         return db
//           .into('bookmarks')
//           .insert(testBookmarks)
//       })

//       it('responds with 200 and the specified bookmark', () => {
//         const bookmarkId = 2
//         const expectedBookmark = testBookmarks[bookmarkId - 1]
//         return supertest(app)
//           .get(`/bookmarks/${bookmarkId}`)
//           .expect(200, expectedBookmark)
//       })
//     })

//     context(`Given an XSS attack bookmar`, () => {
//            const maliciousBookmark = {
//              id: 911,
//              title: 'Naughty naughty very naughty <script>alert("xss");</script>',
//              style: 'How-to',
//              content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
//            }
      
//            beforeEach('insert malicious bookmark', () => {
//              return db
//                .into('bookmarks')
//               .insert([ maliciousBookmark ])
//            })
      
//            it('removes XSS attack content', () => {
//              return supertest(app)
//                .get(`/bookmarks/${maliciousBookmark.id}`)
//                .expect(200)
//                .expect(res => {
//                  expect(res.body.title).to.eql('Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
//                  expect(res.body.content).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`)
//                })
//            })
//          })


//   })
//   describe.only(`POST /bookmarks`, () => {
//        it(`creates a bookmark, responding with 201 and the new bookmarks`,  function() {
//         this.retries(3)
//         const newBookmark = {
//           title: 'Test new bookmark',
//           url: 'Valide new url',
//           rating: 'Integer',
//           description: 'Test new bookmark description...'
//                }
//          return supertest(app)
//            .post('/bookmarks')
//            .send(newBookmark)
//            .expect(201)
//            .expect(res => {
//                      expect(res.body.title).to.eql(newBookmark.title)
//                      expect(res.body.url).to.eql(newBookmark.url)
//                      expect(res.body.rating).to.eql(newBookmark.rating)
//                      expect(res.body.description).to.eql(newBookmark.description)
//                      expect(res.body).to.have.property('id')
//                      expect(res.headers.location).to.eql(`/bookmarks/${res.body.id}`)
//                    })
//             .then(postRes =>
//                             supertest(app)
//                                .get(`/bookmarks/${postRes.body.id}`)
//                                .expect(postRes.body)
//                            )    
//        })

//        // refractor this ///////////

//     // it(`responds with 400 and an error message when the 'title' is missing`, () => {
//     //         return supertest(app)
//     //            .post('/bookmarks')
//     //            .send({
//     //             url: 'Valide new url',
//     //             rating: 'Integer',
//     //             description: 'Test new bookmark description...'
//     //            })
//     //            .expect(400, {
//     //              error: { message: `Missing 'title' in request body` }
//     //            })
//     //        })

//     // it(`responds with 400 and an error message when the 'description' is missing`, () => {
//     //              return supertest(app)
//     //                .post('/bookmarks')
//     //                .send({
//     //                 title: 'Test new bookmark',
//     //                 url: 'Valide new url',
//     //                 rating: 'Integer'
//     //                })
//     //                .expect(400, {
//     //                  error: { message: `Missing 'description' in request body` }
//     //                })
//     //            })
//     //     it(`responds with 400 and an error message when the 'url' is missing`, () => {
//     //                  return supertest(app)
//     //                    .post('/bookmarks')
//     //                    .send({
//     //                     title: 'Test new bookmark',
//     //                     rating: 'Integer',
//     //                     description: 'Test new bookmark description...'
//     //                    })
//     //                    .expect(400, {
//     //                      error: { message: `Missing 'url' in request body` }
//     //                    })
//     //                })

//     //     it(`responds with 400 and an error message when the 'rating' is missing`, () => {
//     //                      return supertest(app)
//     //                        .post('/bookmarks')
//     //                        .send({
//     //                         title: 'Test new bookmark',
//     //                         url: 'Valide new url',
//     //                         description: 'Test new bookmark description...'
//     //                        })
//     //                        .expect(400, {
//     //                          error: { message: `Missing 'rating' in request body` }
//     //                        })
//     //                    }) 


                
    
//     //To this Let's refactor the tests and put them in a loop!
    
//     const requiredFields = ['title', 'url', 'rating', 'description']

//    requiredFields.forEach(field => {
//      const newBookmark = {
//       title: 'Test new bookmark',
//       url: 'Valide new url',
//       rating: 'Integer',
//       description: 'Test new bookmark description...'
//      }

//      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
//        delete newBookmark[field]

//        return supertest(app)
//          .post('/bookmark')
//          .send(newBookmark)
//          .expect(400, {
//            error: { message: `Missing '${field}' in request body` }
//          })
//      })
//    })



//      })
// describe.only(`DELETE /bookmarks/:bokkmark_id`, () => {

//   context(`Given no articles`, () => {
//          it(`responds with 404`, () => {
//            const bookmarkId = 123456
//            return supertest(app)
//              .delete(`/bookmarks/${bookmarkId}`)
//              .expect(404, { error: { message: `Bookmark doesn't exist` } })
//          })
//        })
//          context('Given there are bookmarks in the database', () => {
//            const testBookmarks = makeBookmarksArray()
      
//            beforeEach('insert bookmarks', () => {
//              return db
//                .into('bookmarks')
//                .insert(testBookmarks)
//            })
      
//   it('responds with 204 and removes the bookmark', () => {
//              const idToRemove = 2
//              const expectedBookmarks = testBookmarks.filter(bookmark => bookmark.id !== idToRemove)
//              return supertest(app)
//                .delete(`/bookmarks/${idToRemove}`)
//                .expect(204)
//                .then(res =>
//                  supertest(app)
//                    .get(`/bookmarks`)
//                    .expect(expectedBookmarks)
//                )
//            })
//          })

//   })
// })

describe('Bookmarks Endpoints', () => {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => db('bookmarks').truncate())

  afterEach('cleanup', () => db('bookmarks').truncate())

  describe(`Unauthorized requests`, () => {
    const testBookmarks = makeBookmarksArray()

    beforeEach('insert bookmarks', () => {
      return db
        .into('bookmarks')
        .insert(testBookmarks)
    })

    it(`responds with 401 Unauthorized for GET /api/bookmarks`, () => {
      return supertest(app)
        .get('/api/bookmarks')
        .expect(401, { error: 'Unauthorized request' })
    })

    it(`responds with 401 Unauthorized for POST /api/bookmarks`, () => {
      return supertest(app)
        .post('/api/bookmarks')
        .send({ title: 'test-title', url: 'http://some.thing.com', rating: 1 })
        .expect(401, { error: 'Unauthorized request' })
    })

    it(`responds with 401 Unauthorized for GET /api/bookmarks/:id`, () => {
      const secondBookmark = testBookmarks[1]
      return supertest(app)
        .get(`/api/bookmarks/${secondBookmark.id}`)
        .expect(401, { error: 'Unauthorized request' })
    })

    it(`responds with 401 Unauthorized for DELETE /api/bookmarks/:id`, () => {
      const aBookmark = testBookmarks[1]
      return supertest(app)
        .delete(`/api/bookmarks/${aBookmark.id}`)
        .expect(401, { error: 'Unauthorized request' })
    })

    it(`responds with 401 Unauthorized for PATCH /api/bookmarks/:id`, () => {
      const aBookmark = testBookmarks[1]
      return supertest(app)
        .patch(`/api/bookmarks/${aBookmark.id}`)
        .send({ title: 'updated-title' })
        .expect(401, { error: 'Unauthorized request' })
    })
  })

  describe('GET /api/bookmarks', () => {
    context(`Given no bookmarks`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/bookmarks')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200, [])
      })
    })

    context('Given there are bookmarks in the database', () => {
      const testBookmarks = makeBookmarksArray()

      beforeEach('insert bookmarks', () => {
        return db
          .into('bookmarks')
          .insert(testBookmarks)
      })

      it('gets the bookmarks from the store', () => {
        return supertest(app)
          .get('/api/bookmarks')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200, testBookmarks)
      })
    })

    context(`Given an XSS attack bookmark`, () => {
      const { maliciousBookmark, expectedBookmark } =  makeMaliciousBookmark()

      beforeEach('insert malicious bookmark', () => {
        return db
          .into('bookmarks')
          .insert([maliciousBookmark])
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/bookmarks`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedBookmark.title)
            expect(res.body[0].description).to.eql(expectedBookmark.description)
          })
      })
    })
  })

  describe('GET /api/bookmarks/:id', () => {
    context(`Given no bookmarks`, () => {
      
      it(`responds 404 whe bookmark doesn't exist`, () => {
        return supertest(app)
          .get(`/api/bookmarks/123`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(404, {
            error: { message: `Bookmark Not Found` }
          })
      })
    })

    context('Given there are bookmarks in the database', () => {
      const testBookmarks = makeBookmarksArray()

      beforeEach('insert bookmarks', () => {
        return db
          .into('bookmarks')
          .insert(testBookmarks)
      })

      it('responds with 200 and the specified bookmark', () => {
        const bookmarkId = 2
        const expectedBookmark = testBookmarks[bookmarkId - 1]
        return supertest(app)
          .get(`/api/bookmarks/${bookmarkId}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200, expectedBookmark)
      })
    })

    context(`Given an XSS attack bookmark`, () => {
      const { maliciousBookmark, expectedBookmark } = makeMaliciousBookmark()

      beforeEach('insert malicious bookmark', () => {
        return db
          .into('bookmarks')
          .insert([maliciousBookmark])
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/bookmarks/${maliciousBookmark.id}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedBookmark.title)
            expect(res.body.description).to.eql(expectedBookmark.description)
          })
      })
    })
  })

  describe('DELETE /api/bookmarks/:id', () => {
    context(`Given no bookmarks`, () => {
      it(`responds 404 whe bookmark doesn't exist`, () => {
        return supertest(app)
          .delete(`/api/bookmarks/123`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(404, {
            error: { message: `Bookmark Not Found` }
          })
      })
    })

    context('Given there are bookmarks in the database', () => {
      const testBookmarks = makeBookmarksArray()

      beforeEach('insert bookmarks', () => {
        return db
          .into('bookmarks')
          .insert(testBookmarks)
      })

      it('removes the bookmark by ID from the store', () => {
        const idToRemove = 2
        const expectedBookmarks = testBookmarks.filter(bm => bm.id !== idToRemove)
        return supertest(app)
          .delete(`/api/bookmarks/${idToRemove}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(204)
          .then(() =>
            supertest(app)
              .get(`/api/bookmarks`)
              .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
              .expect(expectedBookmarks)
          )
      })
    })
  })

  describe('POST /api/bookmarks', () => {
    ['title', 'url', 'rating'].forEach(field => {
      const newBookmark = {
        title: 'test-title',
        url: 'https://test.com',
        rating: 2,
      }

      it(`responds with 400 missing '${field}' if not supplied`, () => {
        delete newBookmark[field]

        return supertest(app)
          .post(`/api/bookmarks`)
          .send(newBookmark)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(400, {
            error: { message: `'${field}' is required` }
          })
      })
    })

    it(`responds with 400 invalid 'rating' if not between 0 and 5`, () => {
      const newBookmarkInvalidRating = {
        title: 'test-title',
        url: 'https://test.com',
        rating: 'invalid',
      }
      return supertest(app)
        .post(`/api/bookmarks`)
        .send(newBookmarkInvalidRating)
        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
        .expect(400, {
          error: { message: `'rating' must be a number between 0 and 5` }
        })
    })

    it(`responds with 400 invalid 'url' if not a valid URL`, () => {
      const newBookmarkInvalidUrl = {
        title: 'test-title',
        url: 'htp://invalid-url',
        rating: 1,
      }
      return supertest(app)
        .post(`/api/bookmarks`)
        .send(newBookmarkInvalidUrl)
        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
        .expect(400, {
          error: { message: `'url' must be a valid URL` }
        })
    })

    it('adds a new bookmark to the store', () => {
      const newBookmark = {
        title: 'test-title',
        url: 'https://test.com',
        description: 'test description',
        rating: 1,
      }
      return supertest(app)
        .post(`/api/bookmarks`)
        .send(newBookmark)
        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
        .expect(201)
        .expect(res => {
          expect(res.body.title).to.eql(newBookmark.title)
          expect(res.body.url).to.eql(newBookmark.url)
          expect(res.body.description).to.eql(newBookmark.description)
          expect(res.body.rating).to.eql(newBookmark.rating)
          expect(res.body).to.have.property('id')
          expect(res.headers.location).to.eql(`/api/bookmarks/${res.body.id}`)
        })
        .then(res =>
          supertest(app)
            .get(`/api/bookmarks/${res.body.id}`)
            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
            .expect(res.body)
        )
    })

    it('removes XSS attack content from response', () => {
      const { maliciousBookmark, expectedBookmark } = makeMaliciousBookmark()
      return supertest(app)
        .post(`/api/bookmarks`)
        .send(maliciousBookmark)
        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
        .expect(201)
        .expect(res => {
          expect(res.body.title).to.eql(expectedBookmark.title)
          expect(res.body.description).to.eql(expectedBookmark.description)
        })
    })
  })

  describe(`PATCH /api/bookmarks/:bookmark_id`, () => {
    context(`Given no bookmarks`, () => {
      it(`responds with 404`, () => {
        const bookmarkId = 123456
        return supertest(app)
          .patch(`/api/bookmarks/${bookmarkId}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(404, { error: { message: `Bookmark Not Found` } })
      })
    })

    context('Given there are bookmarks in the database', () => {
      const testBookmarks = makeBookmarksArray()

      beforeEach('insert bookmarks', () => {
        return db
          .into('bookmarks')
          .insert(testBookmarks)
      })

      it('responds with 204 and updates the bookmark', () => {
        const idToUpdate = 2
        const updateBookmark = {
          title: 'updated bookmark title',
          url: 'https://updated-url.com',
          description: 'updated bookmark description',
          rating: 1,
        }
        const expectedArticle = {
          ...testBookmarks[idToUpdate - 1],
          ...updateBookmark
        }
        return supertest(app)
          .patch(`/api/bookmarks/${idToUpdate}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .send(updateBookmark)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/bookmarks/${idToUpdate}`)
              .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
              .expect(expectedArticle)
          )
      })

      it(`responds with 400 when no required fields supplied`, () => {
        const idToUpdate = 2
        return supertest(app)
          .patch(`/api/bookmarks/${idToUpdate}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .send({ irrelevantField: 'foo' })
          .expect(400, {
            error: {
              message: `Request body must content either 'title', 'url', 'description' or 'rating'`
            }
          })
      })

      it(`responds with 204 when updating only a subset of fields`, () => {
        const idToUpdate = 2
        const updateBookmark = {
          title: 'updated bookmark title',
        }
        const expectedBookmark = {
          ...testBookmarks[idToUpdate - 1],
          ...updateBookmark
        }

        return supertest(app)
          .patch(`/api/bookmarks/${idToUpdate}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .send({
            ...updateBookmark,
            fieldToIgnore: 'should not be in GET response'
          })
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/bookmarks/${idToUpdate}`)
              .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
              .expect(expectedBookmark)
          )
      })

      it(`responds with 400 invalid 'rating' if not between 0 and 5`, () => {
        const idToUpdate = 2
        const updateInvalidRating = {
          rating: 'invalid',
        }
        return supertest(app)
          .patch(`/api/bookmarks/${idToUpdate}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .send(updateInvalidRating)
          .expect(400, {
            error: {
              message: `'rating' must be a number between 0 and 5`
            }
          })
      })

      it(`responds with 400 invalid 'url' if not a valid URL`, () => {
        const idToUpdate = 2
        const updateInvalidUrl = {
          url: 'htp://invalid-url',
        }
        return supertest(app)
          .patch(`/api/bookmarks/${idToUpdate}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .send(updateInvalidUrl)
          .expect(400, {
            error: {
              message: `'url' must be a valid URL`
            }
          })
      })
    })
  })
})