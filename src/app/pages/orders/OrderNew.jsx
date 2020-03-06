import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BooksList from 'App/components/BooksList.jsx';
import BookThumbnail from 'App/components/BookThumbnail.jsx';
import { observer } from 'mobx-react'
import { observable } from "mobx";
import store from 'App/store'

@observer
export default class OrderNew extends React.Component {
  @observable search = ''
  @observable selectedBooks = []
  @observable selectedReader

  componentDidMount() {
    store.getReaders().then(res => {
      if (res.length) this.selectedReader = res[0].id 
    })
  }

  addBook(book){
    let ifBookAlreadySelected = this.selectedBooks.find(b => b.id == book.id);
    if (!ifBookAlreadySelected){
      this.selectedBooks.push(book)
    }
  }

  removeBook(book){
    this.selectedBooks.splice(this.selectedBooks.findIndex(b => b.id == book.id), 1);
  }

  createOrder(){
    if (this.selectedReader === undefined) return

    let return_date = new Date();
    return_date.setDate(return_date.getDate() + 14)
    return_date = return_date.toISOString();

    store
      .createOrder({ 
        reader_id: this.selectedReader, 
        books: this.selectedBooks.map(b => b.id),
        until: return_date
      })
      .then(res => {
        console.log('whats the result? ', res)
      })
  }

  render(){
    const { readers } = store
    return  (
      <div className="page-order-new container my-5">
        <h1>Order Details</h1>

        <div className="flex align-items-center mb-4">
          <b>Reader: </b>
          <select className="form-control w-auto mb-0 ml-3" onChange={(e) => this.selectedReader = e.target.value }>
          {
            readers.map(reader => (
              <option key={reader.id} value={reader.id}>{reader.given_name} {reader.surname}</option>
              ))
          }
          </select>
        </div>

        <b className="mb-1">Books:</b>
        
        <div className="order-content">
          { this.selectedBooks.map(book => (
              <BookThumbnail book={book} key={book.id} onRemove={ b => this.removeBook(b) }/>
          ))}
          {
            this.selectedBooks.length ? <button className="btn btn-primary mt-3" onClick={() => this.createOrder()}>Create Order</button> : <span>There are no books in order</span>
          }

        </div>
        <hr />

        <div className="flex">
          <input type="text" className="form-control flex-grow-1 mb-0 mr-5 py-3 w-auto" placeholder="Find Book by ISBN, Author or Title" 
            
            onChange={(e) => this.search = e.target.value }/>
          <button className="btn btn-primary btn-xl px-5"><FontAwesomeIcon icon="barcode"/> Or Scan Barcode</button>

        </div>

        <div className="order-search">
          <BooksList filters={ { q: this.search, available: true } } onAddBook={ b => this.addBook(b) } />
        </div>

      </div>
    )
  }
}