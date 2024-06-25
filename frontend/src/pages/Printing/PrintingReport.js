import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfimg from '../../img/pdfimg.png';


import './PrintingReport.css';

const PrintingReport = () => {
  const [printings, setPrintings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrintings = async () => {
      try {
        const response = await axios.get('/api/printingmanages');
        setPrintings(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch printing details: ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError('Error fetching printing details:', error.message);
        }
      }
    };
    fetchPrintings();
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
        type: 'pie',
        data: {
          labels: ['Pending', 'Completed'],
          datasets: [{
            label: 'Printing Status',
            data: [
              printings.filter(printing => printing.printing_status === 'Pending').length,
              printings.filter(printing => printing.printing_status === 'Completed').length
            ],
            backgroundColor: ['#ffcc00', '#36a2eb'],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom'
            },
            title: {
              display: true,
              text: 'Printing Status',
              font: {
                size: 20
              }
            }
          }
        }
      });
    };

    if (printings.length > 0) {
      createChart(); // Initial chart creation
    }

    return () => {
      // Cleanup function to destroy Chart instance when component unmounts
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [printings]);

  // Function to download PDF report
const downloadReportPDF = () => {
 
  const doc = new jsPDF();

  const backgroundImage = new Image();
  backgroundImage.onload = function() {
  
    doc.addImage(backgroundImage, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

    const columns = ["Book Name", "Printing Quantity", "Need Material", "Printing Status"];
    const data = printings.map(printing => [
      printing.printing_bookName,
      printing.printing_quantity,
      printing.need_material,
      printing.printing_status
    ]);

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
    doc.text("Printing Report", 105, headerTopMargin, null, null, "center");

    // Save PDF
    doc.save('Printing_report.pdf');
  };
  backgroundImage.src = pdfimg; 
};

  return (
    <div>
    <Home2nav />
    <div className="printing-report">
      <h2>Printing Report</h2>
      <div className="printing-container">
        <div className="printing-details-column">
          {error && <div>Error: {error}</div>}
          <div className="printings">
            {printings.map(printing => (
              <div className="printing-item" key={printing._id}>
                <h3 className="printing-bookName">{printing.printing_bookName}</h3>
                <p className="printing-detail"><strong>Printing Quantity:</strong> {printing.printing_quantity}</p>
                <p className="printing-detail"><strong>Need Material:</strong> {printing.need_material}</p>
                <p className="printing-detail"><strong>Printing Status:</strong> {printing.printing_status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-column">
          <div className="chart-container">
            <h2 className="chart-title">Printing Status</h2>
            <canvas id="myChart" className="chart-canvas" width="400" height="200"></canvas>
          </div>
          <Link to="/PrintingManage" className="back-button">Back To Menu</Link>
          <button onClick={downloadReportPDF} className="download-report-button">Download Report</button>

        </div>
      </div>
    </div>
    </div>

  );
};

export default PrintingReport;
