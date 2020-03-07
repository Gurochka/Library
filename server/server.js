const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()
const db = require('./db.json')
var bodyParser = require('body-parser')

server.use(middlewares)
server.use(bodyParser.json())

extendOrder = (order) => {
  let readers = db.readers,
      books = db.books

  if (order.reader) return
  order.reader = readers.find(r => r.id == order.reader_id) || {}
  order.books = order.books.map(book_id => {
    return books.find(b => b.id == book_id) || {}
  })
}

server.get('/orders', (req, res) => {
  db.orders.slice().forEach(extendOrder)
  res.jsonp(orders)
})

server.get('/orders/:id', (req, res) => {
  let order = db.orders.filter(order => order.id == req.params.id)
  if (order && order.length) order = order[0]

  if (order) {
    extendOrder(order)
    res.jsonp(order)
  } else {
    res.status(400).send({ message: 'Could\'t find order with provided id' })
  }
})

server.post('/orders', (req, res) => {
  let db = router.db,
    data = req.body;

  if (!data.books || !Array.isArray(data.books)) {
    return res.status(400).send({ message: 'Order can\'t be empty. You should define books array.' })
  }

  let books = db.get('books');
  let unavailableBooks = [];

  data.books.forEach(book_id => {
    let book = books.find({ id: book_id }).value();
    if (!book) unavailableBooks.push('undefined book')
    if (book && !book.available) unavailableBooks.push(book.title)
  })

  if (unavailableBooks.length){
    return res.status(400).send({ message: `Order contains not available books: ${unavailableBooks.join(', ')}` })
  }

  let order = db.get('orders').insert(req.body).write();

  data.books.forEach(book_id => {
    books.find({ id: book_id }).assign({ available: false, order_id: order.id }).write()
  })

  res.jsonp(order);
})


server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})