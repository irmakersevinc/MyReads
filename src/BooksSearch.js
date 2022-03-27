import React, {Component} from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'

//<button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>

class BooksSearch extends Component{
  state={
    searchResult: this.props.books,
    query:''
  }

  updateQuery=(query) =>{
    this.setState(() => ({
      query: query
    }), ()=> console.log("query: ", this.state.query))
    this.search()
  }

  search = async() => {
    if(this.state.query.length > 0){
      BooksAPI.search(this.state.query)
      .then((books) => {
        this.setState({
          searchResult: books
        },() => console.log(this.state.searchResult))
      })
      .catch(async() => {
        console.log("Not found")
        await this.setState({searchResult:this.props.books})
      })
    } else {
      console.log("empty")
    }
  }

  updateShelf = (book,event) =>{
    console.log("book", book);
    console.log("shelf", event.target.value)
    BooksAPI.update(book,event.target.value)
    
  }
    render() {
      const {query, searchResult}= this.state 

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
            {searchResult &&
              <div className="search-books-results">
                <ol className="books-grid">
                  {searchResult && searchResult.map((book,key) => (
                    <li key={key}>
                      <div className="book">
                          <div className="book-top">
                              {book.imageLinks.smallThumbnail !=undefined && <div className="book-cover" style={{width: 128, height:193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})`}}></div>}
                                  <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={(event)=>this.updateShelf(book,event)}>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            }

          </div>
        )
    }
}

export default BooksSearch;