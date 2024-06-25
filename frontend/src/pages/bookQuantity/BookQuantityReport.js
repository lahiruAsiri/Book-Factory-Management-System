import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'; 
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf'; 
import pdfimg from '../../img/pdfimg.png'; 
import 'jspdf-autotable'; 



import './QuantityReport.css'; 

const BookQuantityReport = () => {
  const [bookQuantity, setBookQuantity] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookQuantity = async () => {
      try {
        const response = await axios.get('/api/bookquantitys');
        setBookQuantity(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch book quantity: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching book quantity:', error.message);
        }
      }
    };
    fetchBookQuantity();
  }, []);

  useEffect(() => {
    let barChart = null;
    let pieChart = null;
    
    const createBarChart = () => {
      if (barChart) {
        barChart.destroy();
      }
      
      const ctx = document.getElementById('barChart').getContext('2d');
      barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: bookQuantity.map(book => book.book_name),
          datasets: [{
            label: 'Book Quantity',
            data: bookQuantity.map(book => book.book_quantity),
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            borderRadius: 10,
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
              text: 'Book Quantity',
              font: {
                color: 'white',
                size: 20
              }
            }
          }
        }
      });
    };

    const createPieChart = () => {
      if (pieChart) {
        pieChart.destroy();
      }
      
      const ctx = document.getElementById('pieChart').getContext('2d');
      pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: bookQuantity.map(book => book.book_name),
          datasets: [{
            label: 'Book Quantity',
            data: bookQuantity.map(book => book.book_quantity),
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)'
            ],
            hoverOffset: 4
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Book Quantity',
              font: {
                color: 'white',
                size: 20
              }
            }
          }
        }
      });
    };

    createBarChart();
    createPieChart();

    return () => {
      if (barChart) {
        barChart.destroy();
      }
      if (pieChart) {
        pieChart.destroy();
      }
    };
  }, [bookQuantity]);

  const downloadReportPDF = () => {
    const doc = new jsPDF();
  
    const backgroundImage = new Image();
    backgroundImage.onload = function() {
      doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
  
      const columns = ["Book Name", "Quantity"];
  
      const data = bookQuantity.map(book => [book.book_name, book.book_quantity]);
  
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
      doc.text("Books Quantity Report", 105, headerTopMargin, null, null, "center");
  
      // Save PDF
      doc.save('books_quantity_report.pdf');
    };
    backgroundImage.src = pdfimg; 
  };
  

  return (
    <div>
            <Home2nav />
    <div className="book-details-page">
      <h2>BOOKS QUANTITY REPORT</h2>
      <div className="books-container">
        <div className="book-details-column">
          {error && <div>Error: {error}</div>}
          <div className="books">
            {bookQuantity.map(book => (
              <div className="book-container" key={book._id}>
                <h3 className="book-title">{book.book_name}</h3>
                <p className="book-text"><strong>Quantity:</strong> {book.book_quantity}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-column" >
          <div className="quantitychart-container" >
            <h2 className="chart-title">Book Quantity (Bar Chart)</h2>
            <canvas id="barChart" className="chart-canvas" width="400" height="200"></canvas>
          </div>
          <div className="chart-container" >
            <h2 className="chart-title">Book Quantity (Pie Chart)</h2>
            <canvas id="pieChart" className="chart-canvas" width="400" height="200"></canvas>
          </div>
          <Link to="/BookQuantity" className="back-button">Back To Menu</Link>
          <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>

        </div>
      </div>
    </div>
    </div>
  );
};

export default BookQuantityReport;
