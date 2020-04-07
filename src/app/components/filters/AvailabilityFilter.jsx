import React from 'react'
import Checkbox from 'App/components/Checkbox.jsx'
import { observer } from 'mobx-react'
import { observable } from "mobx"
import store from 'App/store'

@observer
class AvailabilityFilter extends React.Component {
  @observable available
  @observable occuped

  componentDidMount(){
    console.log(this.props.value)
    if (this.props.value !== undefined){
      this.available = this.props.value.includes(true)
      this.occuped = this.props.value.includes(false)
      console.log('new availability?')
    }
  }

  componentDidUpdate()

  // defineFilter = () => {
  //   let filter;
  //   if (this.available && this.occuped) filter = [true, false]
  //   if (this.available && !this.occuped) filter = [true]
  //   if (!this.available && this.occuped) filter = [false]
  //   if (!this.available && !this.occuped) filter = [true, false]
  //   return filter
  // }

  onAvailableClick = () => {
    this.available = !this.available
    if (this.props.onChange) this.props.onChange(store.transformAvailabilityFilter(this.available, this.occuped))
  }

  onOccupedClick = () => {
    this.occuped = !this.occuped
    if (this.props.onChange) this.props.onChange(store.transformAvailabilityFilter(this.available, this.occuped))
  }

  render(){
    return  (
      <div>
        <Checkbox label="Available" value={ this.available } onChange={(val) => this.onAvailableClick(val) }/>
        <Checkbox label="Occuped" value={ this.occuped } onChange={(val) => this.onOccupedClick(val) }/>
      </div>
    )
  }  
}

export default AvailabilityFilter