import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react'
import store from 'App/store'

@observer
class PopularCategories extends React.Component {
  render(props){
    let { categories } = store;
    return (
      <div className="container landing-popular-categories pt-4">
        <h2 className="landing-header text-center">Popular Categories</h2>
        <div className="categories">
          {categories.map(category => (
            <div key={category.id} className="flex align-items-center justify-content-center flex-column">
              <FontAwesomeIcon className="fa-checked" icon={category.icon}/>
              <p>{category.title}</p>
            </div>
            ))}
        </div>
      </div>
    )
  }
}
export default PopularCategories