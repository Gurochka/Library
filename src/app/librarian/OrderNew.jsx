import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BooksList from 'App/librarian/BooksList.jsx';
import BookThumbnail from 'App/components/BookThumbnail.jsx';
import { observer } from 'mobx-react'
import { observable } from "mobx";
import store from 'App/store'

@observer
export default class OrderNew extends React.Component {
  @observable search = ''
  @observable selectedBooks = []

  onSearchHandler(event){
    this.search = event.target.value
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
    // before creating order a client should be already defined!
    store
      .createOrder({ books: this.selectedBooks.map(b => b.id) })
      .then(res => {
        console.log('whats the result? ', res)
      })
  }

  render(){
    return  (
      <div className="page-order-new container my-5">
        <h1>Create New Order</h1>
        
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
            
            onChange={(e) => this.onSearchHandler(e) }/>
          <button className="btn btn-primary btn-xl px-5"><FontAwesomeIcon icon="barcode"/> Or Scan Barcode</button>

        </div>

        <div className="order-search">
          <BooksList filters={ { q: this.search } } onAddBook={ b => this.addBook(b) } />
        </div>

      </div>
    )
  }
}