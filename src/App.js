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
    books:[]
  };
  componentDidMount () {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        },() => {console.log(this.state.books)})
      })
  }

  changeShelf = (book,shelf) => {
    BooksAPI.update(book,shelf)
      .then((books) => {
        this.setState({books: books})
      })
  }

  render() {
    return (
      <div>
          <Route exact path="/" render={() => (
            <BooksHome 
              books={this.state.books}
              onChangeBookSelf={this.changeShelf}
            />)} />
          <Route path="/search" render={() => (
            <BooksSearch 
              books={this.state.books}
            />)} />
      </div>
    );
  }
}

export default BooksApp;
