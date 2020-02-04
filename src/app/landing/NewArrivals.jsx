import React from 'react';

export default class NewArrivals extends React.Component {
  constructor(props){
    super(props);
    this.state = { books: [] }
  }
  
  componentDidMount() {
    fetch(`http://localhost:3000/books?_page=1&_limit=4`)
    .then(res => res.json())
    .then((res, req) => {
      this.setState({ books: res })
    })
  }

  render(props){
    return (
      <div className="container landing-new-arrivals">
        <h2 className="landing-header text-center">New Arrivals</h2>
        <h4 className="landing-sub-header text-center">Check out our new books</h4>
        <div className="landing-image-block">
          { this.state.books.map(book => (
            <div style={{ backgroundImage: `url(${book.images})`}} key={book.id}>
              <span></span>
              <div className="bottom-text">
                <h5>{book.title}</h5>
                <p>{book.author}</p>
              </div>  
            </div>
            ))}
        </div>
      </div>
    )
  }
}