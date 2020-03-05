import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react'
import store from 'App/store'

@observer
class Orders extends React.Component {
  componentDidMount(){
    store.getOrders()
  }

  render(){
    const { orders } = store

    let transformDate = date => {
      date = new Date(date);
      return date.toDateString()
    }

    return  (
      <div className="container mt-5 readers-page">
        <h1>Readers</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Reader</th>
              <th>Books</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
          { orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.reader.given_name} {order.reader.surname}</td>
              <td>{order.books.map(book => (
                  <div key={book.id}>
                    <Link to={`/book/${book.id}`}>{book.title}</Link>
                  </div>
                ))}</td>
              <td>{transformDate(order.until)}</td>
            </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }
}
export default Orders