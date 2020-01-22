import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './landing/Landing.jsx';

import Readers from './librarian/Readers.jsx';
import BooksSearch from './librarian/BooksSearch.jsx';
import AddBook from './librarian/AddBook.jsx';

import { faAngleDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faAngleDown, faSignOutAlt)

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
