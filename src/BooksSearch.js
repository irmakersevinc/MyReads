import React, {Component} from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'


class BooksSearch extends Component{
  state={
    searchResult: this.props.books,
    query:''
  }

  updateQuery=(query) =>{
    this.setState(() => ({
      query: query
    }))
    this.props.search(this.state.query)
  }

    render() {
      const {query}= this.state 
      const {searchResult} = this.props

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link
                className="close-search"
                to="/"
              >
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
              <div className="search-books-results">
                {this.state.query !== '' && 
                  <ol className="books-grid">
                    {searchResult.length !==0 && searchResult.map((book,key) => (
                      <li key={key}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{width: 128, height:193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`}}></div>
                                    <div className="book-shelf-changer">
                                      <select value={book.shelf ? book.shelf : "none"} onChange={(event)=>this.props.updateShelf(book,event)}>
                                          <option value="move" disabled>Move to...</option>
                                          <option value="currentlyReading">Currently Reading</option>
                                          <option value="wantToRead">Want to Read</option>
                                          <option value="read">Read</option>
                                          <option value="none">None</option>
                                      </select>
                                    </div>
                                  </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors ? book.authors : 'Unkown Author'}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                }
            </div>
            

          </div>
        )
    }
}

export default BooksSearch;