import React, { createContext } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from 'App/pages/Landing/Landing.jsx';

import Readers from 'App/pages/readers/Readers.jsx';
import ReaderNew from 'App/pages/readers/ReaderNew.jsx';
import Reader from 'App/pages/readers/Reader.jsx';

import Books from 'App/pages/books/Books.jsx';
import BookNew from 'App/pages/books/BookNew.jsx';
import Book from 'App/pages/books/Book.jsx';

import Orders from 'App/pages/orders/Orders.jsx';
import OrderNew from 'App/pages/orders/OrderNew.jsx';
import Order from 'App/pages/orders/Order.jsx';

import NoMatch from 'App/pages/NoMatch.jsx';

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

          <Route path="/books" component = { Books } />
          <Route path="/book/new" component = { BookNew } />
          <Route path="/book/:book_id" component = { Book } />

          <Route path="/orders" component = { Orders } />
          <Route path="/order/new" component = { OrderNew } />
          <Route path="/order/:order_id" component = { Order } />

          <Route path="/readers" component = { Readers } />
          <Route path="/reader/new" component = { ReaderNew } />
          <Route path="/reader/:reader_id" component = { Reader } />

          <Route path="*" component = { NoMatch } />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
