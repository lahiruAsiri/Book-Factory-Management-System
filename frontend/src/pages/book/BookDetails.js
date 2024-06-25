import React from 'react';
import AddBook from '../book/AddBookp';
import SearchBook from '../book/BookSearchPage';
import './BookDetails.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function BookDetails() {
  return (
    <div>
                  <Home2nav />

    <div className="book-details">
     <div className="section">
        <AddBook />
      </div>
      <div className="section">
       <div>
        <SearchBook />
       </div> 
       <div>
        <Link to="/booksdetails" className="BD-button">BOOK REPORT</Link>
       </div> 
       <div>
       <Link to="/deletebookp" className="BD-button">DELETE A BOOK DETAILS</Link>
       </div> 
       <div>
       <Link to="/SearchBookForUpdate" className="BD-button">UPDATE A BOOK DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>

  );
}

export default BookDetails;
