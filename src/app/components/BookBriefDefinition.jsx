import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';

export default function BookBriefDefinition(props){
  return (
      <Link to={`/book/${props.book.id}`} className="book-container flex mb-3">
        <div className="book-cover"><img className="w-100 h-100" src={props.book.images} /></div>
        <div className="book-info flex justify-content-between align-items-center ml-4">
          <div>
            <h4>{props.book.title}</h4>
            <span className="text-muted">{props.book.author}</span>                      
          </div>
          <div className="bookmark mr-3 round-button"><FontAwesomeIcon icon={['far', 'heart']}/></div>
        </div>
      </Link>
    )
}