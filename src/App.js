import React from "react";
import * as BooksAPI from './BooksAPI'
import "./App.css";
import BooksHome from "./BooksHome";
import BooksSearch from "./BooksSearch";
import { Route} from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[],
    searchResult: [],
    error: false,
  };

  componentDidMount () {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        },() => {console.log(this.state.books)})
      })
      .catch(e => {
        console.log(e);
        this.setState({
          error: true
        }) 
      })
  }

  changeShelf = (book,event) => {
    var shelf = event.target.value;
    BooksAPI.update(book,shelf)
      .then((books) => {
        this.setState((currentState) => ({
          books: currentState.books
            .filter((b) => {
              return b.id !== book.id;
            })
            .concat({ ...book, shelf }),
        }));
      })
      .catch(e => {
        console.log(e);
        this.setState({
          error: true
        }) 
      })
  }

  search = (query) => {
    if(query.length > 0){
      BooksAPI.search(query)
      .then((books) => {
        if(books.error){
          this.setState({books:[]})
        } else {
          books.forEach((book)=> {
            this.state.books.forEach((newBook) => {
              if(newBook.id === book.id) {
                book.shelf = newBook.shelf
              }
            })
          })
          this.setState({
            searchResult: books
          },() => console.log("searchResult", books))
        }
        
      })
      .catch(() => {
        console.log("Not found")
        this.setState({searchResult:this.props.books})
      })
    } else {
      console.log("empty")
    }
  }

  render() {
    const {error} = this.state;
    
    if (error) {
      return <div>Unfortunatly Network errors. Please check later.</div>;
  }
    return (
      <div>
          <Route exact path="/" render={() => (
            <BooksHome 
              books={this.state.books}
              updateShelf={this.changeShelf}
            />)} />
          <Route path="/search" render={() => (
            <BooksSearch 
              searchResult={this.state.searchResult}
              updateShelf={this.changeShelf}
              search = {this.search}
            />)} />
      </div>
    );
  }
}

export default BooksApp;
