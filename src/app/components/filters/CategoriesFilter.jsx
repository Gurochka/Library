import React from 'react'
import Checkbox from 'App/components/Checkbox.jsx'
import { observer } from 'mobx-react'
import { observable } from "mobx"
import store from 'App/store'

@observer
class CategoriesFilter extends React.Component {
  @observable categories = []

  componentDidMount() {
    store.getCategories().then(cat => {
      this.categories = cat.slice().map(category => { category.checked = true; return category })
    })
  }

  onCategoriesClick(category){
    category.checked = !category.checked;
    if (this.props.onChange){
      let checked_categories = this.categories.filter(cat => cat.checked).map(cat => cat.id);
      if (checked_categories.length == this.categories.length) checked_categories = []
      this.props.onChange(checked_categories)
    }
  }

  render(){
    return  (
      <div>
        {this.categories.map(category => (
          <Checkbox label={category.title} key={category.id} onChange={() => this.onCategoriesClick(category) }/>
          ))}
      </div>
      )
  }  
}

export default CategoriesFilter