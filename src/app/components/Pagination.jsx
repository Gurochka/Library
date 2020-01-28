import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


/*
  Pagination 
  total elements for pagination are always 9, combinations could be: 
  1 2 3 4 5 6 7 ... 37
  1 ... 5 6 7 8 9 ... 37
  1 2 3 4 5 6 7 ... 37
  1 ... 31 32 33 34 35 36 37
  etc
*/
export default class Pagination extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      page: this.props.page || 1,
      total: this.props.total, // total count of elements 
      perPage: this.props.perPage
    }
  }

  handleClick(i, val){
    console.log('click!', val, this.props)
    this.setState({ page: val })
    this.props.onChange(val)

  }

  getPagesArray(){
    let totalPages = Math.ceil(this.state.total / this.state.perPage);
    if (totalPages == 0) return [];
    let pages = [this.state.page];

    // fill array before current page
    for (let i = 1; i < 5; i++){
      if (this.state.page - i > 0) pages.unshift( this.state.page - i)
    }
    if (pages[0] != 1) pages.splice(0, 2, 1, '...');

    //fill array after current page
    let others = 10 - pages.length;
    for (let i = 1; i < others; i++){
      if ((this.state.page + i) <= totalPages) pages.push(this.state.page + i);
    }
    if (pages[pages.length - 1] < totalPages) pages.splice(pages.length - 2, 2, '...', totalPages)

    return pages
  }

  render(){
    let pagesArray = this.getPagesArray()

    return  (
      <ul className="pagination flex justify-content-center list-ustyled">
        {
          pagesArray.map((val, i) => {
            if (val == '...') return <li key={i} className="dots flex align-items-center mx-2"><FontAwesomeIcon icon="ellipsis-h"/></li>
              else return <li key={i} className={`round-button ${this.state.page == val ? 'active' : ''} `} onClick={() => this.handleClick(i, val)}>{val}</li>
            })
        }
      </ul> 
    );
  }
}