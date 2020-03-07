import React from 'react'
import CategoriesFilter from 'App/components/filters/CategoriesFilter.jsx'
import Checkbox from 'App/components/Checkbox.jsx'
import BooksList from 'App/components/BooksList.jsx'
import { observer } from 'mobx-react'
import { observable } from "mobx"
import store from 'App/store'

@observer
class Books extends React.Component {
  @observable filters = {}
  @observable categories = []
  @observable search = ''
  
  updateFilters(){
    let filters = {
      category_id: this.categories
    }
    if (this.search) filters.q = this.search;

    this.filters = filters;
  }

  onSearchHandler(event){
    this.search = event.target.value;
    this.updateFilters();
  }

  onCategoriesChange(categories){
    this.categories = categories
    this.updateFilters();
  }

  render(){
    return  (
      <div className="container pt-5 page-books-search">
        <h1>Books Search</h1>

        <div className="flex">
          
          <div className="flex-grow-1 mr-5">
            <input type="text" className="form-control form-control-xl " placeholder="Search book by author or title" onChange={(e) => this.onSearchHandler(e)}/>
            
            <BooksList filters={ this.filters } loadOnStart/>
          </div>

          <div className="filters">
            <h2>Filters</h2>            
            <div>
              <h5 className="text-w-500"> Status </h5>
                <Checkbox label="Occuped" />
                <Checkbox label="On restoration" />
                <Checkbox label="Free" />
              <br />
              <h5 className="text-w-500">Categories</h5>
                <CategoriesFilter onChange={cats => this.onCategoriesChange(cats) }/>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
export default Books