import React from 'react'
import { observer } from 'mobx-react'

@observer
class Reader extends React.Component {
  render(){
    return  (
      <h1>Reader</h1>
    )
  }
}
export default Reader