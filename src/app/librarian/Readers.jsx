import React from 'react';

export default class Readers extends React.Component {
  constructor(props){
    super(props);
    this.state = { readers: [] }
  }

  componentDidMount(){
    fetch('http://localhost:3000/Readers')
    .then(res => res.json())
    .then(res => this.setState({readers: res}))
  }

  render(){
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
          { this.state.readers.map(reader => (
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