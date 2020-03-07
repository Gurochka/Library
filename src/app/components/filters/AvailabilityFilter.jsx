import React from 'react'
import Checkbox from 'App/components/Checkbox.jsx'
import { observer } from 'mobx-react'
import { observable } from "mobx"

@observer
class AvailabilityFilter extends React.Component {
  @observable available = true
  @observable occuped = true

  defineFilter = () => {
    let filter;
    if (this.available && this.occuped) filter = [true, false]
    if (this.available && !this.occuped) filter = [true]
    if (!this.available && this.occuped) filter = [false]
    if (!this.available && !this.occuped) filter = [true, false]
    return filter
  }

  onAvailableClick = () => {
    this.available = !this.available
    if (this.props.onChange) this.props.onChange(this.defineFilter())
  }
  onOccupedClick = () => {
    this.occuped = !this.occuped
    if (this.props.onChange) this.props.onChange(this.defineFilter())
  }

  render(){
    return  (
      <div>
        <Checkbox label="Available" onChange={() => this.onAvailableClick() }/>      
        <Checkbox label="Occuped" onChange={() => this.onOccupedClick() }/>
      </div>
    )
  }  
}

export default AvailabilityFilter