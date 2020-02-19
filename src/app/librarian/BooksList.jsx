import React from 'react';
import Pagination from 'App/components/Pagination.jsx';
import BookBriefDefinition from 'App/components/BookBriefDefinition.jsx'

export default class BooksList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      books: []
    }

    this.paginate = this.paginate.bind(this)    
  }

  booksPage = 1
  totalPages = 0

  serialize(obj){
    return Object.keys(obj).map(key => {
      if (Array.isArray(obj[key])) return obj[key].map(val => `${key}=${val}`).join('&')
        else return `${key}=${obj[key]}`;
    }).join('&');
  }

  fetchBooks(){
    let filters = Object.assign({}, this.props.filters || {}, {
      _page: this.booksPage,
      _limit: 10
    })

    fetch(`http://localhost:3000/books?${this.serialize(filters)}`)
    .then(res => {
      let headers = res.headers.get('Link');
      if (headers) headers = parseInt(headers.match(/_page=(\d)+/g).pop().replace('_page=', ''), 10);
      this.totalPages = headers || 0;
      return res.json()
    })
    .then((res,req) => {
      console.log('books:', res);
      this.setState({ books: res })
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
    if (prevProps.filters != this.props.filters){
      this.booksPage = 1;
      this.fetchBooks();
    }
  }

  render(){
    return  (
      <div className="books my-3">
        <Pagination page={ this.booksPage } total={this.totalPages} onChange={this.paginate}/>

        { this.state.books.map(book => <BookBriefDefinition book={book} key={book.id}/>)}
      </div>
    )
  }
}