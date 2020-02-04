import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Events(){
  return (
    <div className="container landing-events">
      <h3 className="landing-header text-center">Upcoming Events</h3>
      <h4 className="landing-sub-header text-center">Events Calendar for library programs</h4>

      <ul className="timeline">
        <li className="event" data-date="Feb 3, 10:45am">
          <h5>Toddler Art Class</h5>
          <p>Enjoy the tactile wonders of paint, glitter, glue and more. Smocks or "messy" clothes recommended. For toddlers ages 18 - 36 months. Please pick up a nametag 15 minutes before the program begins.</p>
        </li>
        <li className="event" data-date="Feb 3, 1pm to 5pm">
          <h5>Drop-In Basic Computer Help</h5>
          <p>Get help with basic computer questions: email, printing, filling out online forms, etc.</p>
        </li>
        <li className="event" data-date="Feb 2, 2pm to 3:30pm">
          <h5>The Basics of Storytelling</h5>
          <p>In this 90 minute workshop, participants will learn how to find and shape stories. 
            You can bring an existing story to shape or find a new story from your life. 
            We will discuss the five main elements to a story and how to discover them.
            <br/>
            No registration required, participants should be 16 years old or older.
          </p>
        </li>
      </ul>
      
    </div>
  )
}

export default Events