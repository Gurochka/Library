import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Activities(){
  return (
    <div className="container landing-activities">
      <h2 className="landing-header text-center">Our Exhibitions and Activities</h2>

      <div className="landing-image-block">
        
        <div style={{ backgroundImage: "url(/public/images/activities/15821_mainfoto1_03.jpg)"}}>
        
          <span className="tag tag-primary">painting</span>

          <div className="bottom-text">
            <span className="tag">till 5th May, 2020</span>
            <h4>Exhibition of paintings by Fyodor Konyukhov</h4>
            <p>Nam nisl lacus, dignissim ac tristique ut, scelerisque eu massa. Vestibulum ligula nunc, rutrum in</p>
          </div>
        
        </div>

        <div style={{ backgroundImage: "url(/public/images/activities/761568002812.jpg)"}}>

          <span className="tag tag-primary">maps</span>

          <div className="bottom-text">
            <span className="tag">till 30th June, 2020</span>
            <h4>Imaginary Lands on Maps</h4>
            <p>Nam nisl lacus, dignissim ac tristique ut, scelerisque eu massa. Vestibulum ligula nunc, rutrum in</p>
          </div>

        </div>

        <div style={{ backgroundImage: "url(/public/images/activities/pexels-photo-2079661.jpeg)"}}>
          <span className="tag tag-primary">books</span>

          <div className="bottom-text">
            <span className="tag">till 5th May, 2020</span>
            <h4>Collection of Bibles from the Rare Books</h4>
            <p>Nam nisl lacus, dignissim ac tristique ut, scelerisque eu massa. Vestibulum ligula nunc, rutrum in</p>
          </div>        
        </div>

      </div>
    </div>
    )
}

export default Activities