import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BooksList from 'App/librarian/BooksList.jsx';
import BookThumbnail from 'App/components/BookThumbnail.jsx';

export default class OrderNew extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedBooks: [],
      search: ''
    }
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
  }

  onSearchHandler(event){
    this.setState({ search: event.target.value })
  }

  addBook(book){
    let ifBookAlreadySelected = this.state.selectedBooks.find(b => b.id == book.id);
    if (!ifBookAlreadySelected){
      this.setState({ selectedBooks: this.state.selectedBooks.slice().concat([book]) })
    }
  }

  removeBook(book){
    this.state.selectedBooks.splice(this.state.selectedBooks.findIndex(b => b.id == book.id), 1);
    this.setState({ selectedBooks: this.state.selectedBooks.slice() });
  }

  createOrder(){
    // before creating order a client should be already defined!

    fetch('http://localhost:3000/orders', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({ books: this.state.selectedBooks.map(b => b.id) })
    }).then(data => {
      console.log('redirect to orders list');
      // change books status to "occuped"
    })
  }

  render(){
    return  (
      <div className="page-order-new container my-5">
        <h1>Create New Order</h1>
        
        <div className="order-content">
          { this.state.selectedBooks.map(book => (
              <BookThumbnail book={book} key={book.id} onRemove={ this.removeBook }/>
          ))}
          {
            this.state.selectedBooks.length ? <button className="btn btn-primary mt-3" onClick={() => this.createOrder()}>Create Order</button> : <span>There are no books in order</span>
          }

        </div>
        <hr />

        <div className="flex">
          <input type="text" className="form-control flex-grow-1 mb-0 mr-5 py-3 w-auto" placeholder="Find Book by ISBN, Author or Title" 
            value={this.state.search} 
            onChange={this.onSearchHandler}/>
          <button className="btn btn-primary btn-xl px-5"><FontAwesomeIcon icon="barcode"/> Or Scan Barcode</button>

        </div>

        <div className="order-search">
          <BooksList filters={ { q: this.state.search } } onAddBook={ this.addBook } />
        </div>

      </div>
    )
  }
}