import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observable } from "mobx"
import { observer } from 'mobx-react'

@observer
export default class Checkbox extends React.Component {
  @observable value = true

  componentDidUpdate(){
    if (this.value !== this.props.value) this.value = this.props.value
  }

  handleCheckboxClick(event){
    this.value = !this.value
    if (this.props.onChange) this.props.onChange(this.value)
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