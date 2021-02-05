const { v4: uuid } = require('uuid');

const bookmarks = [

    {
        id: uuid(),
        title:'Thinkful',
        url:'htpps://www.thinkful.com',
        description:'Think outside the classroom',
        rating:5
    },
    {
      id: uuid(),
      title:'Google',
      url:'htpps://www.google.com',
      description:'Where we find everything else',
      rating:4
  },
  {
    id:uuid(),
    title:'MDN',
    url:'htpps://www.developer.mozilla.org.com',
    description:'The only place to find web documentation',
    rating:1
}
]

module.exports = {bookmarks}