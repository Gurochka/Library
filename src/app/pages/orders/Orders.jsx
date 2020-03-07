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

    let noPropagation = e => e.stopPropagation()

    return  (
      <div className="container mt-5">
        <h1>Orders</h1>
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
            <tr key={order.id} title="Go to Order Details" onClick={ (e) => this.props.history.push(`/order/${order.id}`) }>
              <td>{order.id}</td>
              <td>{order.reader.given_name} {order.reader.surname}</td>
              <td>{order.books.map(book => (
                  <div key={book.id}>
                    <Link to={`/book/${book.id}`} onClick={noPropagation}>{book.title}</Link>
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