import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import store from 'App/store'
import { observable } from "mobx"

@observer
class NewArrivals extends React.Component {
  @observable newBooks = [];

  componentDidMount() {
    store.getBooksByFilter({ _page: 1, _limit: 4 }).then(res => this.newBooks = res.books)
  }

  render(props){
    return (
      <div className="bg-secondary pt-2 pb-5">
        <div className="container landing-new-arrivals">
          <h2 className="landing-header text-center">New Arrivals</h2>
          <h4 className="landing-sub-header text-center">Check out our new books</h4>
          <div className="landing-image-block">
            { this.newBooks.map(book => (
              <Link to={`/book/${book.id}`} style={{ backgroundImage: `url(${book.images})`}} key={book.id}>
                <span></span>
                <div className="bottom-text">
                  <h5>{book.title}</h5>
                  <p>{book.author}</p>
                </div>  
              </Link>
              ))}
          </div>
        </div>
      </div>
    )
  }
}
export default NewArrivals