import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observable } from "mobx";

export default class Checkbox extends React.Component {
  @observable value = true

  handleCheckboxClick(event){
    this.value = !this.value
    if (this.props.onChange) this.props.onChange()
  }

  render(props){
    return  (
      <div className={`library-checkbox flex align-items-center mb-1 ${this.value ? 'checked' : 'unchecked'}`} onClick={(e) => this.handleCheckboxClick(e)}>
        <FontAwesomeIcon className="fa-unchecked" icon={['far', 'square']}/>
        <FontAwesomeIcon className="fa-hovered" icon={['far', 'check-square']}/>
        <FontAwesomeIcon className="fa-checked" icon={['fas', 'check-square']}/>
        <input type="checkbox" checked={this.value} onChange={(e) => this.handleCheckboxClick(e)}/>
        <label>{this.props.label}</label>
      </div> 
    );
  }
}