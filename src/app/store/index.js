import { action, observable } from 'mobx';

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

// -------------- categories --------------

  @observable categories = []

  @action getCategories(){
    return fetch('http://localhost:3000/categories')
      .then(res => res.json())
      .then(categories => {
        this.categories = categories
        return categories
      })
  }

// --------------------- books ------------------
  @action getBook(book_id){
    return fetch(`http://localhost:3000/Books/${book_id}`)
      .then(res => { return res.json()})
  }

  @action getBooksByFilter(filters){
    filters = Object.assign({}, filters)

    if (filters.category_id && filters.category_id.length == 0) delete filters.category_id;
    if (filters.search != undefined && !filters.search) delete filters.search; 
    
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

//----------------- orders ----------------------

  @observable orders = [];
  
  @action getOrders(){
    return fetch('http://localhost:3000/orders')
      .then(res => res.json())
      .then(res => {
        this.orders = res;
        return res
      })
  }

  @action getOrder(id){
    return fetch(`http://localhost:3000/orders/${id}`)
    .then(res => res.json())
  }

  @action createOrder(order){
    return fetch('http://localhost:3000/orders', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(order)
    }).then(res => res.json())
  }

// -------------------- readers ------------------

  @observable readers = [];

  @action getReaders(){
    return fetch('http://localhost:3000/Readers')
    .then(res => res.json())
    .then(res => {
      this.readers = res
      return res;
    })    
  }
}

export default new Store()