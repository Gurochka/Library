import React from 'react';
import { observer } from 'mobx-react'
import store from 'App/store'

@observer
class Readers extends React.Component {
  componentDidMount(){
    store.getReaders()
  }

  render(){
    const { readers } = store
    let transformPhone = (phone) => {
      return `+7(${phone.substr(0, 3)})${phone.substr(3, 3)}-${phone.substr(6, 2)}-${phone.substr(8, 2)}`
    }
    return  (
      <div className="container mt-5 readers-page">
        <h1>Readers</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>  
          { readers.map(reader => (
            <tr key={reader.id}>
              <td><img src={`/public/images/users/${reader.photo}`} /></td>
              <td>{reader.given_name} {reader.surname}</td>
              <td>{transformPhone(reader.phone)}</td>
              <td>{reader.email}</td>
            </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }
}
export default Readers