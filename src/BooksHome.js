import React, {Component} from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

class BooksHome extends Component {
    state = {
        currentlyReading:[],
        read:[],
        wantToRead: []
    }
    
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    /*componentDidMount() {
        console.log("Here")
        this.setState({
            currentlyReading: this.props.books.filter((b) => (
                console.log(b.shelf),
                    b.shelf ==="read"
        ))
        },()=> {console.log(this.state.currentlyReading)})
    }*/

    render() {
        const {books} = this.props;
        const currentlyReading = books.filter((b) => (b.shelf === "currentlyReading"))
        const wantToRead = books.filter((b) => (b.shelf === "wantToRead"))
        const read = books.filter((b) => (b.shelf ==="read"))

        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {currentlyReading.map((book) => (
                          <li key={book.title}>
                              <div className="book">
                                  <div className="book-top">
                                      <div className="book-cover" style={{width: 128, height:193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                                          <div className="book-shelf-changer">
                                            <select value="currentlyReading">
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
                        ))
                      }  
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {wantToRead.map((book) => (
                            <li key={book.title}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{width: 128, height:193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                                        <div className="book-shelf-changer">
                                            <select  value="wantToRead">
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
                        ))
                        }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {read.map((book) => (
                            <li key={book.title}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{width: 128, height:193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                                        <div className="book-shelf-changer">
                                            <select value="read">
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
                        ))
                        }
                      
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
                <Link
                    to='/search'
                    className="open-search"
                >
                    Add a book
                </Link>
            </div>
          </div>
        )
    }
}

export default BooksHome;