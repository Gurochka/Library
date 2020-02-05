import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class PopularCategories extends React.Component {
  constructor(props){
    super(props);
    this.state = { categories: [] }
  }
  
  componentDidMount() {
    fetch(`http://localhost:3000/categories`)
    .then(res => res.json())
    .then((res, req) => {
      this.setState({ categories: res })
    })
  }

  render(props){
    return (
      <div className="container landing-popular-categories pt-4">
        <h2 className="landing-header text-center">Popular Categories</h2>
        <div className="categories">
          {this.state.categories.map(category => (
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