import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from 'App/landing/Landing.jsx';

import Readers from 'App/librarian/Readers.jsx';
import BooksSearch from 'App/librarian/BooksSearch.jsx';
import BookNew from 'App/librarian/BookNew.jsx';
import Book from 'App/librarian/Book.jsx';
import OrderNew from 'App/librarian/OrderNew.jsx';
import NoMatch from 'App/NoMatch.jsx';

import { faAngleDown, faEllipsisH, faPlaceOfWorship, faSignOutAlt, faCheckSquare as fasCheckSquare, faBarcode, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faSquare, faCheckSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
library.add(faAngleDown, faEllipsisH, faPlaceOfWorship, faSignOutAlt, faHeart, faSquare, faCheckSquare, fasCheckSquare, faBarcode, faPlus, faTrashAlt, faTimes);

// icons for categories
import { faBabyCarriage, faGraduationCap, faGlassCheers, faDragon, faUserSecret } from '@fortawesome/free-solid-svg-icons';
library.add(faBabyCarriage, faGraduationCap, faGlassCheers, faDragon, faUserSecret);

//all brand icons used in the project
import { faReact, faSass, faNpm, faFacebookF, faGithubAlt, faInstagram } from '@fortawesome/free-brands-svg-icons';
library.add(faReact, faSass, faNpm, faFacebookF, faGithubAlt, faInstagram);

import Navbar from 'App/components/Navbar.jsx'
import Footer from 'App/components/Footer.jsx'


function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex-grow-1">
        <Switch>
          <Route exact path="/" component = { Landing } />
          <Route path="/readers" component = { Readers } />
          <Route path="/books" component = { BooksSearch } />
          <Route path="/book/new" component = { BookNew } />
          <Route path="/book/:book_id" component = { Book } />
          <Route path="/order/new" component = { OrderNew } />
          <Route path="*" component = { NoMatch } />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
