import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faAngleDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleDown, faSignOutAlt)

import Navbar from './components/Navbar.jsx'


function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>Lets start to develop!</h1>

    </div>
  );
}

export default App;
