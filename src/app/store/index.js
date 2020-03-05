import { action, observable, computed } from 'mobx';

class Store {
  constructor(){
    this.getCategories()
  }

  serialize(obj){
    return Object.keys(obj).map(key => {
      if (Array.isArray(obj[key])) return obj[key].map(val => `${key}=${val}`).join('&')
        else return `${key}=${obj[key]}`;
    }).join('&');
  }

  @observable categories = []

  @action getCategories(){
    return fetch('http://localhost:3000/categories')
      .then(res => res.json())
      .then(categories => {
        this.categories = categories
        return categories
      })
  }

  @action getBook(book_id){
    return fetch(`http://localhost:3000/Books/${book_id}`)
      .then(res => { return res.json()})
  }

  @action getBooksByFilter(filters){
    let totalPages; 
    return fetch(`http://localhost:3000/books?${this.serialize(filters)}`)
      .then(res => {
        let headers = res.headers.get('Link');
        if (headers) headers = parseInt(headers.match(/_page=(\d)+/g).pop().replace('_page=', ''), 10);
        totalPages = headers || 0;
        return res.json() 
      })
      .then(res => {
        return { books: res, total: totalPages }
      })
  }

  @action createOrder(order){
    return fetch('http://localhost:3000/orders', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(order)
    });
  }

  @observable readers = [];

  @action getReaders(){
    fetch('http://localhost:3000/Readers')
    .then(res => res.json())
    .then(res => this.readers = res)    
  }
}

export default new Store()