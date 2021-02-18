module.exports = {
    PORT: process.env.PORT || 8001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || 'a15f9448-d074-4cdc-a932-cbb5355fd7c2',
    DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin:hello@localhost/bookmarks',
  }