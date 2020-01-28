import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './landing/Landing.jsx';

import Readers from './librarian/Readers.jsx';
import BooksSearch from './librarian/BooksSearch.jsx';
import AddBook from './librarian/AddBook.jsx';

import { faAngleDown, faEllipsisH, faAngleRight, faAngleLeft, faAngleDoubleRight, faAngleDoubleLeft, faSignOutAlt, faCheckSquare as fasCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
library.add(faAngleDown, faEllipsisH, faAngleRight, faAngleLeft, faAngleDoubleRight, faAngleDoubleLeft, faSignOutAlt, faHeart, faSquare, faCheckSquare, fasCheckSquare)

import Navbar from './components/Navbar.jsx'


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component = { Landing } />
        <Route path="/readers" component = { Readers } />
        <Route path="/books_search" component = { BooksSearch } />
        <Route path="/add_book" component = { AddBook } />
      </Switch>
    </Router>
  );
}

export default App;
