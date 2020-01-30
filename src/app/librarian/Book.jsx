import React from 'react';
import { useParams } from "react-router-dom";

export default class Book extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      book_id: props.match.params.book_id,
      book: {}
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/Books/${this.state.book_id}`)
      .then(res => { return res.json()})
      .then(res => this.setState({ book: res}))
  }

  render(){
    let { book } = this.state;
    return  (
      <div className="page-book-view">
        <div className="hero"><img src="/public/images/heros/white-ballpoint-pen-on-book-pages-226612.jpg" /></div>
        <div className="container pt-5">
          
          <div className="flex">
            <div><img src={book.images} /></div>
            <div className="ml-5">
              <h2 className="mb-2"> {book.title} 
                <br /><small>by <a>{book.author}</a></small>
              </h2>
              <p>Published by <a>{book.publishers}</a> {book.publication_date}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Pages numbers: {book.pages}</p>
              {
                book.translated_by && <p>Translated By: {book.translated_by}</p>
              }
              {
                book.series && <p>Series: <a>{book.series}</a></p>
              }
              <p className="text-pre-wrap"><b>Description: </b> {book.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}