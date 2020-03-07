import React from 'react'
import { observer } from 'mobx-react'
import store from 'App/store'
import { observable } from "mobx"
import { Link } from 'react-router-dom'
import BookBriefDefinition from 'App/components/BookBriefDefinition.jsx'

@observer
class Order extends React.Component {
  @observable order = {};

  componentDidMount() {
    store.getOrder(this.props.match.params.order_id).then(res => this.order = res)
  }

  render(){

    let transformDate = date => {
      date = new Date(date);
      return date.toDateString()
    }

    return  (
      <div className="container mt-5">
        <h1>Order #{ this.order.id }</h1>
        <div><h4>Until: <small>{ transformDate(this.order.until) }</small></h4></div>
        <div><h4>Reader:  <small><Link to={`/reader/${this.order.reader_id}`}>{ this.order.reader && this.order.reader.given_name } {this.order.reader && this.order.reader.surname} </Link></small></h4></div>
        
        <div>
          <h4>Books:</h4>
          {
            this.order.books && this.order.books.map(book => (
              <BookBriefDefinition key={book.id} book={book} />
            ))
          }
        </div>
        <div>
        </div>
      </div>
    )
  }
}
export default Order