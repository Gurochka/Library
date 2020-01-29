import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from 'App/components/Checkbox.jsx';
import Pagination from 'App/components/Pagination.jsx';
import BookBriefDefinition from 'App/components/BookBriefDefinition.jsx'

export default class BooksSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      categories: [],
      checkedCategories: []
    }

    this.fetchBooks = this.fetchBooks.bind(this)
    this.onSearchHandler = this.onSearchHandler.bind(this)
    this.paginate = this.paginate.bind(this)
  }

  booksPage = 1
  totalPages = 0

  componentDidMount() {
    this.fetchBooks()

    fetch("http://localhost:3000/Categories")
    .then(res => { return res.json()})
    .then(res => {
      res = res.map(category => { category.checked = true; return category })
      this.setState({ categories: res, checkedCategories: [] })
    })
  }

  fetchBooks(){
    let requests = `_page=${this.booksPage}&_limit=10`;

    if (this.search) requests += `&q=${this.search}`
    if (this.state.checkedCategories.length) {
      requests += '&' + this.state.checkedCategories.map(cat => `category_id=${cat}`).join('&');
    }

    fetch(`http://localhost:3000/books?${requests}`)
    .then(res => {
      let headers = res.headers.get('Link');
      if (headers) headers = parseInt(headers.match(/_page=(\d)+/g).pop().replace('_page=', ''), 10);
      this.totalPages = headers || 0;
      return res.json()
    })
    .then((res, req) => {
      this.setState({ books: res })
    })
  }

  paginate(pageNumber){
    this.booksPage = pageNumber;
    this.fetchBooks()
  }

  onSearchHandler(event){
    this.search = event.target.value
    this.booksPage = 1;
    this.fetchBooks();
  }

  onCategoriesClick(category){
    category.checked = !category.checked;
    
    let checked = this.state.categories.filter(cat => cat.checked).map(cat => cat.id);
    this.booksPage = 1;
    this.setState({checkedCategories: checked.length == this.state.categories.length ? [] : checked}, () => {
      this.fetchBooks()
    })
  }

  render(){
    const { books, categories } = this.state;
    return  (
      <div className="container pt-5 page-books-search">
        <h1>Books Search</h1>

        <div className="flex">
          
          <div className="flex-grow-1">
            <div className="books mb-5 mr-5">

              <input type="text" className="form-control form-control-xl" placeholder="Search book by author or title" onChange={this.onSearchHandler}/>

              <Pagination page={ this.booksPage } total={this.totalPages} onChange={this.paginate}/>

              { books.map(book => <BookBriefDefinition book={book} key={book.id}/>)}
            </div>
          </div>

          <div className="filters">
            <h2>Filters</h2>            
            <div>
{/*              <div><input type="checkbox" /> <label> Include Occuped </label> </div>
              <div><input type="checkbox" /> <label> Include those I've read </label> </div>*/}
              <h5> Status </h5>
                <Checkbox label="Occuped" />
                <Checkbox label="On restoration" />
                <Checkbox label="Free" />
              <br />
              <h5>Categories</h5>
              <div>
                {categories.map(category => (
                  <Checkbox label={category.title} key={category.id} onChange={() => this.onCategoriesClick(category) }/>
                  ))}
              </div>
              <h5></h5>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
