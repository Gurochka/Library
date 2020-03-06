import React from 'react';
import { observer } from 'mobx-react'
import store from 'App/store'

@observer
class Order extends React.Component {
  render(){
    return  (
      <h1>Order</h1>
    )
  }
}
export default Order