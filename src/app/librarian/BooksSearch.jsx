import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from 'App/components/Checkbox.jsx';

export default class BooksSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      categories: [],

      booksPage: 1,
      perPage: 10,
      booksAreOver: false,

      search: '',
      checkedCategories: []
    }
    this.fetchBooks = this.fetchBooks.bind(this)
    this.showMore = this.showMore.bind(this)
    this.onSearchHandler = this.onSearchHandler.bind(this)
  }

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
    let requests = `_page=${this.state.booksPage}&_limit=${this.state.perPage}`
    if (this.state.search) requests += `&q=${this.state.search}`
    if (this.state.checkedCategories.length) {
      requests += '&' + this.state.checkedCategories.map(cat => `category_id=${cat}`).join('&');
    }

    fetch(`http://localhost:3000/books?${requests}`)
    .then(res => { return res.json()})
    .then(res => {
      let books = this.state.booksPage == 1 ? res : this.state.books.concat(res)
      this.setState({ books: books })
      if (res.length < this.state.perPage) this.setState({booksAreOver: true})
    })
  }

  showMore(){
    this.setState({ booksPage: (this.state.booksPage + 1) }, () => {
      this.fetchBooks()
    })
  }

  onSearchHandler(event){
    this.setState({ 
      search: event.target.value,
      booksPage: 1
    }, () => { this.fetchBooks()})
  }

  onCategoriesClick(category){
    category.checked = !category.checked;
    
    let checked = this.state.categories.filter(cat => cat.checked).map(cat => cat.id);

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

            <div className = "books mb-5 mr-5">

              <input type="text" className="form-control form-control-xl" placeholder="Search book by author or title" onChange={this.onSearchHandler}/>

              {books.map(book => (
                <div className="book-container flex mb-3" key={book.id}>
                  <div className="book-cover"><img className="w-100 h-100" src={book.images} /></div>
                  <div className="book-info flex justify-content-between align-items-center ml-4">
                    <div>
                      <h4>{book.title}</h4>
                      <span className="text-muted">{book.author}</span>                      
                    </div>
                    <div className="bookmark mr-3 round-button"><FontAwesomeIcon icon={['far', 'heart']}/></div>
                  </div>
                </div>  
              ))}
              {
                !this.state.booksAreOver && 
                <div className="flex justify-content-center">
                  <button className="btn btn-primary btn-xl" onClick={this.showMore}>Show more</button>
                </div>
              }

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