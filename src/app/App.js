import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './landing/Landing.jsx';

import Readers from './librarian/Readers.jsx';
import BooksSearch from './librarian/BooksSearch.jsx';
import AddBook from './librarian/AddBook.jsx';
import Book from './librarian/Book.jsx';

import { faAngleDown, faEllipsisH, faPlaceOfWorship, faSignOutAlt, faCheckSquare as fasCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
library.add(faAngleDown, faEllipsisH, faPlaceOfWorship, faSignOutAlt, faHeart, faSquare, faCheckSquare, fasCheckSquare);

// icons for categories
import { faBabyCarriage, faGraduationCap, faGlassCheers, faDragon, faUserSecret } from '@fortawesome/free-solid-svg-icons';
library.add(faBabyCarriage, faGraduationCap, faGlassCheers, faDragon, faUserSecret);

//all brand icons used in the project
import { faReact, faSass, faNpm, faFacebookF, faGithubAlt, faInstagram } from '@fortawesome/free-brands-svg-icons';
library.add(faReact, faSass, faNpm, faFacebookF, faGithubAlt, faInstagram);

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'


function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex-grow-1">
        <Switch>
          <Route exact path="/" component = { Landing } />
          <Route path="/readers" component = { Readers } />
          <Route path="/books_search" component = { BooksSearch } />
          <Route path="/add_book" component = { AddBook } />
          <Route path="/book/:book_id" component = { Book } />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
