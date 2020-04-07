import React from 'react'
import CategoriesFilter from 'App/components/filters/CategoriesFilter.jsx'
import AvailabilityFilter from 'App/components/filters/AvailabilityFilter.jsx'

import BooksList from 'App/components/BooksList.jsx'
import { observer } from 'mobx-react'
import { toJS, observable } from "mobx"

@observer
class Books extends React.Component {
  @observable filters = {
    available: [false],
    category_id: []
  }
  
  updateFilters(new_filters){
    this.filters = Object.assign({}, toJS(this.filters), new_filters)
  }

  render(){
    return  (
      <div className="container pt-5 page-books-search">
        <h1>Books Search</h1>

        <div className="flex">
          
          <div className="flex-grow-1 mr-5">
            <input type="text" className="form-control form-control-xl " placeholder="Search book by author or title" onChange={(e) => this.updateFilters({ q: e.target.value })}/>
            
            <BooksList filters={ this.filters } loadOnStart/>
          </div>

          <div className="filters">
            <h2>Filters</h2>            
            <div>
              <h5 className="text-w-500"> Book Status </h5>
                <AvailabilityFilter value={ toJS(this.filters.available) } onChange={filter => this.updateFilters({ available: filter})}/>
              <br />
              <h5 className="text-w-500">Categories</h5>
                <CategoriesFilter onChange={cats => this.updateFilters({ category_id: cats }) }/>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
export default Books