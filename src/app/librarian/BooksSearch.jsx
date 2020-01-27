import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from 'App/components/Checkbox.jsx';

export default class BooksSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      categories: []
    }
  }
  componentDidMount() {
    fetch("http://localhost:3000/books")
    .then(res => { return res.json()})
    .then(res => {
      this.setState({ books: res })
      console.log('all books: ', res)
    })

    fetch("http://localhost:3000/Categories")
    .then(res => { return res.json()})
    .then(res => {
      this.setState({categories: res})
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

              <div>
                <input type="text" className="form-control form-control-xl" placeholder="Search book by author or title" />
              </div> 

              {books.map(book => (
                <div className="book-container flex mb-3" key={book.id}>
                  <div className="book-cover"><img className="w-100 h-100" src={book.images} /></div>
                  <div className="book-info flex justify-content-between align-items-center ml-4">
                    <div>
                      <h4>{book.title}</h4>
                      <span className="text-muted">{book.author}</span>                      
                    </div>
                    <div className="bookmark mr-3"><FontAwesomeIcon icon={['far', 'heart']}/></div>
                  </div>
                </div>  
              ))}
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
                  <Checkbox label={category.title} key={category.id} />
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