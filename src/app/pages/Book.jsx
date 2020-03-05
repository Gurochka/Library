import React from 'react';
import { observer } from 'mobx-react'
import store from 'App/store'
import { observable } from "mobx";

@observer
class Book extends React.Component {
  @observable book = {};

  componentDidMount() {
    store.getBook(this.props.match.params.book_id).then(res => this.book = res)
  }

  render(){
    return  (
      <div className="page-book-view mb-5">
        <div className="hero"><img src="/public/images/heros/white-ballpoint-pen-on-book-pages-226612.jpg" /></div>
        <div className="container pt-5">
          
          <div className="flex">
            <div><img src={this.book.images} /></div>
            <div className="ml-5">
              <h2 className="mb-2"> {this.book.title} 
                <br /><small>by <a>{this.book.author}</a></small>
              </h2>
              <p>Published by <a>{this.book.publishers}</a> {this.book.publication_date}</p>
              <p>ISBN: {this.book.isbn}</p>
              <p>Pages numbers: {this.book.pages}</p>
              {
                this.book.translated_by && <p>Translated By: {this.book.translated_by}</p>
              }
              {
                this.book.series && <p>Series: <a>{this.book.series}</a></p>
              }
              <p className="text-pre-wrap"><b>Description: </b> {this.book.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Book