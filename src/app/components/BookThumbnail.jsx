import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function BookThumbnail(props){
  return (
      <div className="svgOnHover">
        <Link to={`/book/${props.book.id}`} className="text-gray-700"><b>{props.book.author}</b> - { props.book.title }</Link>
        <FontAwesomeIcon icon={['fas', 'times']} onClick={() => props.onRemove(props.book) } className="ml-3 text-gray-700"/>
      </div>
    )
}