import React from 'react';

export default class AddBook extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories: [],
      worderyURL: ''
    }
    this.parseWorderyURL = this.parseWorderyURL.bind(this);
    this.handleWorderyUrl = this.handleWorderyUrl.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/categories")
      .then(res => { return res.json()})
      .then(res => {
        this.setState({
          categories: res
        })
      })
  }

  handleWorderyUrl(event){
      this.setState({worderyURL: event.target.value});
  }

  parseWorderyURL(){
    console.log('parse wordery URL', this.state.worderyURL);
    fetch("https://www.amazon.com/Last-Wish-GOLLANCZ-S-F/dp/1473226406/ref=olp_product_details?_encoding=UTF8&me=")
      .then(res => {
        console.log('wordery res: ', res)
      })
  }

  render(){
    const { categories } = this.state;
    return  (
      <div className="container pt-5">
        <h1>Add new book</h1>

        <input type="text" className="form-control" placeholder="Enter URL from wordery.com to parse a book" value={this.state.worderyURL} onChange={this.handleWorderyUrl}/>
        <button className="btn btn-primary" onClick={this.parseWorderyURL}>Parse</button>
        <hr />
        
        <div className="flex">
          <div className="w-50 pr-4">
            <input type="text" className="form-control" name="title" required placeholder="Title"/>
            <input type="text" className="form-control" name="author" required placeholder="Author"/>
            <select className="form-control" name="category" required placeholder="Category">
              {categories.map(item => (
                <option key={item.id} value={item.id}>{item.title}</option>
                ))
              }
            </select>
            <input type="text" className="form-control" name="publishers" required placeholder="Publisher(s)"/>
          </div>
          <textarea className="form-control w-50" name="description" required placeholder="Description"></textarea>
        </div>

        <div className="flex">
          <div className="w-50 pr-4">
            <input type="number" className="form-control" name="publication_date" required placeholder="Year of publication"/>
            <input type="number" className="form-control" name="pages" required placeholder="Pages number"/>
          </div>
          <div className="w-50">
            <input type="number" className="form-control" name="isbn" required placeholder="ISBN"/>
            <input type="text" className="form-control" name="translated_by" required placeholder="Translated By"/>          
          </div>
        </div>
        <button className="btn btn-primary btn-xl">Add Book</button>
      </div>
    )
  }
}