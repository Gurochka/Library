import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Checkbox extends React.Component {
  constructor(props){
    super(props);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
    this.state = { value: true }
  }

  handleCheckboxClick(event){
    this.setState({
      value: !this.state.value 
    })
    if (this.props.onChange) this.props.onChange()
  }
  render(props){
    return  (
      <div className={`library-checkbox flex align-items-center mb-1 ${this.state.value ? 'checked' : 'unchecked'}`} onClick={this.handleCheckboxClick}>
        <FontAwesomeIcon className="fa-unchecked" icon={['far', 'square']}/>
        <FontAwesomeIcon className="fa-hovered" icon={['far', 'check-square']}/>
        <FontAwesomeIcon className="fa-checked" icon={['fas', 'check-square']}/>
        <input type="checkbox" checked={this.state.value} onChange={this.handleCheckboxClick}/>
        <label>{this.props.label}</label>
      </div> 
    );
  }
}