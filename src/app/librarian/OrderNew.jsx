import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BooksList from 'App/librarian/BooksList.jsx'

export default class OrderNew extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      content: [],
      search: ''
    }
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onSearchHandler(event){
    this.setState({ search: event.target.value })
  }

  render(){
    return  (
      <div className="page-order-new container my-5">
        <h1>Create New Order</h1>
        <div className="flex">
          <input type="text" className="form-control flex-grow-1 mb-0 mr-5 py-3" placeholder="Find Book by ISBN, Author or Title" 
            value={this.state.search} 
            onChange={this.onSearchHandler}/>
          <button className="btn btn-primary btn-xl px-5"><FontAwesomeIcon icon="barcode"/> Or Scan Barcode</button>

        </div>
        
        <div className="order-content">
        </div>

        <div className="order-search">
          <BooksList filters={ { q: this.state.search } } loadOnStart={ false }/>
        </div>

      </div>
    )
  }
}