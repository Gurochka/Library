import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class OrderNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render(){
    return  (
      <div className="page-order-new container my-5">
        <h1>Order New</h1>
        <div className="flex">
          <input type="text" className="form-control flex-grow-1 mb-0 mr-5 py-3" placeholder="Find Book by ISBN, Author or Title"/>
          <button className="btn btn-primary btn-xl px-5"><FontAwesomeIcon icon="barcode"/> Or Scan Barcode</button>
        </div>
      </div>
    )
  }
}