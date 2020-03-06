const fs = require('fs');

const db = require('./db.json');
let locations = ['hall', 'stock', 'restoration', 'withdrawn'];

let fix = function(){
  db.books.forEach(function(book){
    delete book.status;
    book.available = true;
    book.location = locations[Math.round(Math.random())];
  })

  fs.writeFileSync('./some.json', JSON.stringify(db, null, 2));
}

fix()