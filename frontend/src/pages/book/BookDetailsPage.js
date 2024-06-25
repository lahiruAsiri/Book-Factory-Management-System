import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'; 
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf'; 
import pdfimg from '../../img/pdfimg.png';
import 'jspdf-autotable';

import './bookdetailspage.css'; 

const BookDetailsPage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch books: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching books:', error.message);
        }
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    let myChart = null; // Initialize Chart instance variable
    
    const createChart = () => {
      // Destroy existing Chart instance if it exists
      if (myChart) {
        myChart.destroy();
      }
      
      const ctx = document.getElementById('myChart').getContext('2d');
      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: books.map(book => book.book_name),
          datasets: [{
            label: 'Market Price',
            data: books.map(book => book.book_marketPrice),
            backgroundColor: 'rgba(255, 206, 86, 0.8)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          },
          {
            label: 'Making Price',
            data: books.map(book => book.book_makingPrice),
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                font: {
                  color: 'white',
                  size: 14 
                }
              }
            },
            x: {
              ticks: {
                font: {
                  color: 'white',
                  size: 14 
                }
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  color: 'white',
                  size: 16 
                }
              }
            },
            title: {
              display: true,
              text: 'Book Prices',
              font: {
                color: 'white',
                size: 20 
              }
            }
          }
        }
      });
    };

    createChart(); 

    return () => {
      // Cleanup function to destroy Chart instance when component unmounts
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [books]); 

// Function to download PDF report
const downloadReportPDF = () => {
 
  const doc = new jsPDF();

  const backgroundImage = new Image();
  backgroundImage.onload = function() {
  
    doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

  
    const columns = ["Book Name", "Author", "Market Price", "Making Price"];

  
    const data = books.map(book => [book.book_name, book.book_author, book.book_marketPrice, book.book_makingPrice]);

    // Add table (content starts lower)
    doc.autoTable({
      startY: 70, 
      head: [columns],
      body: data,
      theme: 'striped', 
      margin: { top: 20 },
      styles: {
        font: 'helvetica', 
        fontStyle: 'normal',
        fontSize: 10,
        lineColor: '#ffffff', 
        textColor: '#000000' 
      },
      headStyles: {
        fillColor: '#000000',
        textColor: '#ffffff' 
      }
    });

    // Header
    doc.setFont('times', 'bold');
    doc.setFontSize(20);
    doc.setTextColor('#000000'); 
    const headerTopMargin = 60; 
    doc.text("Books Report", 105, headerTopMargin, null, null, "center");

    // Save PDF
    doc.save('books_report.pdf');
  };
  backgroundImage.src = pdfimg; 
};




  return (
    <div>
      <Home2nav />
      <div className="book-details-page">
        <h2>BOOKS REPORT</h2>
        <div className="books-container">
          <div className="book-details-column">
            {error && <div>Error: {error}</div>}
            <div className="books">
              {books.map(book => (
                <div className="book-container" key={book._id}>
                  <h3 className="book-title">{book.book_name}</h3>
                  <p className="book-text"><strong>Author:</strong> {book.book_author}</p>
                  <p className="book-text"><strong>Market Price:</strong> {book.book_marketPrice}</p>
                  <p className="book-text"><strong>Making Price:</strong> {book.book_makingPrice}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-column">
            <div className="bookchart-container">
              <h2 className="chart-title">Market Price vs Making Price</h2>
              <canvas id="myChart" className="chart-canvas" width="400" height="200"></canvas>
            </div>
            <Link to="/BookDetails" className="back-button">Back To Menu</Link>
            <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
