import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function BookBriefDefinition(props){
  
  let favourite_button = props.onFavorite ?  (
    <div className="bookmark mr-3 round-button">
      <FontAwesomeIcon icon={['far', 'heart']} title="Add to Favorite" onClick={(e) => props.onFavorite(props.book)}/>
    </div>
    ) : '';
  
  let add_button = props.onAddBook ? (
      <div className="bookmark mr-3 round-button" title="Add Book" onClick={(e) => { e.preventDefault(); props.onAddBook(props.book);}}>
        <FontAwesomeIcon icon={['fas', 'plus']} />
      </div>
      ) : '';

  return (
      <Link to={`/book/${props.book.id}`} className="book-container flex mb-3">
        <div className="book-cover"><img className="w-100 h-100" src={props.book.images} /></div>
        <div className="book-info flex justify-content-between align-items-center ml-4">
          <div>
            <h4>{props.book.title}</h4>
            <span className="text-muted">{props.book.author}</span>                      
          </div>
          <div>
            { favourite_button }
            { add_button }
          </div>
        </div>
      </Link>
    )
}