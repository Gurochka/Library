const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()
const db = require('./db.json')

server.use(middlewares)
server.get('/orders', (req, res) => {
  let orders = db.orders.slice(),
    readers = db.readers,
    books = db.books

  orders.forEach(order => {
    if (order.reader) return
    order.reader = readers.find(r => r.id == order.reader_id) || {}
    order.books = order.books.map(book_id => {

      return books.find(b => b.id == book_id) || {}
    })
  })

  res.jsonp(orders)
})
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})