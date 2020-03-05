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
  static defaultProps = {
    page: 1,
    total: 0
  }

  getPagesArray(){
    let {total, page} = this.props;
    if (total == 0) return [];
    let pages = [page];

    // fill array before current page
    for (let i = 1; i < 5; i++){
      if (page - i > 0) pages.unshift(page - i)
    }
    if (pages[0] != 1) pages.splice(0, 2, 1, '...');

    //fill array after current page
    let others = 10 - pages.length;
    for (let i = 1; i < others; i++){
      if ((page + i) <= total) pages.push(page + i);
    }
    if (pages[pages.length - 1] < total) pages.splice(pages.length - 2, 2, '...', total)

    return pages
  }

  render(){
    let pagesArray = this.getPagesArray()

    return  (
      <ul className="pagination flex justify-content-center list-ustyled">
        {
          pagesArray.map((pageNum, idx) => {
            if (pageNum == '...') return <li key={idx} className="dots flex align-items-center mx-2"><FontAwesomeIcon icon="ellipsis-h"/></li>
              else return <li key={idx} className={`round-button ${this.props.page == pageNum ? 'active' : ''} `} onClick={() => this.props.onChange(pageNum)}>{pageNum}</li>
            })
        }
      </ul> 
    );
  }
}