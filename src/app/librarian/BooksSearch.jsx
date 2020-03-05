import React from 'react';
import Checkbox from 'App/components/Checkbox.jsx';
import BooksList from 'App/librarian/BooksList.jsx'
import { observer } from 'mobx-react'
import { observable } from "mobx";
import store from 'App/store'

@observer
class BooksSearch extends React.Component {
  @observable filters = {}
  @observable categories = []
  @observable search = ''
  
  componentDidMount() {
    store.getCategories().then(cat => {
      this.categories = cat.slice().map(category => { category.checked = true; return category })
    })
  }

  updateFilters(){
    let filters = {}
    if (this.search) filters.q = this.search;

    let checked_categories = this.categories.filter(cat => cat.checked).map(cat => cat.id);
    filters.category_id = checked_categories.length == this.categories.length ? [] : checked_categories;

    this.filters = filters;
  }

  onSearchHandler(event){
    this.search = event.target.value;
    this.updateFilters();
  }

  onCategoriesClick(category){
    category.checked = !category.checked;
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
{/*              <div><input type="checkbox" /> <label> Include Occuped </label> </div>
              <div><input type="checkbox" /> <label> Include those I've read </label> </div>*/}
              <h5 className="text-w-500"> Status </h5>
                <Checkbox label="Occuped" />
                <Checkbox label="On restoration" />
                <Checkbox label="Free" />
              <br />
              <h5 className="text-w-500">Categories</h5>
              <div>
                {this.categories.map(category => (
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
export default BooksSearch