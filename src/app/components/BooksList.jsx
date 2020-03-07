import React from 'react'
import Pagination from 'App/components/Pagination.jsx'
import BookBriefDefinition from 'App/components/BookBriefDefinition.jsx'
import { observer } from 'mobx-react'
import { observable } from "mobx"
import store from 'App/store'

@observer
class BooksList extends React.Component {
  @observable books = []
  
  booksPage = 1
  totalPages = 0

  fetchBooks(){
    let filters = Object.assign({}, this.props.filters || {}, {
      _page: this.booksPage,
      _limit: 10
    })

    store.getBooksByFilter(filters)
      .then(res => {
        this.totalPages = res.total
        this.books = res.books
      })
  }

  paginate(pageNumber){
    this.booksPage = pageNumber;
    this.fetchBooks()
  }

  componentDidMount() {
    if (this.props.loadOnStart){
      this.fetchBooks()
    }
  }

  componentDidUpdate(prevProps, prevState,snapshot){
    let isFiltersChanged = JSON.stringify(prevProps.filters) != JSON.stringify(this.props.filters);
    if (isFiltersChanged){
      this.booksPage = 1;
      this.fetchBooks();
    }
  }

  render(){
    let bookAttributes = {};
    if (this.props.onAddBook) bookAttributes.onAddBook = (book) => {this.props.onAddBook(book) } ;
    if (this.props.onFavorite) bookAttributes.onFavorite = (book) => this.props.onFavorite(book);

    return  (
      <div className="books my-3">
        <Pagination page={ this.booksPage } total={this.totalPages} onChange={(number) => this.paginate(number)}/>

        { this.books.map(book => <BookBriefDefinition key={book.id} book={book} {...bookAttributes} />)}
      </div>
    )
  }
}

export default BooksList